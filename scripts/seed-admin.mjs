import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password || password.length < 12) {
    throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD (min 12 characters).");
  }

  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT || 3306),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD ?? "",
    database: process.env.DATABASE_NAME,
  });

  const hash = await bcrypt.hash(password, 12);
  await connection.execute(
    `INSERT INTO admin_users (email, password_hash) VALUES (?, ?)
     ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)`,
    [email.toLowerCase(), hash],
  );
  await connection.end();
  console.log("Admin user upserted.");
}

main().catch((error) => {
  console.error("Admin seed failed.");
  process.exitCode = 1;
  if (process.env.NODE_ENV !== "production") {
    console.error(error instanceof Error ? error.message : "Unknown error");
  }
});
