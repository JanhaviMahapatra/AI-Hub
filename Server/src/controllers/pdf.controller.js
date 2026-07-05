import fs from "fs/promises";
import Document from "../models/document.model.js";

import {
    uploadPDF,
    askPDF,
    deletePDF,
} from "../services/pdf.service.js";

export const uploadDocument = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a PDF.",
            });
        }

        const result = await uploadPDF({
    filePath: req.file.path,
    originalName: req.file.originalname,
    userId: req.user._id.toString(),
});

await Document.create({
    user: req.user._id,
    documentId: result.document.document_id,
    filename: result.document.filename,
    totalChunks: result.document.chunks,
});

        await fs.unlink(req.file.path);

        return res.status(200).json(result);
    } catch (error) {
        console.error(error);

        if (req.file) {
            try {
                await fs.unlink(req.file.path);
            } catch {}
        }

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const askDocument = async (req, res) => {
    try {
        const { question, documentId } = req.body;

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

        if (!question || !documentId) {
            return res.status(400).json({
                success: false,
                message:
                    "Question and documentId are required.",
            });
        }

        const result = await askPDF({
            question,
            documentId,
            userId: req.user._id.toString(),
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

export const getDocuments = async (req, res) => {
    try {
        const documents = await Document.find({
            user: req.user._id,
        }).sort({
            createdAt: -1,
        });

        res.json({
            success: true,
            documents,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteDocument = async (req, res) => {
try {
    const document = await Document.findOne({
        _id: req.params.id,
        user: req.user._id,
    });

    if (!document) {
        return res.status(404).json({
            success: false,
            message: "Document not found.",
        });
    }

    await deletePDF(
        document.documentId
    );

    await document.deleteOne();

    res.json({
        success: true,
        message: "Document deleted.",
    });
} catch (error) {
    console.error(error);

    res.status(500).json({
        success: false,
        message: error.message,
    });
  }
};

