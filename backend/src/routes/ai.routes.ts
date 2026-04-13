import { Router } from "express";
import { chat, analyzeResume } from "../controllers/ai.controller";
import { upload } from "../middleware/upload";

const router = Router();

router.post("/chat", chat);
router.post("/analyze-resume", upload.single("resume"), analyzeResume);

export default router;