import express from "express";

import protect from "../middleware/auth.middleware.js";

import {
    searchWeb,
} from "../controllers/webSearch.controller.js";

const router = express.Router();

router.use(protect);

router.post(
    "/search",
    searchWeb
);

export default router;