import { NextRequest } from "next/server";
import { Readable } from "node:stream";
import { downloadTokenSchema } from "@/lib/validation";
import { findAuthorizedRequest, getProductBySlug, recordDownloadEvent } from "@/lib/downloads";
import { resolveDownloadFile } from "@/lib/download-file";
import { isDatabaseConfigured } from "@/lib/database";
import { publicError, rateLimit } from "@/lib/security";
import { getClientIp, safeFileName } from "@/lib/utils";

type Ctx = { params: Promise<{ product: string }> };

export async function GET(request: NextRequest, context: Ctx) {
  if (!isDatabaseConfigured()) return publicError("Download is temporarily unavailable.", 503);

  const { product: productSlug } = await context.params;
  const ip = getClientIp(request.headers);
  const limited = rateLimit("download", ip);
  if (!limited.ok) return publicError("Too many download attempts. Please wait.", 429);

  const token = request.nextUrl.searchParams.get("token") ?? "";
  const parsed = downloadTokenSchema.safeParse({ token, productSlug });
  if (!parsed.success) return publicError("Invalid download token.", 400);

  try {
    const product = await getProductBySlug(productSlug);
    if (!product || !product.download_enabled) return publicError("This product is not available for download.", 404);

    const record = await findAuthorizedRequest(token, productSlug);
    if (!record) return publicError("Unauthorised download request.", 401);
    if (!record.authorized || !record.captcha_verified) {
      await recordDownloadEvent(record.id, product.id, "denied", ip, request.headers.get("user-agent") || "unknown");
      return publicError("Unauthorised download request.", 401);
    }
    if (new Date(record.token_expires_at).getTime() < Date.now()) {
      await recordDownloadEvent(record.id, product.id, "expired", ip, request.headers.get("user-agent") || "unknown");
      return publicError("This download link has expired. Please register again.", 401);
    }

    const file = resolveDownloadFile(product.file_path);
    if (!file) {
      await recordDownloadEvent(record.id, product.id, "error", ip, request.headers.get("user-agent") || "unknown");
      return publicError("The application package is not available yet. Please contact DevSoft.", 503);
    }

    await recordDownloadEvent(record.id, product.id, "started", ip, request.headers.get("user-agent") || "unknown");

    const webStream = Readable.toWeb(file.stream()) as unknown as ReadableStream;
    const filename = safeFileName(`${product.slug}.apk`);

    const response = new Response(webStream, {
      headers: {
        "Content-Type": "application/vnd.android.package-archive",
        "Content-Length": String(file.size),
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });

    recordDownloadEvent(record.id, product.id, "completed", ip, request.headers.get("user-agent") || "unknown").catch(
      () => undefined,
    );

    return response;
  } catch {
    return publicError("Download is temporarily unavailable.", 503);
  }
}
