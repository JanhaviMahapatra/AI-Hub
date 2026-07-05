import aiApi from "./ai.service.js";


//AI Study Assistant
export const askStudyAssistant = async ({
    mode,
    question,
    userId,
    documentId,
}) => {
    const { data } = await aiApi.post(
        "/study-assistant/ask",
        {
            mode,
            question,
            user_id: userId,
            document_id: documentId,
        }
    );

    return data;
};