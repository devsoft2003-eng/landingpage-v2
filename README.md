# DevSoft website

Production website for DevSoft — technology built for mission-critical operations.

Stack: Next.js 16, React 19, TypeScript, Tailwind CSS 4, MySQL.

## Local development

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open http://localhost:3000. Marketing pages run without MySQL. Contact, downloads, and admin require a database.

## MySQL

1. Create a user and empty database, or let `sql/schema.sql` create `devsoft`.
2. Fill `DATABASE_*` in `.env.local`.
3. Set `ADMIN_SESSION_SECRET` to a long random string (32+ characters).
4. Apply schema and seed products:

```bash
npm run db:setup
```

5. Create the admin user (password is hashed with bcrypt; never stored in source):

```bash
# in .env.local
ADMIN_EMAIL=admin@dev-soft.in
ADMIN_PASSWORD=choose-a-strong-password
npm run db:seed-admin
```

Admin UI: `/admin/login` then `/admin/downloads`.

## KartvyaNama download

1. Place the signed APK at `storage/downloads/kartavyanama.apk` (or change `products.file_path` and `DOWNLOAD_STORAGE_PATH`).
2. User flow: product page → `/download/kartavyanama` → form + consent + CAPTCHA → server validation → token → `/api/download/kartavyanama?token=…` streams the file.
3. The public site never exposes a static `/uploads/*.apk` link.

## CAPTCHA

- Preferred: Cloudflare Turnstile. Set `CAPTCHA_SECRET_KEY` and `NEXT_PUBLIC_CAPTCHA_SITE_KEY`.
- Local fallback: a signed math challenge cookie via `/api/captcha` when Turnstile keys are absent.

## Deployment

- Set `NEXT_PUBLIC_SITE_URL` to the public origin (https://dev-soft.in).
- Use a managed MySQL instance. Do not commit `.env`.
- Keep APK files outside the web root; point `DOWNLOAD_STORAGE_PATH` at private disk.
- Reverse proxy should send `X-Forwarded-For`.
- In-memory rate limits are per process. Use a shared store (Redis) if you run multiple instances.

## Security checklist

- Parameterized MySQL queries
- Zod validation on the server
- bcrypt password hashes
- HttpOnly, SameSite=strict admin cookies
- Download tokens stored as SHA-256 hashes
- Path traversal checks on download files
- CAPTCHA + rate limits on register, download, login, contact
- Same-origin check on state-changing APIs
- Security headers in `next.config.ts`
- No stack traces or SQL errors returned to clients

## Content notes

Nigrani copy is based on the public product brochure (February 2026). TraceLens capabilities follow the brief and are marketing descriptions, not internals. KartvyaNama, Talash Gateway, EMS, and Task Master pages mark unpublished specifications as pending confirmation.
