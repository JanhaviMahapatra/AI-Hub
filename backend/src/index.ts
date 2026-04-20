import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import summarizerRoutes from "./routes/summarizer.routes";
import aiRoutes from "./routes/ai.routes";
import pdfRoutes from "./routes/pdf.routes";
import formRoutes from "./routes/form.routes";

dotenv.config();

const app = express();

app.use(cors({
origin: "*"
}));

app.use(express.json());

app.use("/api/summarizer", summarizerRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/pdf", pdfRoutes);
app.use("/api/form", formRoutes);

app.listen(5000, () => {
  console.log("Server running on 5000");
});