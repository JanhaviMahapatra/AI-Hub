import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
createConversation,
getConversations,
getConversation,
deleteConversation,
sendMessage,
} from "../controllers/chat.controller.js";

const router = express.Router();

router.use(protect);

router.post("/", createConversation);
router.get("/", getConversations);
router.get("/:id", getConversation);
router.delete("/:id", deleteConversation);
router.post("/:id/message", sendMessage);

export default router;