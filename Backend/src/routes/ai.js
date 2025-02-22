import { Router } from "express";
import generateContent from "../Services/ai.js";
const router = Router();

router.get("/generate", async (req, res) => {
  const { prompt } = req.query;
  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required" });
  }
  const result = await generateContent(prompt);
  res.json({ result });
});

export default router;
