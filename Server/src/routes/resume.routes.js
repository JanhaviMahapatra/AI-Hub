import express from "express";

import protect from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

import {
    analyzeResume,
} from "../controllers/resume.controller.js";

const router = express.Router();

router.use(protect);

router.post(
    "/review",
    upload.single("file"),
    analyzeResume
);

export default router;