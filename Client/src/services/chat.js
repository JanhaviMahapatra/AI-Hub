import api from "./api";

export const createChat = async () => {
    return await api.post("/chat");
};

export const getChats = async () => {
    return await api.get("/chat");
};

export const getChat = async (id) => {
    return await api.get(`/chat/${id}`);
};

export const deleteChat = async (id) => {
    return await api.delete(`/chat/${id}`);
};

/*
 * Streaming API
 * Calls the backend and returns the ReadableStream.
 */
export const streamMessage = async (id, message, token) => {
    const response = await fetch(
          `${import.meta.env.VITE_API_URL}/chat/${id}/message`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                message,
            }),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to stream response");
    }

    return response.body;
};