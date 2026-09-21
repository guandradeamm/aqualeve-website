import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import EnvieCurriculo from "../../components/modal/EnvieCurriculo";

describe("EnvieCurriculo", () => {
  beforeEach(() => {
    global.DataTransfer = class DataTransfer {
      constructor() {
        this.items = {
          add: (file) => {
            this._files = [file];
          },
        };
        this._files = [];
      }

      get files() {
        return this._files;
      }
    };
  });

  it("does not render the dialog content when closed", () => {
    render(<EnvieCurriculo isOpen={false} closeIsOpen={jest.fn()} />);
    expect(
      screen.queryByRole("heading", { name: /envie seu currículo/i })
    ).not.toBeInTheDocument();
  });

  it("submits a detached multipart FormSubmit form with Portuguese fields", async () => {
    const closeIsOpen = jest.fn();
    const appendChild = jest.spyOn(document.body, "appendChild");
    const originalSubmit = HTMLFormElement.prototype.submit;
    const submitMock = jest.fn();
    HTMLFormElement.prototype.submit = submitMock;

    const originalDescriptor = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      "files"
    );
    Object.defineProperty(HTMLInputElement.prototype, "files", {
      configurable: true,
      get() {
        return this._files || [];
      },
      set(value) {
        this._files = value;
      },
    });

    render(<EnvieCurriculo isOpen closeIsOpen={closeIsOpen} />);

    fireEvent.change(screen.getByPlaceholderText("Seu nome completo"), {
      target: { name: "nome", value: "Maria" },
    });
    fireEvent.change(screen.getByPlaceholderText("seu@email.com"), {
      target: { name: "email", value: "maria@example.com" },
    });
    fireEvent.change(
      screen.getByLabelText(/anexar currículo em pdf ou word/i),
      {
        target: {
          files: [
            new File(["conteudo"], "curriculo.pdf", {
              type: "application/pdf",
            }),
          ],
        },
      }
    );
    fireEvent.click(screen.getByRole("button", { name: /enviar currículo/i }));

    await waitFor(() => {
      expect(submitMock).toHaveBeenCalled();
    });

    expect(closeIsOpen).toHaveBeenCalled();

    const form = appendChild.mock.calls
      .map(([node]) => node)
      .find((node) => node && node.tagName === "FORM");

    expect(form).toBeTruthy();
    expect(form.action).toContain("formsubmit.co/contatoaqualeve@gmail.com");
    expect(form.enctype).toBe("multipart/form-data");
    expect(form.querySelector('input[name="Nome"]').value).toBe("Maria");
    expect(form.querySelector('input[name="E-mail"]').value).toBe(
      "maria@example.com"
    );
    expect(form.querySelector('input[name="Idioma"]').value).toBe(
      "Português (Brasil)"
    );
    expect(form.querySelector('input[name="attachment"]').files[0].name).toBe(
      "curriculo.pdf"
    );

    HTMLFormElement.prototype.submit = originalSubmit;
    appendChild.mockRestore();
    if (originalDescriptor) {
      Object.defineProperty(
        HTMLInputElement.prototype,
        "files",
        originalDescriptor
      );
    }
  });

  it("blocks submit when required fields are missing", () => {
    render(<EnvieCurriculo isOpen closeIsOpen={jest.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: /enviar currículo/i }));

    expect(screen.getByText("Informe o seu nome.")).toBeInTheDocument();
    expect(screen.getByText("Informe o seu e-mail.")).toBeInTheDocument();
    expect(
      screen.getByText("Anexe o currículo em PDF ou Word.")
    ).toBeInTheDocument();
  });
});
