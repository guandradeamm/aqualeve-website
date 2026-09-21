import {
  normalizeResumePayload,
  validateResumePayload,
} from "../../lib/resume";

describe("resume helpers", () => {
  it("accepts a valid PDF payload", () => {
    const payload = normalizeResumePayload({
      nome: "Maria",
      email: "maria@example.com",
      arquivo: {
        name: "curriculo.pdf",
        type: "application/pdf",
        data: Buffer.from("fake-pdf-content").toString("base64"),
      },
    });

    expect(validateResumePayload(payload)).toEqual({ ok: true, errors: {} });
  });

  it("rejects missing attachment and invalid extension", () => {
    const missing = validateResumePayload(
      normalizeResumePayload({
        nome: "Maria",
        email: "maria@example.com",
      })
    );
    expect(missing.ok).toBe(false);
    expect(missing.errors.arquivo).toBeTruthy();

    const invalid = validateResumePayload(
      normalizeResumePayload({
        nome: "Maria",
        email: "maria@example.com",
        arquivo: {
          name: "foto.png",
          type: "image/png",
          data: Buffer.from("png").toString("base64"),
        },
      })
    );
    expect(invalid.errors.arquivo).toMatch(/PDF, DOC ou DOCX/i);
  });
});
