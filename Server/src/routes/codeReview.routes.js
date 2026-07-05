import express from "express";

import protect from "../middleware/auth.middleware.js";
import { reviewSourceCode } from "../controllers/codeReview.controller.js";

const router = express.Router();

router.use(protect);

router.post("/", reviewSourceCode);

export default router;