import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { insert, query, queryOne } from "@/lib/database";

const COOKIE_NAME = "devsoft_admin";
const SESSION_BYTES = 32;

function sessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("Authentication is not configured.");
  }
  return secret;
}

function hashToken(token: string): string {
  return createHash("sha256").update(token).update(sessionSecret()).digest("hex");
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, passwordHash: string): Promise<boolean> {
  return bcrypt.compare(password, passwordHash);
}

export async function createAdminSession(adminUserId: number, ip: string, userAgent: string) {
  const token = randomBytes(SESSION_BYTES).toString("hex");
  const hours = Number(process.env.SESSION_TTL_HOURS || 8);
  const expiresAt = new Date(Date.now() + hours * 60 * 60 * 1000);

  await insert(
    `INSERT INTO admin_sessions (admin_user_id, session_hash, expires_at, ip_address, user_agent)
     VALUES (?, ?, ?, ?, ?)`,
    [adminUserId, hashToken(token), expiresAt, ip.slice(0, 64), userAgent.slice(0, 512)],
  );

  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: expiresAt,
  });
}

export async function destroyAdminSession() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (token) {
    await query(`DELETE FROM admin_sessions WHERE session_hash = ?`, [hashToken(token)]);
  }
  store.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(0),
  });
}

export async function getAdminFromSession(): Promise<{ id: number; email: string } | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const row = await queryOne<{ id: number; email: string; expires_at: Date | string }>(
    `SELECT u.id, u.email, s.expires_at
     FROM admin_sessions s
     INNER JOIN admin_users u ON u.id = s.admin_user_id
     WHERE s.session_hash = ?
     LIMIT 1`,
    [hashToken(token)],
  );

  if (!row) return null;
  if (new Date(row.expires_at).getTime() < Date.now()) {
    await query(`DELETE FROM admin_sessions WHERE session_hash = ?`, [hashToken(token)]);
    return null;
  }
  return { id: row.id, email: row.email };
}

export async function findAdminByEmail(email: string) {
  return queryOne<{ id: number; email: string; password_hash: string }>(
    `SELECT id, email, password_hash FROM admin_users WHERE email = ? LIMIT 1`,
    [email],
  );
}

export function secretsEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}
