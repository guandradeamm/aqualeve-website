import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import emailjs from "emailjs-com";
import FaleConosco from "../../components/views/FaleConosco";

jest.mock("../../components/images/Contact", () => {
  function ContactMock() {
    return <div data-testid="contact-illustration" />;
  }
  return ContactMock;
});

describe("FaleConosco", () => {
  beforeEach(() => {
    jest.spyOn(emailjs, "sendForm").mockResolvedValue({ status: 200 });
    window.alert = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders the contact form fields used in production", () => {
    render(<FaleConosco />);

    expect(screen.getByRole("heading", { name: /fale conosco/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("DIGITE SEU NOME")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("(00)99999-9999")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("SEU E-MAIL")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("DIGITE SUA MENSAGEM")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /enviar mensagem/i }).length).toBeGreaterThan(0);
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

  it("sends the form through EmailJS and clears fields on success", async () => {
    render(<FaleConosco />);

    fireEvent.change(screen.getByPlaceholderText("DIGITE SEU NOME"), {
      target: { name: "nome", value: "Maria" },
    });
    fireEvent.submit(document.getElementById("formulario-faleconosco"));

    await waitFor(() => {
      expect(screen.getByPlaceholderText("DIGITE SEU NOME")).toHaveValue("");
    });
    expect(emailjs.sendForm).toHaveBeenCalledTimes(1);
    expect(window.alert).toHaveBeenCalledWith("Mensagem enviada com sucesso !");
  });

  it("shows an error when EmailJS rejects", async () => {
    emailjs.sendForm.mockRejectedValue(new Error("network"));
    render(<FaleConosco />);

    fireEvent.submit(document.getElementById("formulario-faleconosco"));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "Ocorreu algum erro, favor conferir se os campos estão preenchidos corretamente."
      );
    });
  });
});
