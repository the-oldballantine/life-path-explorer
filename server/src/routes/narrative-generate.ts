import { Router, type Response } from "express";
import { authMiddleware, type AuthRequest } from "../middleware/auth.js";
import { generateNarrative } from "../services/narrative-service.js";
import { prisma } from "../db/index.js";

const router = Router();

router.use(authMiddleware);

router.post("/", async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { path, mode, tenure, scenario, customPrompt } = req.body;

    if (!path || !mode || !tenure) {
      res.status(400).json({ error: "path, mode, and tenure are required" });
      return;
    }

    // Fetch user profile for personalization
    const profile = await prisma.profile.findUnique({ where: { userId } });
    if (!profile) {
      res.status(400).json({ error: "Profile required for narrative generation" });
      return;
    }

    const result = await generateNarrative({
      profile: {
        name: profile.name,
        age: profile.age,
        gender: profile.gender,
        location: profile.location,
        workStatus: profile.workStatus,
        industry: profile.industry,
        personality: profile.personality,
        interests: profile.interests,
        hobbies: profile.hobbies,
        riskAppetite: profile.riskAppetite,
        lifeGoals: profile.lifeGoals,
      },
      path,
      mode,
      tenure,
      scenario: scenario || undefined,
      customPrompt: customPrompt || undefined,
    });

    res.json(result);
  } catch (err) {
    console.error("Narrative generation error:", err);
    res.status(500).json({ error: "Narrative generation failed" });
  }
});

export default router;
