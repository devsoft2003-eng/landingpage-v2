import mysql from "mysql2/promise";
import fs from "node:fs";
import path from "node:path";

if (typeof process.loadEnvFile === "function") {
  const envPath = path.resolve(".env.local");
  if (fs.existsSync(envPath)) {
    process.loadEnvFile(envPath);
  }
}

async function main() {
  const host = process.env.DATABASE_HOST;
  const user = process.env.DATABASE_USER;
  const database = process.env.DATABASE_NAME;
  if (!host || !user || !database) {
    throw new Error("Set DATABASE_HOST, DATABASE_USER, and DATABASE_NAME.");
  }

  const schemaPath = path.resolve("sql/schema.sql");
  const sql = fs.readFileSync(schemaPath, "utf8");

  const connection = await mysql.createConnection({
    host,
    port: Number(process.env.DATABASE_PORT || 3306),
    user,
    password: process.env.DATABASE_PASSWORD ?? "",
    multipleStatements: true,
  });

  await connection.query(sql);
  await connection.end();
  console.log("Schema applied.");
}

main().catch((error) => {
  console.error("Database setup failed.");
  process.exitCode = 1;
  if (process.env.NODE_ENV !== "production") {
    console.error(error instanceof Error ? error.message : "Unknown error");
  }
});
