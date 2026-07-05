import fs from "fs";
import FormData from "form-data";

import aiApi from "./ai.service.js";

/**
 * Upload a PDF and extract structured information.
 */
export const extractFormData = async ({
    filePath,
    originalName,
}) => {
    const form = new FormData();

    form.append(
        "file",
        fs.createReadStream(filePath),
        originalName
    );

    const { data } = await aiApi.post(
        "/form-autofill/extract",
        form,
        {
            headers: form.getHeaders(),
            maxBodyLength: Infinity,
            maxContentLength: Infinity,
        }
    );

    return data;
};