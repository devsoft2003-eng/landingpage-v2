import { NextRequest } from "next/server";
import { contactSchema } from "@/lib/validation";
import { verifyCaptcha } from "@/lib/captcha";
import { insertContact } from "@/lib/downloads";
import { isDatabaseConfigured } from "@/lib/database";
import { assertSameOrigin, publicError, rateLimit } from "@/lib/security";
import { getClientIp } from "@/lib/utils";

export async function POST(request: NextRequest) {
  if (!assertSameOrigin(request)) return publicError("Invalid request origin.", 403);
  if (!isDatabaseConfigured()) return publicError("The enquiry service is temporarily unavailable.", 503);

  const ip = getClientIp(request.headers);
  const limited = rateLimit("contact", ip);
  if (!limited.ok) return publicError("Too many enquiries from this network. Please try later.", 429);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return publicError("Invalid request.");
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] = issue.message;
    }
    return Response.json({ error: "Please correct the highlighted fields.", fieldErrors }, { status: 400 });
  }

  const captchaOk = await verifyCaptcha(parsed.data.captchaToken, ip);
  if (!captchaOk) return publicError("Verification failed. Please complete the challenge again.", 400);

  try {
    await insertContact({
      ...parsed.data,
      ip,
      userAgent: request.headers.get("user-agent") || "unknown",
    });
  } catch (error) {
    console.error("Contact enquiry could not be stored.");
    if (process.env.NODE_ENV !== "production") {
      console.error(error instanceof Error ? error.message : "Unknown database error");
    }
    return publicError("The enquiry service is temporarily unavailable.", 503);
  }

  return Response.json({ ok: true });
}
