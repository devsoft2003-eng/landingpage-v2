import { NextRequest } from "next/server";
import { downloadRegistrationSchema } from "@/lib/validation";
import { verifyCaptcha } from "@/lib/captcha";
import { createDownloadRequest, getProductBySlug } from "@/lib/downloads";
import { isDatabaseConfigured } from "@/lib/database";
import { assertSameOrigin, publicError, rateLimit } from "@/lib/security";
import { getClientIp } from "@/lib/utils";

export async function POST(request: NextRequest) {
  if (!assertSameOrigin(request)) return publicError("Invalid request origin.", 403);
  if (!isDatabaseConfigured()) return publicError("Download registration is temporarily unavailable.", 503);

  const ip = getClientIp(request.headers);
  const limited = rateLimit("register", ip);
  if (!limited.ok) return publicError("Too many download requests from this network. Please try later.", 429);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return publicError("Invalid request.");
  }

  const parsed = downloadRegistrationSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] = issue.message;
    }
    return Response.json({ error: "Please correct the highlighted fields.", fieldErrors }, { status: 400 });
  }

  const captchaOk = await verifyCaptcha(parsed.data.captchaToken, ip);
  if (!captchaOk) return publicError("CAPTCHA verification failed.", 400);

  try {
    const product = await getProductBySlug(parsed.data.productSlug);
    if (!product || !product.download_enabled) {
      return publicError("This product is not available for download.", 404);
    }

    const result = await createDownloadRequest(
      product,
      parsed.data,
      ip,
      request.headers.get("user-agent") || "unknown",
    );

    return Response.json({
      ok: true,
      token: result.token,
      expiresAt: result.expiresAt,
    });
  } catch {
    return publicError("Download registration is temporarily unavailable.", 503);
  }
}
