/**
 * @jest-environment node
 */

jest.mock("../../lib/mail", () => ({
  getSmtpConfig: jest.fn(() => null),
  sendResumeEmail: jest.fn(),
}));

const handler = require("../../pages/api/resume").default;
const { getSmtpConfig, sendResumeEmail } = require("../../lib/mail");

function createMocks({ method = "POST", body = {}, headers = {} } = {}) {
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

describe("/api/resume", () => {
  beforeEach(() => {
    getSmtpConfig.mockReturnValue(null);
    sendResumeEmail.mockReset();
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
      body: {
        nome: "Maria",
        email: "maria@example.com",
        arquivo: {
          name: "curriculo.pdf",
          type: "application/pdf",
          data: Buffer.from("fake-pdf-content").toString("base64"),
        },
      },
    });

    await handler(req, res);

    expect(res.statusCode).toBe(503);
    expect(res.body.code).toBe("SMTP_NOT_CONFIGURED");
    expect(sendResumeEmail).not.toHaveBeenCalled();
  });
});
