import fs from "fs";
import FormData from "form-data";

import aiApi from "./ai.service.js";

export const reviewResume = async ({
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
        "/resume/review",
        form,
        {
            headers: form.getHeaders(),
            maxBodyLength: Infinity,
            maxContentLength: Infinity,
        }
    );

    return data;
};