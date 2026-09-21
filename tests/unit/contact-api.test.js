/**
 * @jest-environment node
 */

import handler from "../../pages/api/contact";

function createMocks({ method = "POST", body = {} } = {}) {
  const req = { method, body, headers: {} };
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

describe("/api/contact", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = jest.fn();
    process.env.CONTACT_PROVIDER = "formsubmit";
  });

  afterEach(() => {
    global.fetch = originalFetch;
    delete process.env.CONTACT_PROVIDER;
    jest.restoreAllMocks();
  });

  it("rejects non-POST methods", async () => {
    const { req, res } = createMocks({ method: "GET" });
    await handler(req, res);

    expect(res.statusCode).toBe(405);
    expect(res.body.error).toMatch(/method not allowed/i);
  });

  it("rejects invalid payloads", async () => {
    const { req, res } = createMocks({
      body: { nome: "", email: "x", mensagem: "" },
    });
    await handler(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeTruthy();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("forwards a valid message to FormSubmit for contatoaqualeve@gmail.com", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ success: "true" }),
    });

    const { req, res } = createMocks({
      body: {
        nome: "Maria",
        telefone: "31999999999",
        email: "maria@example.com",
        mensagem: "Quero um orçamento completo.",
      },
    });
    req.headers = { origin: "http://localhost:3000", host: "localhost:3000" };

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://formsubmit.co/ajax/contatoaqualeve@gmail.com",
      expect.objectContaining({ method: "POST" })
    );

    const [, options] = global.fetch.mock.calls[0];
    const sent = JSON.parse(options.body);
    expect(sent.Nome).toBe("Maria");
    expect(sent["E-mail"]).toBe("maria@example.com");
    expect(sent.Mensagem).toBe("Quero um orçamento completo.");
    expect(sent.Idioma).toBe("Português (Brasil)");
    expect(sent._replyto).toBe("maria@example.com");
    expect(options.headers.Origin).toBe("http://localhost:3000");
  });

  it("explains when FormSubmit still needs activation", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        success: "false",
        message:
          "This form needs Activation. We've sent you an email containing an 'Activate Form' link.",
      }),
    });

    const { req, res } = createMocks({
      body: {
        nome: "Maria",
        email: "maria@example.com",
        mensagem: "Quero um orçamento completo.",
      },
    });
    req.headers = { host: "localhost:3000" };

    await handler(req, res);

    expect(res.statusCode).toBe(409);
    expect(res.body.error).toMatch(/ative o formulário/i);
    expect(res.body.error).toMatch(/contatoaqualeve@gmail\.com/i);
  });

  it("returns 502 when the provider fails", async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      json: async () => ({ message: "upstream error" }),
    });

    const { req, res } = createMocks({
      body: {
        nome: "Maria",
        email: "maria@example.com",
        mensagem: "Quero um orçamento completo.",
      },
    });
    req.headers = {};

    await handler(req, res);

    expect(res.statusCode).toBe(502);
    expect(res.body.error).toMatch(/upstream error/i);
  });
});
