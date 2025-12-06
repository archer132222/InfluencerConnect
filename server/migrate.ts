import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "../shared/schema";

const dbPath = process.env.DATABASE_PATH || "./database.sqlite";

function main() {
  const sqlite = new Database(dbPath);
  const db = drizzle(sqlite, { schema });

  console.log("Database schema ready");
}

main();
