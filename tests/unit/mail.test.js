import { buildContactEmail, buildResumeEmail } from "../../lib/mail";

describe("mail templates", () => {
  it("builds Portuguese contact content", () => {
    const email = buildContactEmail({
      nome: "Maria",
      email: "maria@example.com",
      telefone: "31999999999",
      mensagem: "Quero um orçamento.",
    });

    expect(email.text).toContain("Nova mensagem recebida pelo site Aqualeve");
    expect(email.text).toContain("Nome: Maria");
    expect(email.html).toContain("Nova mensagem pelo site");
    expect(email.html).toContain("Quero um orçamento.");
  });

  it("builds Portuguese resume content", () => {
    const email = buildResumeEmail({
      nome: "Maria",
      email: "maria@example.com",
      telefone: "",
      mensagem: "",
      arquivoNome: "curriculo.pdf",
    });

    expect(email.text).toContain("Novo currículo recebido pelo site Aqualeve");
    expect(email.html).toContain("Novo currículo pelo site");
    expect(email.html).toContain("curriculo.pdf");
  });
});
