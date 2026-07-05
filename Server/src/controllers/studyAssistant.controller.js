import Document from "../models/document.model.js";

import { askStudyAssistant } from "../services/studyAssistant.service.js";

export const askQuestion = async (req, res) => {
    try {
        const {
            mode,
            question,
            documentId,
        } = req.body;

        if (!mode) {
            return res.status(400).json({
                success: false,
                message: "Mode is required.",
            });
        }

        if (!question) {
            return res.status(400).json({
                success: false,
                message: "Question is required.",
            });
        }

        if (!documentId) {
            return res.status(400).json({
                success: false,
                message: "Document ID is required.",
            });
        }

        const document = await Document.findOne({
            documentId,
            user: req.user._id,
        });

        if (!document) {
            return res.status(404).json({
                success: false,
                message: "Document not found.",
            });
        }

        const result = await askStudyAssistant({
            mode,
            question,
            userId: req.user._id.toString(),
            documentId,
        });

        return res.status(200).json(result);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};