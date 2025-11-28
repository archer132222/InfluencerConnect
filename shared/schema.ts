import { sql } from "drizzle-orm";
import {
  pgTable,
  text,
  varchar,
  integer,
  timestamp,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  email: varchar("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  role: varchar("role", { enum: ["customer", "influencer"] }).notNull(),
  avatar: text("avatar"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const influencers = pgTable("influencers", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id),
  category: varchar("category").notNull(),
  followers: varchar("followers"),
  rating: varchar("rating").default("4.9"),
  bio: text("bio"),
  platforms: text("platforms")
    .array()
    .default(sql`'{}'::text[]`),
});

export const campaigns = pgTable("campaigns", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  brandId: varchar("brand_id")
    .notNull()
    .references(() => users.id),
  productName: text("product_name").notNull(),
  productDesc: text("product_desc"),
  targetAudience: text("target_audience"),
  platform: varchar("platform"),
  status: varchar("status", { enum: ["draft", "active", "completed"] }).default(
    "draft",
  ),
  budget: integer("budget"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const campaignRequests = pgTable("campaign_requests", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  campaignId: varchar("campaign_id")
    .notNull()
    .references(() => campaigns.id),
  influencerId: varchar("influencer_id")
    .notNull()
    .references(() => users.id),
  status: varchar("status", {
    enum: ["pending", "accepted", "rejected", "completed"],
  }).default("pending"),
  budget: integer("budget"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const messages = pgTable("messages", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  senderId: varchar("sender_id")
    .notNull()
    .references(() => users.id),
  subject: text("subject").notNull(),
  content: text("content").notNull(),
  status: varchar("status", { enum: ["unread", "read"] }).default("unread"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const supportTickets = pgTable("support_tickets", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  email: varchar("email").notNull(),
  issueType: varchar("issue_type", { enum: ["feedback", "bug_report", "other"] }).notNull(),
  subject: text("subject").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Zod schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertInfluencerSchema = createInsertSchema(influencers).omit({
  id: true,
});

export const insertCampaignSchema = createInsertSchema(campaigns).omit({
  id: true,
  createdAt: true,
});

export const insertCampaignRequestSchema = createInsertSchema(
  campaignRequests,
).omit({
  id: true,
  createdAt: true,
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  createdAt: true,
  status: true,
});

export const insertSupportTicketSchema = createInsertSchema(supportTickets).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type Influencer = typeof influencers.$inferSelect;
export type Campaign = typeof campaigns.$inferSelect;
export type CampaignRequest = typeof campaignRequests.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type SupportTicket = typeof supportTickets.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertInfluencer = z.infer<typeof insertInfluencerSchema>;
export type InsertCampaign = z.infer<typeof insertCampaignSchema>;
export type InsertCampaignRequest = z.infer<typeof insertCampaignRequestSchema>;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type InsertSupportTicket = z.infer<typeof insertSupportTicketSchema>;
