import Conversation from "../models/conversation.model.js";
import {
    generateChat,
    streamChat,
} from "../services/ai.service.js";

export const createConversation = async (req, res) => {
    try {
        const conversation = await Conversation.create({
            user: req.user._id,
            title: "New Chat",
            messages: [],
        });

        res.status(201).json({
            success: true,
            conversation,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getConversations = async (req, res) => {
    try {
        const conversations = await Conversation.find({
            user: req.user._id,
        }).sort({
            updatedAt: -1,
        });

        res.status(200).json({
            success: true,
            conversations,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getConversation = async (req, res) => {
    try {
        const conversation = await Conversation.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!conversation) {
            return res.status(404).json({
                success: false,
                message: "Conversation not found",
            });
        }

        res.status(200).json({
            success: true,
            conversation,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteConversation = async (req, res) => {
    try {
        const conversation = await Conversation.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!conversation) {
            return res.status(404).json({
                success: false,
                message: "Conversation not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Conversation deleted",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;

        const conversation = await Conversation.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!conversation) {
            return res.status(404).json({
                success: false,
                message: "Conversation not found",
            });
        }

        conversation.messages.push({
            role: "user",
            content: message,
        });

        await conversation.save();

        const stream = await streamChat(
            conversation.messages
        );

        res.setHeader(
            "Content-Type",
            "text/plain"
        );

        res.setHeader(
            "Transfer-Encoding",
            "chunked"
        );

        let assistantReply = "";
      
            stream.on("data", (chunk) => {
            const token = chunk.toString();

            assistantReply += token;

            res.write(token);
        });

        stream.on("end", async () => {
            try {
                conversation.messages.push({
                    role: "assistant",
                    content: assistantReply,
                });

                if (
                    conversation.title === "New Chat" &&
                    conversation.messages.length === 2
                ) {
                    conversation.title =
                        message.length > 40
                            ? `${message.substring(0, 40)}...`
                            : message;
                }

                await conversation.save();
            } catch (error) {
                console.error(
                    "Failed to save conversation:",
                    error
                );
            }

            res.end();
        });

         stream.on("error", (error) => {
            console.error("Streaming error:", error);

            if (!res.headersSent) {
                return res.status(500).json({
                    success: false,
                    message: "Failed to stream AI response",
                });
            }

            res.end();
        });
    } catch (error) {
        console.error("sendMessage error:", error);

        if (!res.headersSent) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }

        res.end();
    }
};       