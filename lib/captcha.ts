import { createHmac, randomInt, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "devsoft_captcha";

function secret(): string {
  return process.env.ADMIN_SESSION_SECRET || "dev-captcha-secret-change-me";
}

function sign(value: string): string {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

export async function createLocalCaptcha() {
  const a = randomInt(2, 12);
  const b = randomInt(2, 12);
  const answer = String(a + b);
  const nonce = randomInt(100000, 999999).toString();
  const payload = `${nonce}:${answer}`;
  const token = `${nonce}.${sign(payload)}`;

  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 10 * 60,
  });

  return { question: `What is ${a} + ${b}?`, provider: "local" as const };
}

export async function verifyLocalCaptcha(answer: string): Promise<boolean> {
  const store = await cookies();
  const cookie = store.get(COOKIE)?.value;
  if (!cookie) return false;
  const [nonce, signature] = cookie.split(".");
  if (!nonce || !signature) return false;

  const expected = sign(`${nonce}:${answer.trim()}`);
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  const ok = timingSafeEqual(left, right);
  store.set(COOKIE, "", { path: "/", expires: new Date(0) });
  return ok;
}

export async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secretKey = process.env.CAPTCHA_SECRET_KEY;
  if (!secretKey) return false;

  const body = new URLSearchParams({
    secret: secretKey,
    response: token,
    remoteip: ip,
  });

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!response.ok) return false;
  const data = (await response.json()) as { success?: boolean };
  return Boolean(data.success);
}

export function captchaMode(): "turnstile" | "local" {
  if (process.env.CAPTCHA_SECRET_KEY && process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY) {
    return "turnstile";
  }
  return "local";
}

export async function verifyCaptcha(token: string, ip: string): Promise<boolean> {
  if (captchaMode() === "turnstile") {
    return verifyTurnstile(token, ip);
  }
  return verifyLocalCaptcha(token);
}
