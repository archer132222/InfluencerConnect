import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table (required for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User table (modified for Replit Auth)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: varchar("role", { enum: ["customer", "influencer"] }).default("customer"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const influencers = pgTable("influencers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  category: varchar("category").notNull(),
  followers: varchar("followers"),
  rating: varchar("rating").default("4.9"),
  bio: text("bio"),
  platforms: text("platforms").array().default(sql`'{}'::text[]`),
});

export const campaigns = pgTable("campaigns", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  brandId: varchar("brand_id").notNull().references(() => users.id),
  productName: text("product_name").notNull(),
  productDesc: text("product_desc"),
  targetAudience: text("target_audience"),
  platform: varchar("platform"),
  status: varchar("status", { enum: ["draft", "active", "completed"] }).default("draft"),
  budget: integer("budget"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const campaignRequests = pgTable("campaign_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  campaignId: varchar("campaign_id").notNull().references(() => campaigns.id),
  influencerId: varchar("influencer_id").notNull().references(() => users.id),
  status: varchar("status", { enum: ["pending", "accepted", "rejected", "completed"] }).default("pending"),
  budget: integer("budget"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Zod schemas
export const insertInfluencerSchema = createInsertSchema(influencers).omit({
  id: true,
});

export const insertCampaignSchema = createInsertSchema(campaigns).omit({
  id: true,
  createdAt: true,
});

export const insertCampaignRequestSchema = createInsertSchema(campaignRequests).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type UpsertUser = typeof users.$inferInsert;
export type Influencer = typeof influencers.$inferSelect;
export type Campaign = typeof campaigns.$inferSelect;
export type CampaignRequest = typeof campaignRequests.$inferSelect;

export type InsertInfluencer = z.infer<typeof insertInfluencerSchema>;
export type InsertCampaign = z.infer<typeof insertCampaignSchema>;
export type InsertCampaignRequest = z.infer<typeof insertCampaignRequestSchema>;
