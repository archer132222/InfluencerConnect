import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "../shared/schema";
import path from "path";

// In production, use the mounted volume path "/app/data"
// In development, use the local file
const dbPath = process.env.NODE_ENV === "production"
  ? path.join("/app/data", "database.sqlite")
  : "./database.sqlite";

const sqlite = new Database(dbPath);
export const db = drizzle(sqlite, { schema });