import fs from "fs";
import FormData from "form-data";
import aiApi from "./ai.service.js";

/**
 * Upload a PDF to FastAPI for ingestion.
 */
export const uploadPDF = async ({
    filePath,
    originalName,
    userId,
}) => {
    const form = new FormData();

    form.append(
        "file",
        fs.createReadStream(filePath),
        originalName
    );

    form.append("user_id", userId);

    const { data } = await aiApi.post(
        "/pdf-chat/upload",
        form,
        {
            headers: form.getHeaders(),
            maxBodyLength: Infinity,
            maxContentLength: Infinity,
        }
    );

    return data;
};

/**
 * Ask questions about an uploaded PDF.
 */
export const askPDF = async ({
    question,
    userId,
    documentId,
}) => {
    const { data } = await aiApi.post(
        "/pdf-chat/ask",
        {
            question,
            user_id: userId,
            document_id: documentId,
        }
    );

    return data;
};

export const deletePDF = async (
    documentId
) => {
    const { data } = await aiApi.delete(
        `/pdf-chat/${documentId}`
    );

    return data;
};