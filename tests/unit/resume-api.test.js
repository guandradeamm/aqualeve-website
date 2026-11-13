/**
 * @jest-environment node
 */

jest.mock("../../lib/mail", () => ({
  getSmtpConfig: jest.fn(() => null),
  sendResumeEmail: jest.fn(),
}));

const handler = require("../../pages/api/resume").default;
const { getSmtpConfig, sendResumeEmail } = require("../../lib/mail");
const { resetRateLimitStore } = require("../../lib/request-guard");

function createMocks({
  method = "POST",
  body = {},
  headers = { origin: "http://localhost:3000" },
} = {}) {
  const req = { method, body, headers };
  const res = {
    statusCode: 200,
    headers: {},
    body: null,
    setHeader(key, value) {
      this.headers[key] = value;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
  return { req, res };
}

const validBody = {
  nome: "Maria",
  email: "maria@example.com",
  arquivo: {
    name: "curriculo.pdf",
    type: "application/pdf",
    data: Buffer.from("fake-pdf-content").toString("base64"),
  },
};

describe("/api/resume", () => {
  beforeEach(() => {
    getSmtpConfig.mockReturnValue(null);
    sendResumeEmail.mockReset();
    resetRateLimitStore();
  });

  afterEach(() => {
    resetRateLimitStore();
  });

  it("rejects unknown origins before processing", async () => {
    const { req, res } = createMocks({
      body: validBody,
      headers: { origin: "https://evil.example" },
    });
    await handler(req, res);

    expect(res.statusCode).toBe(403);
    expect(res.body.code).toBe("ORIGIN_FORBIDDEN");
    expect(sendResumeEmail).not.toHaveBeenCalled();
  });

  it("rejects invalid payloads", async () => {
    const { req, res } = createMocks({
      body: { nome: "", email: "x" },
    });
    await handler(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeTruthy();
    expect(sendResumeEmail).not.toHaveBeenCalled();
  });

  it("returns 503 when SMTP is not configured", async () => {
    const { req, res } = createMocks({
      body: validBody,
    });

    await handler(req, res);

    expect(res.statusCode).toBe(503);
    expect(res.body.code).toBe("SMTP_NOT_CONFIGURED");
    expect(sendResumeEmail).not.toHaveBeenCalled();
  });

  it("rate-limits bursts from the same client", async () => {
    const headers = {
      origin: "http://localhost:3000",
      "x-forwarded-for": "198.51.100.30",
    };

    for (let i = 0; i < 8; i += 1) {
      const { req, res } = createMocks({ body: validBody, headers });
      await handler(req, res);
      expect(res.statusCode).toBe(503);
    }

    const { req, res } = createMocks({ body: validBody, headers });
    await handler(req, res);

    expect(res.statusCode).toBe(429);
    expect(res.body.code).toBe("RATE_LIMITED");
    expect(res.headers["Retry-After"]).toBeTruthy();
  });
});
