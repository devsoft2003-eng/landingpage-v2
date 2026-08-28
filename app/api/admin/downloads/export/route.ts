import { NextRequest } from "next/server";
import { getAdminFromSession } from "@/lib/auth";
import { exportDownloadRows } from "@/lib/downloads";
import { isDatabaseConfigured } from "@/lib/database";
import { publicError } from "@/lib/security";

export async function GET(request: NextRequest) {
  if (!isDatabaseConfigured()) return publicError("Unavailable.", 503);
  const admin = await getAdminFromSession();
  if (!admin) return publicError("Unauthorised.", 401);

  const sp = request.nextUrl.searchParams;
  const rows = await exportDownloadRows({
    from: sp.get("from") || undefined,
    to: sp.get("to") || undefined,
    product: sp.get("product") || undefined,
    state: sp.get("state") || undefined,
    organization: sp.get("organization") || undefined,
    q: sp.get("q") || undefined,
  });

  const header = [
    "Date",
    "Product",
    "Name",
    "Organization",
    "Designation",
    "Email",
    "Mobile",
    "City",
    "State",
    "Country",
    "Purpose",
    "Started",
    "Completed",
  ];
  const lines = [
    header.join(","),
    ...rows.map((row) =>
      [
        row.created_at,
        row.product_name,
        row.full_name,
        row.organization,
        row.designation,
        row.email,
        row.mobile,
        row.city,
        row.state,
        row.country,
        row.purpose,
        row.started,
        row.completed,
      ]
        .map((value) => `"${String(value ?? "").replaceAll('"', '""')}"`)
        .join(","),
    ),
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="devsoft-downloads.csv"',
      "Cache-Control": "no-store",
    },
  });
}
