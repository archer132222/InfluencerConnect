import {
  sqliteTable,
  text,
  integer,
} from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  role: text("role", { enum: ["customer", "influencer"] }).notNull(),
  avatar: text("avatar"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const influencers = sqliteTable("influencers", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  category: text("category").notNull(),
  followers: text("followers"),
  rating: text("rating").default("4.9"),
  bio: text("bio"),
  platforms: text("platforms", { mode: "json" }).$defaultFn(() => []),
});

export const campaigns = sqliteTable("campaigns", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  brandId: text("brand_id")
    .notNull()
    .references(() => users.id),
  productName: text("product_name").notNull(),
  productDesc: text("product_desc"),
  targetAudience: text("target_audience"),
  platform: text("platform"),
  status: text("status", { enum: ["draft", "active", "completed"] }).default(
    "draft",
  ),
  budget: integer("budget"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const campaignRequests = sqliteTable("campaign_requests", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  campaignId: text("campaign_id")
    .notNull()
    .references(() => campaigns.id),
  influencerId: text("influencer_id")
    .notNull()
    .references(() => users.id),
  status: text("status", {
    enum: ["pending", "accepted", "rejected", "completed"],
  }).default("pending"),
  budget: integer("budget"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const messages = sqliteTable("messages", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  senderId: text("sender_id")
    .notNull()
    .references(() => users.id),
  subject: text("subject").notNull(),
  content: text("content").notNull(),
  status: text("status", { enum: ["unread", "read"] }).default("unread"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const supportTickets = sqliteTable("support_tickets", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id").references(() => users.id),
  email: text("email").notNull(),
  issueType: text("issue_type", { enum: ["feedback", "bug_report", "other"] }).notNull(),
  subject: text("subject").notNull(),
  description: text("description").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
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
