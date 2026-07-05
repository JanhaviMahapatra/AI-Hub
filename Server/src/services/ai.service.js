import "dotenv/config";
import axios from "axios";

const aiApi = axios.create({
    baseURL: process.env.FASTAPI_URL,
    timeout: 0,
});

export const generateChat = async (messages) => {
    const { data } = await aiApi.post("/chat", {
        messages,
        stream: false,
    });

    return data.reply;
};

export const streamChat = async (messages) => {
    const response = await aiApi.post(
        "/chat",
        {
            messages,
            stream: true,
        },
        {
            responseType: "stream",
        }
    );

    return response.data;
};

export const checkAIHealth = async () => {
    const { data } = await aiApi.get("/health");
    return data;
};

export default aiApi;