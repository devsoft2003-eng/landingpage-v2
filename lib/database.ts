import mysql from "mysql2/promise";

type SqlParam = string | number | boolean | Date | Buffer | null;

type GlobalPool = typeof globalThis & {
  __devsoftPool?: mysql.Pool;
};

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error("Database is not configured.");
  }
  return value;
}

export function isDatabaseConfigured(): boolean {
  return Boolean(
    process.env.DATABASE_HOST &&
      process.env.DATABASE_NAME &&
      process.env.DATABASE_USER,
  );
}

export function getPool(): mysql.Pool {
  const g = globalThis as GlobalPool;
  if (!g.__devsoftPool) {
    const pool = mysql.createPool({
      host: required("DATABASE_HOST"),
      port: Number(process.env.DATABASE_PORT || 3306),
      user: required("DATABASE_USER"),
      password: process.env.DATABASE_PASSWORD ?? "",
      database: required("DATABASE_NAME"),
      waitForConnections: true,
      connectionLimit: 10,
      namedPlaceholders: false,
      timezone: "Z",
      enableKeepAlive: true,
    });
    
    g.__devsoftPool = pool;
  }
  return g.__devsoftPool;
}

export function resetPool() {
  const g = globalThis as GlobalPool;
  if (g.__devsoftPool) {
    g.__devsoftPool.end().catch(() => undefined);
    g.__devsoftPool = undefined;
  }
}

export async function query<T>(sql: string, params: SqlParam[] = []): Promise<T[]> {
  try {
    const [rows] = await getPool().execute(sql, params);
    return rows as T[];
  } catch {
    resetPool();
    const [rows] = await getPool().execute(sql, params);
    return rows as T[];
  }
}

export async function queryOne<T>(sql: string, params: SqlParam[] = []): Promise<T | null> {
  const rows = await query<T>(sql, params);
  return rows[0] ?? null;
}

export async function insert(sql: string, params: SqlParam[] = []): Promise<number> {
  const run = async () => {
    const [result] = await getPool().execute(sql, params);
    const header = result as mysql.ResultSetHeader;
    return Number(header.insertId);
  };
  try {
    return await run();
  } catch {
    resetPool();
    return run();
  }
}

