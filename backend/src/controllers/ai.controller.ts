import { Request, Response } from "express";
import { AIService } from "../services/ai.service";
const PDFParser = require("pdf2json");

export const chat = async (req: Request, res: Response) => {
const { message } = req.body;

try {
console.log("📩 Incoming message:", message);

const reply = await AIService.generateCompletion(
message,
"You are a helpful assistant."
);

console.log("✅ AI Reply:", reply);

res.json({ response: reply });
} catch (err: any) {
console.error("❌ CHAT ERROR:", err.message);
res.status(500).json({ error: err.message });
}
};

export const analyzeResume = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", (errData: any) => {
      console.error("🔥 PDF ERROR:", errData.parserError);
      res.status(500).json({ error: "PDF parsing failed" });
    });

    pdfParser.on("pdfParser_dataReady", async (pdfData: any) => {
      try {
        let text = "";

        pdfData.Pages.forEach((page: any) => {
          page.Texts.forEach((t: any) => {
            t.R.forEach((r: any) => {
              text += decodeURIComponent(r.T) + " ";
            });
          });
        });

        text = text.slice(0, 3000);

        const prompt = `Analyze resume:
1. Strengths
2. Weaknesses
3. Score out of 10

${text}`;

        const result = await AIService.generateCompletion(
          prompt,
          "You are an HR expert."
        );

        res.json({ analysis: result });

      } catch (err: any) {
        console.error("🔥 ANALYSIS ERROR:", err.message);
        res.status(500).json({ error: err.message });
      }
    });

    pdfParser.parseBuffer(req.file.buffer);

  } catch (err: any) {
    console.error("🔥 RESUME ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};