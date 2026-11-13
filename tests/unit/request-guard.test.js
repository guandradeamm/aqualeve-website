/**
 * @jest-environment node
 */

import {
  assertAllowedOrigin,
  assertRateLimit,
  enforceRequestGuards,
  resetRateLimitStore,
} from "../../lib/request-guard";

describe("request-guard", () => {
  const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const originalAllowed = process.env.ALLOWED_ORIGINS;
  const originalVercelUrl = process.env.VERCEL_URL;

  beforeEach(() => {
    resetRateLimitStore();
    process.env.NEXT_PUBLIC_SITE_URL = "https://aqualeve.com.br";
    delete process.env.ALLOWED_ORIGINS;
    delete process.env.VERCEL_URL;
  });

  afterEach(() => {
    resetRateLimitStore();
    if (originalSiteUrl === undefined) {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    } else {
      process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
    }
    if (originalAllowed === undefined) {
      delete process.env.ALLOWED_ORIGINS;
    } else {
      process.env.ALLOWED_ORIGINS = originalAllowed;
    }
    if (originalVercelUrl === undefined) {
      delete process.env.VERCEL_URL;
    } else {
      process.env.VERCEL_URL = originalVercelUrl;
    }
  });

  it("allows the public site origin and localhost", () => {
    expect(
      assertAllowedOrigin({
        headers: { origin: "https://aqualeve.com.br" },
      }).ok
    ).toBe(true);

    expect(
      assertAllowedOrigin({
        headers: { origin: "http://localhost:3000" },
      }).ok
    ).toBe(true);
  });

  it("rejects unknown origins", () => {
    const result = assertAllowedOrigin({
      headers: { origin: "https://evil.example" },
    });

    expect(result.ok).toBe(false);
    expect(result.statusCode).toBe(403);
    expect(result.code).toBe("ORIGIN_FORBIDDEN");
  });

  it("accepts extra origins from ALLOWED_ORIGINS and VERCEL_URL", () => {
    process.env.ALLOWED_ORIGINS = "https://preview.example, https://staging.aqualeve.com.br";
    process.env.VERCEL_URL = "aqualeve-git-main.vercel.app";

    expect(
      assertAllowedOrigin({
        headers: { origin: "https://preview.example" },
      }).ok
    ).toBe(true);

    expect(
      assertAllowedOrigin({
        headers: { origin: "https://aqualeve-git-main.vercel.app" },
      }).ok
    ).toBe(true);
  });

  it("rate-limits repeated requests from the same IP", () => {
    const req = {
      headers: {
        origin: "https://aqualeve.com.br",
        "x-forwarded-for": "203.0.113.10",
      },
    };

    for (let i = 0; i < 8; i += 1) {
      expect(assertRateLimit(req, { name: "contact", max: 8 }).ok).toBe(true);
    }

    const blocked = assertRateLimit(req, { name: "contact", max: 8 });
    expect(blocked.ok).toBe(false);
    expect(blocked.statusCode).toBe(429);
    expect(blocked.code).toBe("RATE_LIMITED");
    expect(blocked.retryAfter).toBeGreaterThan(0);
  });

  it("enforceRequestGuards short-circuits forbidden origins before rate limit", () => {
    const res = {
      headers: {},
      statusCode: 200,
      body: null,
      setHeader(key, value) {
        this.headers[key] = value;
      },
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(payload) {
        this.body = payload;
        return this;
      },
    };

    const ok = enforceRequestGuards(
      { headers: { origin: "https://evil.example" } },
      res,
      { name: "contact" }
    );

    expect(ok).toBe(false);
    expect(res.statusCode).toBe(403);
    expect(res.body.code).toBe("ORIGIN_FORBIDDEN");
  });
});
