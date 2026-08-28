import { redirect } from "next/navigation";
import { getAdminFromSession } from "@/lib/auth";
import { isDatabaseConfigured } from "@/lib/database";
import { getDownloadStats } from "@/lib/downloads";
import { AdminDashboard } from "@/components/admin/dashboard";

export const dynamic = "force-dynamic";

export default async function AdminDownloadsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  if (!isDatabaseConfigured()) {
    redirect("/admin/login");
  }
  const admin = await getAdminFromSession();
  if (!admin) redirect("/admin/login");

  const sp = await searchParams;
  const pick = (key: string) => (typeof sp[key] === "string" ? sp[key] : undefined);
  const stats = await getDownloadStats({
    from: pick("from"),
    to: pick("to"),
    product: pick("product"),
    state: pick("state"),
    organization: pick("organization"),
    q: pick("q"),
    page: pick("page") ? Number(pick("page")) : 1,
  });

  return <AdminDashboard email={admin.email} stats={stats} filters={{
    from: pick("from") ?? "",
    to: pick("to") ?? "",
    product: pick("product") ?? "",
    state: pick("state") ?? "",
    organization: pick("organization") ?? "",
    q: pick("q") ?? "",
  }} />;
}
