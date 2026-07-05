import express from "express";
import { checkAIHealth } from "../controllers/ai.controller.js";

const router = express.Router();

router.get("/health", checkAIHealth);

export default router;