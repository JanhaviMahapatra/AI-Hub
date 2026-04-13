import { Request, Response } from "express";
import { AIService } from "../services/ai.service";

export const generateForm = async (req: Request, res: Response) => {
  const { name, purpose } = req.body;

  if (!name || !purpose) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const prompt = `
Generate realistic form data.

Name: ${name}
Purpose: ${purpose}

Return in clean format:
Name:
Email:
Phone:
Address:
Description:
`;

    const result = await AIService.generateCompletion(
      prompt,
      "You generate realistic user form data."
    );

    res.json({ data: result });

  } catch (err: any) {
    console.error("🔥 FORM ERROR:", err.message);
    res.status(500).json({ error: "Generation failed" });
  }
};