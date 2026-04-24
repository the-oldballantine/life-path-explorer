import { Router, type Response } from "express";
import { z } from "zod";
import { prisma } from "../db/index.js";
import { authMiddleware, type AuthRequest } from "../middleware/auth.js";

const router = Router();

const saveSchema = z.object({
  path: z.string(),
  mode: z.string(),
  tenure: z.number().min(1).max(20),
  scenario: z.string().optional().nullable(),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  summary: z.string().min(1),
  years: z.string(), // JSON string of YearEvent[]
});

router.use(authMiddleware);

router.post("/", async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const parsed = saveSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.errors.map((e) => e.message).join(", ") });
      return;
    }

    const narrative = await prisma.narrative.create({
      data: { userId, ...parsed.data },
    });

    res.status(201).json(narrative);
  } catch (err) {
    console.error("Narrative save error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const narratives = await prisma.narrative.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.json(narratives);
  } catch (err) {
    console.error("Narrative fetch error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const idParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const narrative = await prisma.narrative.findFirst({
      where: { id: idParam, userId },
    });

    if (!narrative) {
      res.status(404).json({ error: "Narrative not found" });
      return;
    }

    res.json(narrative);
  } catch (err) {
    console.error("Narrative fetch error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
