import { Router, type Response } from "express";
import { z } from "zod";
import { prisma } from "../db/index.js";
import { authMiddleware, type AuthRequest } from "../middleware/auth.js";

const router = Router();

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.string(),
  gender: z.string().min(1, "Gender is required"),
  location: z.string().min(1, "Location is required"),
  schooling: z.string(),
  college: z.string(),
  degree: z.string(),
  workStatus: z.string().min(1, "Work status is required"),
  industry: z.string(),
  yearsExperience: z.string(),
  familyStructure: z.string(),
  financialCondition: z.string(),
  familyRelationship: z.string(),
  personality: z.string().min(1, "Personality is required"),
  riskAppetite: z.string(),
  decisionStyle: z.string(),
  discipline: z.string(),
  interests: z.string(),
  hobbies: z.string(),
  relationshipStatus: z.string(),
  lifeGoals: z.string(),
  currentChallenges: z.string(),
});

router.use(authMiddleware);

router.put("/", async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;

    const parsed = profileSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.errors.map((e) => e.message).join(", ") });
      return;
    }

    const profile = await prisma.profile.upsert({
      where: { userId },
      create: { userId, ...parsed.data },
      update: parsed.data,
    });

    res.json(profile);
  } catch (err) {
    console.error("Profile save error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;

    const profile = await prisma.profile.findUnique({ where: { userId } });
    if (!profile) {
      res.status(404).json({ error: "Profile not found" });
      return;
    }

    res.json(profile);
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
