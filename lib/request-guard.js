const DEFAULT_MAX_REQUESTS = 8;
const DEFAULT_WINDOW_MS = 10 * 60 * 1000;

/** @type {Map<string, { count: number, resetAt: number }>} */
const rateLimitBuckets = new Map();

function normalizeOrigin(value) {
  if (!value || typeof value !== "string") return null;

  try {
    return new URL(value).origin;
  } catch (error) {
    return null;
  }
}

function getAllowedOrigins() {
  const origins = new Set([
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ]);

  const siteOrigin = normalizeOrigin(
    process.env.NEXT_PUBLIC_SITE_URL || "https://aqualeve.com.br"
  );
  if (siteOrigin) {
    origins.add(siteOrigin);
  }

  const extras = String(process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  for (const extra of extras) {
    const origin = normalizeOrigin(extra);
    if (origin) {
      origins.add(origin);
    }
  }

  if (process.env.VERCEL_URL) {
    const vercelOrigin = normalizeOrigin(`https://${process.env.VERCEL_URL}`);
    if (vercelOrigin) {
      origins.add(vercelOrigin);
    }
  }

  return origins;
}

function inferRequestProto(req, host) {
  const forwarded = req?.headers?.["x-forwarded-proto"];
  if (forwarded) {
    return String(forwarded).split(",")[0].trim() || "https";
  }

  if (/^(localhost|127\.0\.0\.1)(:|$)/i.test(host || "")) {
    return "http";
  }

  return "https";
}

function resolveIncomingOrigin(req) {
  const headerOrigin = normalizeOrigin(req?.headers?.origin);
  if (headerOrigin) {
    return headerOrigin;
  }

  const referer = req?.headers?.referer || req?.headers?.referrer;
  const refererOrigin = normalizeOrigin(referer);
  if (refererOrigin) {
    return refererOrigin;
  }

  const host = req?.headers?.["x-forwarded-host"] || req?.headers?.host;
  if (!host) {
    return null;
  }

  return normalizeOrigin(`${inferRequestProto(req, host)}://${host}`);
}

function getClientIp(req) {
  const forwarded = req?.headers?.["x-forwarded-for"];
  if (forwarded) {
    return String(forwarded).split(",")[0].trim() || "unknown";
  }

  return (
    req?.headers?.["x-real-ip"] ||
    req?.socket?.remoteAddress ||
    req?.connection?.remoteAddress ||
    "unknown"
  );
}

function assertAllowedOrigin(req) {
  const origin = resolveIncomingOrigin(req);
  const allowed = getAllowedOrigins();

  if (!origin || !allowed.has(origin)) {
    return {
      ok: false,
      statusCode: 403,
      error: "Origem não permitida.",
      code: "ORIGIN_FORBIDDEN",
    };
  }

  return { ok: true, origin };
}

function assertRateLimit(
  req,
  {
    name = "default",
    max = DEFAULT_MAX_REQUESTS,
    windowMs = DEFAULT_WINDOW_MS,
  } = {}
) {
  const ip = getClientIp(req);
  const key = `${name}:${ip}`;
  const now = Date.now();
  let entry = rateLimitBuckets.get(key);

  if (!entry || now >= entry.resetAt) {
    entry = { count: 0, resetAt: now + windowMs };
  }

  entry.count += 1;
  rateLimitBuckets.set(key, entry);

  if (entry.count > max) {
    return {
      ok: false,
      statusCode: 429,
      error: "Muitas tentativas. Aguarde um pouco e tente de novo.",
      code: "RATE_LIMITED",
      retryAfter: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
    };
  }

  return { ok: true, remaining: max - entry.count };
}

function enforceRequestGuards(req, res, options = {}) {
  const originCheck = assertAllowedOrigin(req);
  if (!originCheck.ok) {
    res.status(originCheck.statusCode).json({
      error: originCheck.error,
      code: originCheck.code,
    });
    return false;
  }

  const rateCheck = assertRateLimit(req, options);
  if (!rateCheck.ok) {
    if (rateCheck.retryAfter) {
      res.setHeader("Retry-After", String(rateCheck.retryAfter));
    }
    res.status(rateCheck.statusCode).json({
      error: rateCheck.error,
      code: rateCheck.code,
    });
    return false;
  }

  return true;
}

function resetRateLimitStore() {
  rateLimitBuckets.clear();
}

export {
  assertAllowedOrigin,
  assertRateLimit,
  enforceRequestGuards,
  getAllowedOrigins,
  getClientIp,
  resetRateLimitStore,
  resolveIncomingOrigin,
};
