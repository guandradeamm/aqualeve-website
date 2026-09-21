import { HOME_QUERY, pickSocials } from "../../lib/cms";

describe("pickSocials", () => {
  const socials = [
    { id: "1", ref: "whatsapp", href: "https://wa.me/5531999094098" },
    { id: "2", ref: "instagram", href: "https://instagram.com/aguaaqualeve" },
    { id: "3", ref: "github", href: "https://github.com/guandradeamm" },
  ];

  it("maps CMS socials used by header, hero, CTA and footer", () => {
    expect(pickSocials(socials)).toEqual({
      whatsapp: socials[0],
      instagram: socials[1],
      github: socials[2],
    });
  });

  it("returns null for missing refs instead of throwing", () => {
    expect(pickSocials([])).toEqual({
      whatsapp: null,
      instagram: null,
      github: null,
    });
    expect(pickSocials(undefined)).toEqual({
      whatsapp: null,
      instagram: null,
      github: null,
    });
  });
});

describe("HOME_QUERY", () => {
  it("asks Hygraph for the homepage collections", () => {
    expect(HOME_QUERY).toMatch(/empresas/);
    expect(HOME_QUERY).toMatch(/produtos/);
    expect(HOME_QUERY).toMatch(/localAssets/);
    expect(HOME_QUERY).toMatch(/navigationLinks/);
    expect(HOME_QUERY).toMatch(/socials/);
    expect(HOME_QUERY).toMatch(/chemicals/);
    expect(HOME_QUERY).toMatch(/locationVideo/);
  });
});
