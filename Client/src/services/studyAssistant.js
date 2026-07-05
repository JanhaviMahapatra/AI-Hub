import api from "./api";

export const askStudyAssistant = async ({
    mode,
    question,
    documentId,
}) => {
    return api.post(
        "/study-assistant/ask",
        {
            mode,
            question,
            documentId,
        }
    );
};