import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertInfluencerSchema, insertCampaignSchema, insertMessageSchema, insertSupportTicketSchema } from "@shared/schema";
import bcrypt from "bcrypt";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Auth Routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const parsed = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByEmail(parsed.email);
      
      if (existingUser) {
        return res.status(400).json({ error: "Email already in use" });
      }

      const hashedPassword = await bcrypt.hash(parsed.password, 10);
      const user = await storage.createUser({
        ...parsed,
        password: hashedPassword,
      });

      // Store user ID in session
      (req.session as any).userId = user.id;
      (req.session as any).userRole = user.role;

      res.json({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await storage.getUserByEmail(email);

      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      (req.session as any).userId = user.id;
      (req.session as any).userRole = user.role;

      res.json({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ success: true });
    });
  });

  // Influencer Routes
  app.post("/api/influencers", async (req, res) => {
    try {
      const userId = (req.session as any)?.userId;
      if (!userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const parsed = insertInfluencerSchema.parse({
        userId,
        ...req.body,
      });

      const influencer = await storage.createInfluencer(parsed);
      res.json(influencer);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/influencers", async (req, res) => {
    try {
      const influencers = await storage.getAllInfluencers();
      res.json(
        influencers.map((inf) => ({
          id: inf.id,
          name: inf.user?.name,
          email: inf.user?.email,
          category: inf.category,
          followers: inf.followers,
          rating: inf.rating,
          bio: inf.bio,
          platforms: inf.platforms,
          avatar: inf.user?.avatar,
        }))
      );
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Campaign Routes
  app.post("/api/campaigns", async (req, res) => {
    try {
      const brandId = (req.session as any)?.userId;
      if (!brandId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const parsed = insertCampaignSchema.parse({
        brandId,
        ...req.body,
      });

      const campaign = await storage.createCampaign(parsed);
      res.json(campaign);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/campaigns/:id", async (req, res) => {
    try {
      const campaign = await storage.getCampaign(req.params.id);
      if (!campaign) {
        return res.status(404).json({ error: "Campaign not found" });
      }
      res.json(campaign);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/campaigns/brand/:brandId", async (req, res) => {
    try {
      const campaigns = await storage.getCampaignsByBrand(req.params.brandId);
      res.json(campaigns);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Campaign Requests Routes
  app.post("/api/campaign-requests", async (req, res) => {
    try {
      const userId = (req.session as any)?.userId;
      if (!userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const request = await storage.createCampaignRequest(req.body);
      res.json(request);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/campaign-requests/influencer/:influencerId", async (req, res) => {
    try {
      const requests = await storage.getCampaignRequestsByInfluencer(
        req.params.influencerId
      );
      res.json(requests);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/campaign-requests/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      const request = await storage.updateCampaignRequestStatus(
        req.params.id,
        status
      );
      if (!request) {
        return res.status(404).json({ error: "Request not found" });
      }
      res.json(request);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Message Routes
  app.post("/api/messages", async (req, res) => {
    try {
      const senderId = (req.session as any)?.userId;
      if (!senderId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const parsed = insertMessageSchema.parse({
        senderId,
        ...req.body,
      });

      const message = await storage.createMessage(parsed);
      res.json(message);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/messages", async (req, res) => {
    try {
      const messages = await storage.getAllMessages();
      res.json(messages);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/messages/user/:senderId", async (req, res) => {
    try {
      const messages = await storage.getMessagesBySender(req.params.senderId);
      res.json(messages);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/messages/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      const message = await storage.updateMessageStatus(req.params.id, status);
      if (!message) {
        return res.status(404).json({ error: "Message not found" });
      }
      res.json(message);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Support Ticket Routes
  app.post("/api/support-tickets", async (req, res) => {
    try {
      const userId = (req.session as any)?.userId;
      
      const parsed = insertSupportTicketSchema.parse({
        userId: userId || null,
        ...req.body,
      });

      const ticket = await storage.createSupportTicket(parsed);
      res.json(ticket);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/support-tickets", async (req, res) => {
    try {
      const tickets = await storage.getAllSupportTickets();
      res.json(tickets);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  return httpServer;
}
