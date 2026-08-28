import { createHash, randomBytes } from "node:crypto";
import { insert, query, queryOne } from "@/lib/database";
import type { DownloadRegistration } from "@/lib/validation";

export interface ProductRow {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  version: string | null;
  platform: string | null;
  download_enabled: number;
  file_path: string | null;
}

export interface DownloadRequestRow {
  id: number;
  product_id: number;
  product_slug: string;
  product_name: string;
  full_name: string;
  organization: string;
  designation: string;
  email: string;
  mobile: string;
  city: string;
  state: string;
  country: string;
  purpose: string;
  captcha_verified: number;
  authorized: number;
  token_expires_at: Date | string;
  created_at: Date | string;
  download_started: number;
  download_completed: number;
}

function tokenSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || "download-token-secret";
}

export function hashDownloadToken(token: string): string {
  return createHash("sha256").update(token).update(tokenSecret()).digest("hex");
}

export function createDownloadToken(): string {
  return randomBytes(32).toString("hex");
}

export async function getProductBySlug(slug: string): Promise<ProductRow | null> {
  return queryOne<ProductRow>(
    `SELECT id, name, slug, description, version, platform, download_enabled, file_path
     FROM products WHERE slug = ? LIMIT 1`,
    [slug],
  );
}

export async function createDownloadRequest(
  product: ProductRow,
  input: DownloadRegistration,
  ip: string,
  userAgent: string,
) {
  const token = createDownloadToken();
  const minutes = Number(process.env.DOWNLOAD_TOKEN_TTL_MINUTES || 15);
  const expires = new Date(Date.now() + minutes * 60 * 1000);

  const id = await insert(
    `INSERT INTO download_requests (
      product_id, full_name, organization, designation, email, mobile, city, state, country,
      purpose, ip_address, user_agent, consent, captcha_verified, download_token_hash, token_expires_at, authorized
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 1, ?, ?, 1)`,
    [
      product.id,
      input.fullName,
      input.organization,
      input.designation,
      input.email,
      input.mobile,
      input.city,
      input.state,
      input.country,
      input.purpose,
      ip.slice(0, 64),
      userAgent.slice(0, 512),
      hashDownloadToken(token),
      expires,
    ],
  );

  return { id, token, expiresAt: expires.toISOString() };
}

export async function findAuthorizedRequest(token: string, productSlug: string) {
  return queryOne<DownloadRequestRow>(
    `SELECT
        r.id, r.product_id, p.slug AS product_slug, p.name AS product_name,
        r.full_name, r.organization, r.designation, r.email, r.mobile, r.city, r.state, r.country,
        r.purpose, r.captcha_verified, r.authorized, r.token_expires_at, r.created_at,
        (SELECT COUNT(*) FROM download_events e WHERE e.download_request_id = r.id AND e.event_type = 'started') AS download_started,
        (SELECT COUNT(*) FROM download_events e WHERE e.download_request_id = r.id AND e.event_type = 'completed') AS download_completed
     FROM download_requests r
     INNER JOIN products p ON p.id = r.product_id
     WHERE r.download_token_hash = ? AND p.slug = ?
     LIMIT 1`,
    [hashDownloadToken(token), productSlug],
  );
}

export async function recordDownloadEvent(
  requestId: number,
  productId: number,
  eventType: "started" | "completed" | "denied" | "expired" | "error",
  ip: string,
  userAgent: string,
) {
  await insert(
    `INSERT INTO download_events (download_request_id, product_id, event_type, ip_address, user_agent)
     VALUES (?, ?, ?, ?, ?)`,
    [requestId, productId, eventType, ip.slice(0, 64), userAgent.slice(0, 512)],
  );
}

export async function insertContact(values: {
  fullName: string;
  email: string;
  organization?: string;
  phone?: string;
  enquiryType: string;
  product?: string;
  message: string;
  ip: string;
  userAgent: string;
}) {
  return insert(
    `INSERT INTO contact_enquiries
      (full_name, email, organization, phone, enquiry_type, product, message, ip_address, user_agent)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      values.fullName,
      values.email,
      values.organization || null,
      values.phone || null,
      values.enquiryType,
      values.product || null,
      values.message,
      values.ip.slice(0, 64),
      values.userAgent.slice(0, 512),
    ],
  );
}

export interface DownloadFilters {
  from?: string;
  to?: string;
  product?: string;
  state?: string;
  organization?: string;
  q?: string;
  page?: number;
  pageSize?: number;
}

function filterSql(filters: DownloadFilters) {
  const where: string[] = [];
  const params: Array<string | number> = [];
  if (filters.from) {
    where.push("r.created_at >= ?");
    params.push(`${filters.from} 00:00:00`);
  }
  if (filters.to) {
    where.push("r.created_at <= ?");
    params.push(`${filters.to} 23:59:59`);
  }
  if (filters.product) {
    where.push("p.slug = ?");
    params.push(filters.product);
  }
  if (filters.state) {
    where.push("r.state = ?");
    params.push(filters.state);
  }
  if (filters.organization) {
    where.push("r.organization LIKE ?");
    params.push(`%${filters.organization}%`);
  }
  if (filters.q) {
    where.push("(r.full_name LIKE ? OR r.email LIKE ? OR r.organization LIKE ? OR r.mobile LIKE ?)");
    const like = `%${filters.q}%`;
    params.push(like, like, like, like);
  }
  return { where: where.length ? `WHERE ${where.join(" AND ")}` : "", params };
}

export async function getDownloadStats(filters: DownloadFilters = {}) {
  const { where, params } = filterSql(filters);
  const andWhere = where ? where.replace(/^WHERE /, "AND ") : "";

  const totals = await queryOne<{
    total: number;
    today: number;
    month: number;
    unique_downloaders: number;
  }>(
    `SELECT
      (SELECT COUNT(*) FROM download_requests r INNER JOIN products p ON p.id = r.product_id ${where}) AS total,
      (SELECT COUNT(*) FROM download_requests r INNER JOIN products p ON p.id = r.product_id WHERE r.created_at >= CURDATE() ${andWhere}) AS today,
      (SELECT COUNT(*) FROM download_requests r INNER JOIN products p ON p.id = r.product_id WHERE r.created_at >= DATE_FORMAT(NOW(), '%Y-%m-01') ${andWhere}) AS month,
      (SELECT COUNT(DISTINCT r.email) FROM download_requests r INNER JOIN products p ON p.id = r.product_id ${where}) AS unique_downloaders`,
    [...params, ...params, ...params, ...params],
  );

  const byProduct = await query<{ name: string; slug: string; total: number }>(
    `SELECT p.name, p.slug, COUNT(*) AS total
     FROM download_requests r
     INNER JOIN products p ON p.id = r.product_id
     ${where}
     GROUP BY p.id, p.name, p.slug
     ORDER BY total DESC`,
    params,
  );

  const byDay = await query<{ day: string; total: number }>(
    `SELECT DATE(r.created_at) AS day, COUNT(*) AS total
     FROM download_requests r
     INNER JOIN products p ON p.id = r.product_id
     ${where}
     GROUP BY DATE(r.created_at)
     ORDER BY day ASC
     LIMIT 90`,
    params,
  );

  const byState = await query<{ state: string; total: number }>(
    `SELECT r.state, COUNT(*) AS total
     FROM download_requests r
     INNER JOIN products p ON p.id = r.product_id
     ${where}
     GROUP BY r.state
     ORDER BY total DESC
     LIMIT 20`,
    params,
  );

  const byOrg = await query<{ organization: string; total: number }>(
    `SELECT r.organization, COUNT(*) AS total
     FROM download_requests r
     INNER JOIN products p ON p.id = r.product_id
     ${where}
     GROUP BY r.organization
     ORDER BY total DESC
     LIMIT 20`,
    params,
  );

  const byCity = await query<{ city: string; total: number }>(
    `SELECT r.city, COUNT(*) AS total
     FROM download_requests r
     INNER JOIN products p ON p.id = r.product_id
     ${where}
     GROUP BY r.city
     ORDER BY total DESC
     LIMIT 20`,
    params,
  );

  const page = Math.max(1, filters.page || 1);
  const pageSize = Math.min(100, Math.max(10, filters.pageSize || 25));
  const offset = (page - 1) * pageSize;

  const rows = await query<
    DownloadRequestRow & { started: number; completed: number }
  >(
    `SELECT
        r.id, r.product_id, p.slug AS product_slug, p.name AS product_name,
        r.full_name, r.organization, r.designation, r.email, r.mobile, r.city, r.state, r.country,
        r.purpose, r.captcha_verified, r.authorized, r.token_expires_at, r.created_at,
        SUM(e.event_type = 'started') AS started,
        SUM(e.event_type = 'completed') AS completed
     FROM download_requests r
     INNER JOIN products p ON p.id = r.product_id
     LEFT JOIN download_events e ON e.download_request_id = r.id
     ${where}
     GROUP BY r.id
     ORDER BY r.created_at DESC
     LIMIT ${pageSize} OFFSET ${offset}`,
    params,
  );

  const countRow = await queryOne<{ total: number }>(
    `SELECT COUNT(*) AS total
     FROM download_requests r
     INNER JOIN products p ON p.id = r.product_id
     ${where}`,
    params,
  );

  return {
    totals: totals ?? { total: 0, today: 0, month: 0, unique_downloaders: 0 },
    byProduct,
    byDay,
    byState,
    byOrg,
    byCity,
    rows,
    page,
    pageSize,
    totalRows: countRow?.total ?? 0,
  };
}

export async function exportDownloadRows(filters: DownloadFilters) {
  const { where, params } = filterSql(filters);
  return query<DownloadRequestRow & { started: number; completed: number }>(
    `SELECT
        r.id, r.product_id, p.slug AS product_slug, p.name AS product_name,
        r.full_name, r.organization, r.designation, r.email, r.mobile, r.city, r.state, r.country,
        r.purpose, r.captcha_verified, r.authorized, r.token_expires_at, r.created_at,
        SUM(e.event_type = 'started') AS started,
        SUM(e.event_type = 'completed') AS completed
     FROM download_requests r
     INNER JOIN products p ON p.id = r.product_id
     LEFT JOIN download_events e ON e.download_request_id = r.id
     ${where}
     GROUP BY r.id
     ORDER BY r.created_at DESC
     LIMIT 5000`,
    params,
  );
}
