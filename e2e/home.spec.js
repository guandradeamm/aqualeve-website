const { test, expect } = require("@playwright/test");

test.describe("homepage critical flows", () => {
  test("loads CMS sections, contact form and WhatsApp CTA", async ({ page }) => {
    const response = await page.goto("/");
    expect(response.ok()).toBeTruthy();
    await expect(page).toHaveTitle(/Aqualeve/i);

    // Scope to section ids and use exact names: empresa body copy contains "produtos".
    await expect(
      page.locator("#empresa").getByRole("heading", { name: "EMPRESA", exact: true })
    ).toBeVisible();
    await expect(
      page.locator("#produtos").getByRole("heading", { name: "PRODUTOS", exact: true })
    ).toBeVisible();
    await expect(
      page.locator("#faleconosco").getByRole("heading", { name: /fale conosco/i })
    ).toBeVisible();

    await expect(page.getByPlaceholder("DIGITE SEU NOME")).toBeVisible();
    await expect(page.getByPlaceholder("SEU E-MAIL")).toBeVisible();
    await expect(page.getByPlaceholder("DIGITE SUA MENSAGEM")).toBeVisible();
    await expect(
      page.getByRole("link", { name: /contatoaqualeve@gmail\.com/i })
    ).toHaveAttribute("href", "mailto:contatoaqualeve@gmail.com");

    const whatsapp = page.locator("#floating-button a");
    await expect(whatsapp).toBeVisible();
    await expect(whatsapp).toHaveAttribute("href", /https?:\/\//);
  });

  test("empresa images come from Hygraph instead of a broken optimizer URL", async ({ page }) => {
    await page.goto("/");
    await page.locator("#empresa").scrollIntoViewIfNeeded();

    const empresa = page.locator("#empresa");
    await expect(empresa).toBeVisible();

    // Swiper may keep inactive slides off-screen; assert markup, not viewport visibility.
    await expect
      .poll(async () => empresa.innerHTML(), { timeout: 15000 })
      .toMatch(/graphassets\.com/);

    const markup = await empresa.innerHTML();
    expect(markup).not.toMatch(/\/_next\/image\?url=[^"']*graphassets/);

    const directImage = empresa.locator(
      'img[src*="graphassets.com"], img[srcset*="graphassets.com"]'
    );
    await expect(directImage.first()).toBeAttached();
  });
});
