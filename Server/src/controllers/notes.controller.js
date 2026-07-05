import fs from "fs/promises";

import { summarizeNotes } from "../services/notes.service.js";

export const summarizeDocument = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a PDF.",
            });
        }

        const result = await summarizeNotes({
            filePath: req.file.path,
            originalName: req.file.originalname,
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