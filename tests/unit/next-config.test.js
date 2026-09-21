const nextConfig = require("../../next.config.js");

describe("next image hosts", () => {
  it("allows current and legacy Hygraph CDN hosts", () => {
    expect(nextConfig.images.domains).toEqual(
      expect.arrayContaining([
        "sa-east-1.graphassets.com",
        "media.graphassets.com",
      ])
    );
  });

  it("never includes empty or invalid hosts", () => {
    expect(nextConfig.images.domains.every((host) => typeof host === "string" && host.length > 0)).toBe(
      true
    );
    expect(nextConfig.images.domains.every((host) => !host.includes("://"))).toBe(
      true
    );
  });
});
