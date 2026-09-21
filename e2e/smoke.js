#!/usr/bin/env node

const { spawn } = require("child_process");
const http = require("http");

const PORT = process.env.E2E_PORT || "3001";
const BASE_URL = `http://127.0.0.1:${PORT}`;

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
  assertContains(html, "floating-button", "WhatsApp CTA");
  assertContains(html, "graphassets.com", "Hygraph images");

  if (html.includes("/_next/image?url=https%3A%2F%2F") && html.includes("graphassets")) {
    throw new Error("Empresa/product images are still going through /_next/image");
  }
}

async function main() {
  const child = spawn("npx", ["next", "dev", "-p", PORT], {
    stdio: "pipe",
    env: process.env,
  });

  let failed = false;

  try {
    const page = await waitForServer();
    if (page.status !== 200) {
      throw new Error(`Home returned ${page.status}`);
    }
    await runSmoke(page.body);
    console.log("e2e smoke passed");
  } catch (error) {
    failed = true;
    console.error(error.message || error);
  } finally {
    child.kill("SIGTERM");
  }

  process.exit(failed ? 1 : 0);
}

main();
