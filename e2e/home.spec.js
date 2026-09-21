const { test, expect } = require("@playwright/test");

test.describe("homepage critical flows", () => {
  test("loads CMS sections, contact form and WhatsApp CTA", async ({ page }) => {
    const response = await page.goto("/");
    expect(response.ok()).toBeTruthy();
    await expect(page).toHaveTitle(/Aqualeve/i);

    await expect(page.getByRole("heading", { name: /EMPRESA/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /PRODUTOS/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /fale conosco/i })).toBeVisible();

    await expect(page.getByPlaceholder("DIGITE SEU NOME")).toBeVisible();
    await expect(page.getByPlaceholder("SEU E-MAIL")).toBeVisible();
    await expect(page.getByPlaceholder("DIGITE SUA MENSAGEM")).toBeVisible();

    const whatsapp = page.locator("#floating-button a");
    await expect(whatsapp).toBeVisible();
    await expect(whatsapp).toHaveAttribute("href", /https?:\/\//);
  });

  test("empresa images come from Hygraph instead of a broken optimizer URL", async ({ page }) => {
    await page.goto("/");
    const empresaImages = page.locator("#empresa img[src*='graphassets.com']");
    await expect(empresaImages.first()).toBeVisible();
    const src = await empresaImages.first().getAttribute("src");
    expect(src).not.toContain("/_next/image");
  });
});
