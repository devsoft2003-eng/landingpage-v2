type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

function limitFor(kind: "register" | "download" | "login" | "contact" | "captcha") {
  switch (kind) {
    case "register":
      return Number(process.env.RATE_LIMIT_REGISTER_MAX || 5);
    case "download":
      return Number(process.env.RATE_LIMIT_DOWNLOAD_MAX || 10);
    case "login":
      return Number(process.env.RATE_LIMIT_LOGIN_MAX || 5);
    case "contact":
      return Number(process.env.RATE_LIMIT_CONTACT_MAX || 8);
    case "captcha":
      return 30;
    default:
      return 10;
  }
}

function windowMs(kind: string): number {
  if (kind === "login") return 15 * 60 * 1000;
  return Number(process.env.RATE_LIMIT_WINDOW_MS || 60 * 60 * 1000);
}

export function rateLimit(kind: "register" | "download" | "login" | "contact" | "captcha", ip: string) {
  const key = `${kind}:${ip}`;
  const now = Date.now();
  const window = windowMs(kind);
  const max = limitFor(kind);
  const current = buckets.get(key);

  if (!current || current.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + window });
    return { ok: true, remaining: max - 1 };
  }

  if (current.count >= max) {
    return { ok: false, remaining: 0, retryAt: current.resetAt };
  }

  current.count += 1;
  return { ok: true, remaining: max - current.count };
}

export function assertSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) {
    const fetchSite = request.headers.get("sec-fetch-site");
    if (fetchSite === "same-origin" || fetchSite === "none") return true;
    return request.method === "GET";
  }
  try {
    const incoming = new URL(origin);
    const requestHost = request.headers.get("host");
    if (requestHost && incoming.host === requestHost) return true;
    const allowed = new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");
    return incoming.host === allowed.host;
  } catch {
    return false;
  }
}

export function publicError(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}
