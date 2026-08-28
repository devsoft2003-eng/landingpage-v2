import { NextRequest } from "next/server";
import { createLocalCaptcha } from "@/lib/captcha";
import { rateLimit, publicError } from "@/lib/security";
import { getClientIp } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const ip = getClientIp(request.headers);
  const limited = rateLimit("captcha", ip);
  if (!limited.ok) return publicError("Too many requests. Please wait and try again.", 429);
  const challenge = await createLocalCaptcha();
  return Response.json(challenge);
}
