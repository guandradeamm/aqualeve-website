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

describe("security headers", () => {
  it("applies baseline headers on all routes", async () => {
    const routes = await nextConfig.headers();
    expect(routes).toHaveLength(1);
    expect(routes[0].source).toBe("/:path*");

    const headers = Object.fromEntries(
      routes[0].headers.map(({ key, value }) => [key, value])
    );

    expect(headers["X-Frame-Options"]).toBe("DENY");
    expect(headers["X-Content-Type-Options"]).toBe("nosniff");
    expect(headers["Referrer-Policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["Permissions-Policy"]).toBe(
      "camera=(), microphone=(), geolocation=()"
    );
    expect(headers["Strict-Transport-Security"]).toContain("max-age=");
  });
});
