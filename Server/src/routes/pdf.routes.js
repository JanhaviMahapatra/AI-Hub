import express from "express";

import protect from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

import {
    uploadDocument,
    askDocument,
    getDocuments,
    deleteDocument,
} from "../controllers/pdf.controller.js";

const router = express.Router();

router.use(protect);

router.post("/upload",upload.single("file"),uploadDocument);

router.post("/ask",askDocument);

router.get("/", getDocuments);

router.delete("/:id", deleteDocument);

export default router;