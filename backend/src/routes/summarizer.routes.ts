import { Router } from "express";
import { summarize } from "../controllers/summarizer.controller";

const router = Router();

router.post("/summarize", summarize);

export default router;