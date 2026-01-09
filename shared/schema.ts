import {
  pgTable,
  text,
  serial,
  integer,
  timestamp,
  json,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull(), // Enums handled by Zod/App logic
  avatar: text("avatar"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const influencers = pgTable("influencers", {
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
  platforms: json("platforms").$defaultFn(() => []), // Native Postgres JSON type
});

export const campaigns = pgTable("campaigns", {
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
  status: text("status").default("draft"),
  budget: integer("budget"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const campaignRequests = pgTable("campaign_requests", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  campaignId: text("campaign_id")
    .notNull()
    .references(() => campaigns.id),
  influencerId: text("influencer_id")
    .notNull()
    .references(() => users.id),
  status: text("status").default("pending"),
  budget: integer("budget"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const messages = pgTable("messages", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  senderId: text("sender_id")
    .notNull()
    .references(() => users.id),
  subject: text("subject").notNull(),
  content: text("content").notNull(),
  status: text("status").default("unread"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const supportTickets = pgTable("support_tickets", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id").references(() => users.id),
  email: text("email").notNull(),
  issueType: text("issue_type").notNull(),
  subject: text("subject").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Zod schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
}).extend({
  role: z.enum(["customer", "influencer"]), // Validating enums here
});

export const insertInfluencerSchema = createInsertSchema(influencers).omit({
  id: true,
});

export const insertCampaignSchema = createInsertSchema(campaigns).omit({
  id: true,
  createdAt: true,
}).extend({
  status: z.enum(["draft", "active", "completed"]).optional(),
});

export const insertCampaignRequestSchema = createInsertSchema(campaignRequests).omit({
  id: true,
  createdAt: true,
}).extend({
  status: z.enum(["pending", "accepted", "rejected", "completed"]).optional(),
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  createdAt: true,
  status: true,
});

export const insertSupportTicketSchema = createInsertSchema(supportTickets).omit({
  id: true,
  createdAt: true,
}).extend({
  issueType: z.enum(["feedback", "bug_report", "other"]),
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