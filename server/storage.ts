import { db } from "./db";
import { users, influencers, campaigns, campaignRequests, insertUserSchema, insertInfluencerSchema, insertCampaignSchema, insertCampaignRequestSchema } from "@shared/schema";
import type { User, Influencer, Campaign, CampaignRequest, InsertUser, InsertInfluencer, InsertCampaign, InsertCampaignRequest } from "@shared/schema";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Influencers
  getInfluencer(userId: string): Promise<Influencer | undefined>;
  createInfluencer(influencer: InsertInfluencer): Promise<Influencer>;
  getAllInfluencers(): Promise<(Influencer & { user: User })[]>;
  
  // Campaigns
  createCampaign(campaign: InsertCampaign): Promise<Campaign>;
  getCampaign(id: string): Promise<Campaign | undefined>;
  getCampaignsByBrand(brandId: string): Promise<Campaign[]>;
  updateCampaignStatus(id: string, status: string): Promise<Campaign | undefined>;
  
  // Campaign Requests
  createCampaignRequest(request: InsertCampaignRequest): Promise<CampaignRequest>;
  getCampaignRequestsByInfluencer(influencerId: string): Promise<(CampaignRequest & { campaign: Campaign })[]>;
  getCampaignRequestsByCampaign(campaignId: string): Promise<(CampaignRequest & { influencer: Influencer & { user: User } })[]>;
  updateCampaignRequestStatus(id: string, status: string): Promise<CampaignRequest | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email));
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  async getInfluencer(userId: string): Promise<Influencer | undefined> {
    const result = await db.select().from(influencers).where(eq(influencers.userId, userId));
    return result[0];
  }

  async createInfluencer(influencer: InsertInfluencer): Promise<Influencer> {
    const result = await db.insert(influencers).values(influencer).returning();
    return result[0];
  }

  async getAllInfluencers(): Promise<(Influencer & { user: User })[]> {
    const result = await db
      .select()
      .from(influencers)
      .leftJoin(users, eq(influencers.userId, users.id));
    return result.map(r => ({ ...r.influencers!, user: r.users! }));
  }

  async createCampaign(campaign: InsertCampaign): Promise<Campaign> {
    const result = await db.insert(campaigns).values(campaign).returning();
    return result[0];
  }

  async getCampaign(id: string): Promise<Campaign | undefined> {
    const result = await db.select().from(campaigns).where(eq(campaigns.id, id));
    return result[0];
  }

  async getCampaignsByBrand(brandId: string): Promise<Campaign[]> {
    return db.select().from(campaigns).where(eq(campaigns.brandId, brandId));
  }

  async updateCampaignStatus(id: string, status: string): Promise<Campaign | undefined> {
    const result = await db
      .update(campaigns)
      .set({ status: status as any })
      .where(eq(campaigns.id, id))
      .returning();
    return result[0];
  }

  async createCampaignRequest(request: InsertCampaignRequest): Promise<CampaignRequest> {
    const result = await db.insert(campaignRequests).values(request).returning();
    return result[0];
  }

  async getCampaignRequestsByInfluencer(influencerId: string): Promise<(CampaignRequest & { campaign: Campaign })[]> {
    const result = await db
      .select()
      .from(campaignRequests)
      .leftJoin(campaigns, eq(campaignRequests.campaignId, campaigns.id))
      .where(eq(campaignRequests.influencerId, influencerId));
    return result.map(r => ({ ...r.campaign_requests!, campaign: r.campaigns! }));
  }

  async getCampaignRequestsByCampaign(campaignId: string): Promise<(CampaignRequest & { influencer: Influencer & { user: User } })[]> {
    const result = await db
      .select()
      .from(campaignRequests)
      .leftJoin(influencers, eq(campaignRequests.influencerId, influencers.userId))
      .leftJoin(users, eq(influencers.userId, users.id))
      .where(eq(campaignRequests.campaignId, campaignId));
    return result.map(r => ({
      ...r.campaign_requests,
      influencer: { ...r.influencers!, user: r.users! }
    }));
  }

  async updateCampaignRequestStatus(id: string, status: string): Promise<CampaignRequest | undefined> {
    const result = await db
      .update(campaignRequests)
      .set({ status: status as any })
      .where(eq(campaignRequests.id, id))
      .returning();
    return result[0];
  }
}

export const storage = new DatabaseStorage();
