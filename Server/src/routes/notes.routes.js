import express from "express";

import protect from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

import {
    summarizeDocument,
} from "../controllers/notes.controller.js";

const router = express.Router();

router.use(protect);

router.post(
    "/summarize",
    upload.single("file"),
    summarizeDocument
);

export default router;