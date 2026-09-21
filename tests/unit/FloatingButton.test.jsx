import { render, screen } from "@testing-library/react";
import FloatingButton from "../../components/common/FloatingButton";

describe("FloatingButton", () => {
  it("links the WhatsApp CTA to the CMS href", () => {
    render(
      <FloatingButton content={{ href: "https://wa.me/5531999094098" }} />
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://wa.me/5531999094098");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("renders a safe fallback when the CMS social is missing", () => {
    render(<FloatingButton content={undefined} />);
    expect(screen.getByRole("link").getAttribute("href")).toMatch(/#faleconosco$/);
  });
});
