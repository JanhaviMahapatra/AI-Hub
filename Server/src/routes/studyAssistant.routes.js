import express from "express";

import protect from "../middleware/auth.middleware.js";

import {
    askQuestion,
} from "../controllers/studyAssistant.controller.js";

const router = express.Router();

router.use(protect);

router.post(
    "/ask",
    askQuestion
);

export default router;