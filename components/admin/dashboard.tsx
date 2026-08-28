"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { formatDate } from "@/lib/utils";
import { products } from "@/config/products";

interface Stats {
  totals: { total: number; today: number; month: number; unique_downloaders: number };
  byProduct: { name: string; slug: string; total: number }[];
  byDay: { day: string; total: number }[];
  byState: { state: string; total: number }[];
  byOrg: { organization: string; total: number }[];
  byCity: { city: string; total: number }[];
  rows: Array<{
    created_at: string | Date;
    product_name: string;
    full_name: string;
    organization: string;
    designation: string;
    email: string;
    mobile: string;
    city: string;
    state: string;
    started: number;
    completed: number;
  }>;
  page: number;
  pageSize: number;
  totalRows: number;
}

export function AdminDashboard({
  email,
  stats,
  filters,
}: {
  email: string;
  stats: Stats;
  filters: Record<string, string>;
}) {
  const router = useRouter();
  const exportQuery = new URLSearchParams(
    Object.fromEntries(Object.entries(filters).filter(([, value]) => value)),
  ).toString();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  }

  const cards = [
    ["Total downloads", stats.totals.total],
    ["Today", stats.totals.today],
    ["This month", stats.totals.month],
    ["Unique downloaders", stats.totals.unique_downloaders],
    ["Products downloaded", stats.byProduct.length],
  ] as const;

  return (
    <div className="min-h-screen bg-navy-950">
      <header className="border-b border-white/10">
        <div className="container-shell flex h-16 items-center justify-between">
          <Logo compact />
          <div className="flex items-center gap-3 text-sm text-mist">
            <span>{email}</span>
            <Button variant="secondary" size="sm" type="button" onClick={logout}>
              Log out
            </Button>
          </div>
        </div>
      </header>
      <div className="container-shell py-8">
        <h1 className="text-3xl font-semibold text-ice">Download analytics</h1>
        <p className="mt-2 text-sm text-mist">Downloader records are internal. Do not share this screen.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {cards.map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-white/10 p-4">
              <div className="text-xs uppercase tracking-wider text-mist">{label}</div>
              <div className="mt-2 text-3xl font-semibold text-ice">{value}</div>
            </div>
          ))}
        </div>

        <form className="mt-8 grid gap-3 rounded-2xl border border-white/10 p-4 md:grid-cols-6" method="get">
          <div>
            <Label htmlFor="from">From</Label>
            <Input id="from" name="from" type="date" defaultValue={filters.from} />
          </div>
          <div>
            <Label htmlFor="to">To</Label>
            <Input id="to" name="to" type="date" defaultValue={filters.to} />
          </div>
          <div>
            <Label htmlFor="product">Product</Label>
            <select id="product" name="product" defaultValue={filters.product} className="h-11 w-full rounded-xl border border-white/10 bg-navy-950 px-3 text-sm">
              <option value="">All</option>
              {products.map((product) => (
                <option key={product.slug} value={product.slug}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="state">State</Label>
            <Input id="state" name="state" defaultValue={filters.state} />
          </div>
          <div>
            <Label htmlFor="organization">Organisation</Label>
            <Input id="organization" name="organization" defaultValue={filters.organization} />
          </div>
          <div>
            <Label htmlFor="q">Search</Label>
            <Input id="q" name="q" defaultValue={filters.q} placeholder="Name, email, mobile" />
          </div>
          <div className="md:col-span-6 flex gap-3">
            <Button type="submit" size="sm">
              Apply filters
            </Button>
            <Button asChild size="sm" variant="secondary">
              <a href={`/api/admin/downloads/export?${exportQuery}`}>Export CSV</a>
            </Button>
          </div>
        </form>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <ChartCard title="Downloads by day">
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={stats.byDay}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="#2dd4bf" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
          <ChartCard title="Downloads by product">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={stats.byProduct}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Bar dataKey="total" fill="#7dd3fc" radius={6} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
          <ChartCard title="Downloads by state">
            <SimpleList rows={stats.byState.map((row) => [row.state, row.total] as const)} />
          </ChartCard>
          <ChartCard title="Downloads by organisation">
            <SimpleList rows={stats.byOrg.map((row) => [row.organization, row.total] as const)} />
          </ChartCard>
        </div>

        <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-white/5 text-mist">
              <tr>
                {["Date", "Product", "Name", "Organisation", "Designation", "Email", "Mobile", "City", "State", "Status"].map(
                  (col) => (
                    <th key={col} className="px-3 py-3 font-medium">
                      {col}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {stats.rows.map((row, index) => (
                <tr key={`${row.email}-${index}`} className="border-t border-white/8">
                  <td className="px-3 py-3">{formatDate(row.created_at)}</td>
                  <td className="px-3 py-3">{row.product_name}</td>
                  <td className="px-3 py-3">{row.full_name}</td>
                  <td className="px-3 py-3">{row.organization}</td>
                  <td className="px-3 py-3">{row.designation}</td>
                  <td className="px-3 py-3">{row.email}</td>
                  <td className="px-3 py-3">{row.mobile}</td>
                  <td className="px-3 py-3">{row.city}</td>
                  <td className="px-3 py-3">{row.state}</td>
                  <td className="px-3 py-3">{row.completed ? "Completed" : row.started ? "Started" : "Registered"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={stats.page} pageSize={stats.pageSize} total={stats.totalRows} />
      </div>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 p-4">
      <h2 className="mb-4 text-sm font-semibold text-ice">{title}</h2>
      {children}
    </div>
  );
}

function SimpleList({ rows }: { rows: ReadonlyArray<readonly [string, number]> }) {
  return (
    <ul className="space-y-2 text-sm">
      {rows.map(([label, total]) => (
        <li key={label} className="flex justify-between text-mist">
          <span>{label}</span>
          <span className="text-ice">{total}</span>
        </li>
      ))}
    </ul>
  );
}

function Pagination({ page, pageSize, total }: { page: number; pageSize: number; total: number }) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  return (
    <div className="mt-4 flex items-center justify-between text-sm text-mist">
      <span>
        Page {page} of {pages}
      </span>
      <div className="flex gap-2">
        {page > 1 ? (
          <Link className="text-cyan" href={`?page=${page - 1}`}>
            Previous
          </Link>
        ) : null}
        {page < pages ? (
          <Link className="text-cyan" href={`?page=${page + 1}`}>
            Next
          </Link>
        ) : null}
      </div>
    </div>
  );
}
