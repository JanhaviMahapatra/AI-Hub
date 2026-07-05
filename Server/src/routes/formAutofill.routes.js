import express from "express";

import protect from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

import {
    extractDocumentData,
} from "../controllers/formAutofill.controller.js";

const router = express.Router();

router.use(protect);

router.post(
    "/extract",
    upload.single("file"),
    extractDocumentData
);

export default router;