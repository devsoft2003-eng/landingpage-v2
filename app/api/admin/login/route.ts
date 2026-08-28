import { NextRequest } from "next/server";
import { adminLoginSchema } from "@/lib/validation";
import { createAdminSession, findAdminByEmail, verifyPassword } from "@/lib/auth";
import { isDatabaseConfigured } from "@/lib/database";
import { assertSameOrigin, publicError, rateLimit } from "@/lib/security";
import { getClientIp } from "@/lib/utils";

export async function POST(request: NextRequest) {
  if (!assertSameOrigin(request)) return publicError("Invalid request origin.", 403);
  if (!isDatabaseConfigured()) return publicError("Sign-in is temporarily unavailable.", 503);

  const ip = getClientIp(request.headers);
  const limited = rateLimit("login", ip);
  if (!limited.ok) return publicError("Too many sign-in attempts. Please wait.", 429);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return publicError("Invalid request.");
  }

  const parsed = adminLoginSchema.safeParse(body);
  if (!parsed.success) return publicError("Invalid credentials.", 401);

  try {
    const admin = await findAdminByEmail(parsed.data.email.toLowerCase());
    if (!admin) return publicError("Invalid credentials.", 401);
    const ok = await verifyPassword(parsed.data.password, admin.password_hash);
    if (!ok) return publicError("Invalid credentials.", 401);
    await createAdminSession(admin.id, ip, request.headers.get("user-agent") || "unknown");
    return Response.json({ ok: true });
  } catch {
    return publicError("Sign-in is temporarily unavailable.", 503);
  }
}
