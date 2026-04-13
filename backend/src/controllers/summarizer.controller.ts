import { Request, Response } from "express";
import { AIService } from "../services/ai.service";

export const summarize = async (req: Request, res: Response) => {
  const { text, length = "short" } = req.body;

  if (!text) return res.status(400).json({ error: "Text required" });

  try {
    const prompt = `Summarize this in ${length}:\n${text}`;

    const summary = await AIService.generateCompletion(
      prompt,
      "You are an expert summarizer."
    );

    res.json({ summary });
  } catch (err) {
    res.status(500).json({ error: "Summarization failed" });
  }
};