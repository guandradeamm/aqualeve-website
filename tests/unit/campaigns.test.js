import {
  getCampaignById,
  getDocumentTitle,
  matchesSchedule,
  normalizeMode,
  resolveActiveCampaign,
  resolveCampaignMode,
} from "../../lib/campaigns";

describe("campaigns", () => {
  const originalCampaign = process.env.NEXT_PUBLIC_CAMPAIGN;
  const originalLegacy = process.env.NEXT_PUBLIC_OUTUBRO_ROSA;

  afterEach(() => {
    if (originalCampaign === undefined) {
      delete process.env.NEXT_PUBLIC_CAMPAIGN;
    } else {
      process.env.NEXT_PUBLIC_CAMPAIGN = originalCampaign;
    }

    if (originalLegacy === undefined) {
      delete process.env.NEXT_PUBLIC_OUTUBRO_ROSA;
    } else {
      process.env.NEXT_PUBLIC_OUTUBRO_ROSA = originalLegacy;
    }
  });

  it("normalizes campaign mode", () => {
    expect(normalizeMode("none")).toBe("none");
    expect(normalizeMode("off")).toBe("none");
    expect(normalizeMode("false")).toBe("none");
    expect(normalizeMode("auto")).toBe("auto");
    expect(normalizeMode("outubro-rosa")).toBe("outubro-rosa");
  });

  it("forces brand when campaign is none", () => {
    process.env.NEXT_PUBLIC_CAMPAIGN = "none";
    expect(resolveActiveCampaign(new Date("2026-10-15T12:00:00"))).toBeNull();
  });

  it("forces a campaign by id", () => {
    process.env.NEXT_PUBLIC_CAMPAIGN = "outubro-rosa";
    const campaign = resolveActiveCampaign(new Date("2026-09-22T12:00:00"));
    expect(campaign?.id).toBe("outubro-rosa");
    expect(campaign?.hero?.message).toBe(
      "Água que nutre. Conscientização que protege."
    );
    expect(getDocumentTitle(campaign)).toBe("Aqualeve — Outubro Rosa");
  });

  it("uses schedule in auto mode", () => {
    process.env.NEXT_PUBLIC_CAMPAIGN = "auto";
    delete process.env.NEXT_PUBLIC_OUTUBRO_ROSA;

    expect(resolveActiveCampaign(new Date("2026-10-01T12:00:00"))?.id).toBe(
      "outubro-rosa"
    );
    expect(resolveActiveCampaign(new Date("2026-11-01T12:00:00"))).toBeNull();
  });

  it("keeps legacy OUTUBRO_ROSA flag", () => {
    delete process.env.NEXT_PUBLIC_CAMPAIGN;
    process.env.NEXT_PUBLIC_OUTUBRO_ROSA = "true";
    expect(resolveCampaignMode()).toBe("outubro-rosa");
    expect(resolveActiveCampaign()?.id).toBe("outubro-rosa");
  });

  it("matches schedule months", () => {
    const campaign = getCampaignById("outubro-rosa");
    expect(matchesSchedule(campaign, new Date("2026-10-15T12:00:00"))).toBe(
      true
    );
    expect(matchesSchedule(campaign, new Date("2026-09-15T12:00:00"))).toBe(
      false
    );
  });

  it("defaults document title to Aqualeve", () => {
    expect(getDocumentTitle(null)).toBe("Aqualeve");
  });
});
