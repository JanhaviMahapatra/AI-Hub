import { Request, Response } from "express";
import { VectorService } from "../services/vector.service";
import { AIService } from "../services/ai.service";

const PDFParser = require("pdf2json");

// 🔹 Upload + Index PDF (with embeddings)
export const uploadPDF = async (req: Request, res: Response) => {
if (!req.file) return res.status(400).json({ error: "No PDF uploaded" });

try {
const pdfParser = new PDFParser();

pdfParser.on("pdfParser_dataError", (errData: any) => {
console.error("🔥 PDF ERROR:", errData.parserError);
return res.status(500).json({ error: "PDF parsing failed" });
});

pdfParser.on("pdfParser_dataReady", async (pdfData: any) => {
try {
let text = "";

// 🔥 Extract text
pdfData.Pages.forEach((page: any) => {
page.Texts.forEach((t: any) => {
t.R.forEach((r: any) => {
text += decodeURIComponent(r.T) + " ";
});
});
});

// 🔹 Clean text
text = text.replace(/\s+/g, " ").trim();

// 🔹 Chunk text
const chunks = text.match(/.{1,800}/g) || [];

// 🔹 Store with embeddings (semantic)
for (let i = 0; i < chunks.length; i++) {
await VectorService.addDocument(
`${req.file.originalname}-${i}`,
chunks[i]
);
}

res.json({
message: "PDF indexed successfully (semantic)",
chunks: chunks.length,
});

} catch (err: any) {
console.error("🔥 INDEX ERROR:", err.message);
res.status(500).json({ error: "Indexing failed" });
}
});

pdfParser.parseBuffer(req.file.buffer);

} catch (err: any) {
console.error("🔥 UPLOAD ERROR:", err.message);
res.status(500).json({ error: "Upload failed" });
}
};

// 🔹 Query PDF (semantic search)
export const queryPDF = async (req: Request, res: Response) => {
const { query } = req.body;

if (!query) {
return res.status(400).json({ error: "Query is required" });
}

try {
const context = await VectorService.queryDocs(query);

const prompt = `
You are a helpful assistant.

Use the context below to answer the question.
If exact answer is not present, infer from meaning.

Context:
${context}

Question:
${query}
`;

const answer = await AIService.generateCompletion(
prompt,
"Answer clearly and helpfully."
);

res.json({ answer });

} catch (err: any) {
console.error("🔥 QUERY ERROR:", err.message);
res.status(500).json({ error: "Query failed" });
}
};
