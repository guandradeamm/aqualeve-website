#!/usr/bin/env node

const { spawn } = require("child_process");
const fs = require("fs");
const http = require("http");
const net = require("net");
const path = require("path");

const PORT = process.env.E2E_PORT || "3010";
const BASE_URL = `http://127.0.0.1:${PORT}`;
const hasProductionBuild = fs.existsSync(
  path.join(process.cwd(), ".next", "BUILD_ID")
);

function request(path) {
  return new Promise((resolve, reject) => {
    const req = http.get(`${BASE_URL}${path}`, (res) => {
      let body = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => {
        body += chunk;
      });
      res.on("end", () => resolve({ status: res.statusCode, body }));
    });
    req.on("error", reject);
    req.setTimeout(15000, () => {
      req.destroy(new Error("timeout"));
    });
  });
}

function waitForServer(timeoutMs = 60000) {
  const started = Date.now();

  return new Promise((resolve, reject) => {
    const attempt = () => {
      request("/")
        .then((result) => {
          if (result.status === 200) {
            resolve(result);
            return;
          }
          retry();
        })
        .catch(retry);
    };

    const retry = () => {
      if (Date.now() - started > timeoutMs) {
        reject(new Error(`Server did not become ready on ${BASE_URL}`));
        return;
      }
      setTimeout(attempt, 500);
    };

    attempt();
  });
}

function isPortFree(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.unref();
    server.on("error", () => resolve(false));
    server.listen(port, "127.0.0.1", () => {
      server.close(() => resolve(true));
    });
  });
}

async function waitForPortFree(port, timeoutMs = 15000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    if (await isPortFree(Number(port))) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Port ${port} stayed busy after stopping the smoke server`);
}

function stopServer(child) {
  if (!child || child.killed) {
    return;
  }

  try {
    process.kill(-child.pid, "SIGKILL");
  } catch (error) {
    try {
      child.kill("SIGKILL");
    } catch (_) {
      // already gone
    }
  }
}

function assertContains(html, snippet, label) {
  if (!html.includes(snippet)) {
    throw new Error(`Missing ${label}: ${snippet}`);
  }
}

async function runSmoke(html) {
  assertContains(html, "<title>Aqualeve</title>", "page title");
  assertContains(html, "EMPRESA", "Empresa section");
  assertContains(html, "PRODUTOS", "Produtos section");
  assertContains(html, "fale conosco", "contact section");
  assertContains(html, "formulario-faleconosco", "contact form");
  assertContains(html, "DIGITE SEU NOME", "name field");
  assertContains(html, "SEU E-MAIL", "email field");
  assertContains(html, "contatoaqualeve@gmail.com", "contact inbox");
  assertContains(html, "floating-button", "WhatsApp CTA");
  assertContains(html, "graphassets.com", "Hygraph images");

  if (html.includes("/_next/image?url=https%3A%2F%2F") && html.includes("graphassets")) {
    throw new Error("Empresa/product images are still going through /_next/image");
  }
}

async function main() {
  // Prefer production server when a build already exists (CI / npm run verify).
  // next dev rewrites .next and would break the following Playwright `next start`.
  const nextArgs = hasProductionBuild
    ? ["next", "start", "-p", PORT]
    : ["next", "dev", "-p", PORT];

  const child = spawn("npx", nextArgs, {
    stdio: "pipe",
    env: process.env,
    detached: true,
  });

  let failed = false;

  try {
    const page = await waitForServer();
    if (page.status !== 200) {
      throw new Error(`Home returned ${page.status}`);
    }
    await runSmoke(page.body);
    console.log(
      `e2e smoke passed (${hasProductionBuild ? "next start" : "next dev"} :${PORT})`
    );
  } catch (error) {
    failed = true;
    console.error(error.message || error);
  } finally {
    stopServer(child);
    try {
      await waitForPortFree(PORT);
    } catch (error) {
      failed = true;
      console.error(error.message || error);
    }
  }

  process.exit(failed ? 1 : 0);
}

main();
