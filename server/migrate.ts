import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../shared/schema";

const databaseUrl = process.env.DATABASE_URL || "";

async function main() {
  const sql = neon(databaseUrl);
  const db = drizzle(sql, { schema });

  console.log("Database schema ready");
}

main().catch(console.error);
