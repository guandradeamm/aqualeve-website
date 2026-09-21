import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import FaleConosco from "../../components/views/FaleConosco";

jest.mock("../../components/images/Contact", () => {
  function ContactMock() {
    return <div data-testid="contact-illustration" />;
  }
  return ContactMock;
});

describe("FaleConosco", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders the contact form fields used in production", () => {
    render(<FaleConosco />);

    expect(screen.getByRole("heading", { name: /fale conosco/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("DIGITE SEU NOME")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("(00) 99999-9999")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("SEU E-MAIL")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("DIGITE SUA MENSAGEM")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /enviar mensagem/i }).length).toBeGreaterThan(0);
    expect(
      screen.getByRole("link", { name: /contatoaqualeve@gmail\.com/i })
    ).toHaveAttribute("href", "mailto:contatoaqualeve@gmail.com");
  });

  it("keeps field values while typing", () => {
    render(<FaleConosco />);

    fireEvent.change(screen.getByPlaceholderText("DIGITE SEU NOME"), {
      target: { name: "nome", value: "Maria" },
    });
    fireEvent.change(screen.getByPlaceholderText("SEU E-MAIL"), {
      target: { name: "email", value: "maria@example.com" },
    });

    expect(screen.getByPlaceholderText("DIGITE SEU NOME")).toHaveValue("Maria");
    expect(screen.getByPlaceholderText("SEU E-MAIL")).toHaveValue("maria@example.com");
  });

  it("shows validation errors when required fields are empty", async () => {
    render(<FaleConosco />);

    fireEvent.submit(document.getElementById("formulario-faleconosco"));

    expect(await screen.findByText("Informe o seu nome.")).toBeInTheDocument();
    expect(screen.getByText("Informe o seu e-mail.")).toBeInTheDocument();
    expect(screen.getByText("Digite a sua mensagem.")).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("posts to /api/contact and clears fields on success", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        ok: true,
        message: "Mensagem enviada para contatoaqualeve@gmail.com.",
      }),
    });

    render(<FaleConosco />);

    fireEvent.change(screen.getByPlaceholderText("DIGITE SEU NOME"), {
      target: { name: "nome", value: "Maria" },
    });
    fireEvent.change(screen.getByPlaceholderText("SEU E-MAIL"), {
      target: { name: "email", value: "maria@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("DIGITE SUA MENSAGEM"), {
      target: { name: "mensagem", value: "Quero um orçamento completo." },
    });
    fireEvent.submit(document.getElementById("formulario-faleconosco"));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/contact",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
        })
      );
    });

    const [, options] = global.fetch.mock.calls[0];
    expect(JSON.parse(options.body)).toEqual({
      nome: "Maria",
      telefone: "",
      email: "maria@example.com",
      mensagem: "Quero um orçamento completo.",
    });

    await waitFor(() => {
      expect(screen.getByPlaceholderText("DIGITE SEU NOME")).toHaveValue("");
    });
    expect(
      screen.getByText(/Mensagem enviada com sucesso para contatoaqualeve@gmail\.com/i)
    ).toBeInTheDocument();
  });

  it("masks the phone field to the Brazilian mobile pattern", () => {
    render(<FaleConosco />);

    fireEvent.change(screen.getByPlaceholderText("(00) 99999-9999"), {
      target: { name: "telefone", value: "319999988889999" },
    });

    expect(screen.getByPlaceholderText("(00) 99999-9999")).toHaveValue(
      "(31) 99999-8888"
    );
  });

  it("shows an error when the contact API fails", async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      json: async () => ({
        error:
          "Não foi possível enviar a mensagem agora. Tente novamente em instantes.",
      }),
    });

    render(<FaleConosco />);

    fireEvent.change(screen.getByPlaceholderText("DIGITE SEU NOME"), {
      target: { name: "nome", value: "Maria" },
    });
    fireEvent.change(screen.getByPlaceholderText("SEU E-MAIL"), {
      target: { name: "email", value: "maria@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("DIGITE SUA MENSAGEM"), {
      target: { name: "mensagem", value: "Quero um orçamento completo." },
    });
    fireEvent.submit(document.getElementById("formulario-faleconosco"));

    expect(
      await screen.findByText(
        "Não foi possível enviar a mensagem agora. Tente novamente em instantes."
      )
    ).toBeInTheDocument();
  });
});
