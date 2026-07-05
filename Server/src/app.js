import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import healthRoutes from "./routes/health.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import authRoutes from "./routes/auth.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import pdfRoutes from "./routes/pdf.routes.js";
import resumeRoutes from "./routes/resume.routes.js";
import codeReviewRoutes from "./routes/codeReview.routes.js";
import notesRoutes from "./routes/notes.routes.js";
import formAutofillRoutes from "./routes/formAutofill.routes.js";
import studyAssistantRoutes from "./routes/studyAssistant.routes.js";
import webSearchRoutes from "./routes/webSearch.routes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/pdf", pdfRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/code-review", codeReviewRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/form-autofill", formAutofillRoutes);
app.use("/api/study-assistant",studyAssistantRoutes);
app.use("/api/web-search",webSearchRoutes);

export default app;