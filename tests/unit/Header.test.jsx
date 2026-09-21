import { fireEvent, render, screen } from "@testing-library/react";
import Header from "../../components/layout/Header";

jest.mock("../../components/images", () => ({
  Logo: function LogoMock() {
    return <div data-testid="logo" />;
  },
}));

const navigationLinks = [
  { id: "1", name: "empresa", href: "#empresa" },
  { id: "2", name: "produtos", href: "#produtos" },
  { id: "3", name: "fale conosco", href: "#faleconosco" },
];

describe("Header", () => {
  it("renders CMS navigation links on desktop", () => {
    render(
      <Header
        content={{
          navigationLinks,
          instagram: { href: "https://instagram.com/aguaaqualeve" },
        }}
      />
    );

    expect(screen.getAllByText("empresa").length).toBeGreaterThan(0);
    expect(screen.getAllByText("produtos").length).toBeGreaterThan(0);
    expect(screen.getAllByText("fale conosco").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/envie seu currículo/i).length).toBeGreaterThan(0);
  });

  it("toggles the mobile menu without throwing", () => {
    render(
      <Header
        content={{
          navigationLinks,
          instagram: { href: "https://instagram.com/aguaaqualeve" },
        }}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /open main menu/i }));
    expect(screen.getAllByText("empresa").length).toBeGreaterThan(0);
  });

  it("opens the resume modal from the desktop CTA", () => {
    render(
      <Header
        content={{
          navigationLinks,
          instagram: { href: "https://instagram.com/aguaaqualeve" },
        }}
      />
    );

    fireEvent.click(
      screen.getAllByRole("button", { name: /envie seu currículo/i })[0]
    );
    expect(
      screen.getByRole("heading", { name: /envie seu currículo/i })
    ).toBeInTheDocument();
  });

  it("opens Instagram in a new tab from the header icon", () => {
    render(
      <Header
        content={{
          navigationLinks,
          instagram: { href: "https://instagram.com/aguaaqualeve" },
        }}
      />
    );

    const instagram = screen.getByRole("link", {
      name: /abrir instagram da aqualeve em nova aba/i,
    });
    expect(instagram).toHaveAttribute(
      "href",
      "https://instagram.com/aguaaqualeve"
    );
    expect(instagram).toHaveAttribute("target", "_blank");
    expect(instagram).toHaveAttribute("rel", "noopener noreferrer");
  });
});
