import {
  CONTACT_EMAIL,
  normalizeContactPayload,
  validateContactPayload,
} from "../../lib/contact";

describe("contact helpers", () => {
  it("exposes the Aqualeve inbox address", () => {
    expect(CONTACT_EMAIL).toBe("contatoaqualeve@gmail.com");
  });

  it("trims payload values", () => {
    expect(
      normalizeContactPayload({
        nome: "  Maria  ",
        telefone: " 31999999999 ",
        email: " maria@example.com ",
        mensagem: "  Olá, preciso de ajuda  ",
      })
    ).toEqual({
      nome: "Maria",
      telefone: "31999999999",
      email: "maria@example.com",
      mensagem: "Olá, preciso de ajuda",
    });
  });

  it("rejects incomplete payloads", () => {
    const result = validateContactPayload(
      normalizeContactPayload({
        nome: "",
        email: "invalido",
        mensagem: "curta",
      })
    );

    expect(result.ok).toBe(false);
    expect(result.errors.nome).toBeTruthy();
    expect(result.errors.email).toBeTruthy();
    expect(result.errors.mensagem).toBeTruthy();
  });

  it("accepts a complete payload", () => {
    const result = validateContactPayload(
      normalizeContactPayload({
        nome: "Maria",
        email: "maria@example.com",
        mensagem: "Quero um orçamento completo.",
      })
    );

    expect(result).toEqual({ ok: true, errors: {} });
  });
});
