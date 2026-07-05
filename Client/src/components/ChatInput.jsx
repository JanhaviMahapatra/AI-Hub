import { useState } from "react";
import { streamMessage } from "../services/chat";

import "../style/ChatInput.css";

export default function ChatInput({
    selectedChat,
    setSelectedChat,
    loading,
    setLoading,
}) {
    const [message, setMessage] = useState("");

    const handleSend = async () => {
        if (!message.trim() || loading) return;

        const prompt = message.trim();

        setMessage("");
        setLoading(true);

        setSelectedChat((prev) => ({
            ...prev,
            messages: [
                ...prev.messages,
                {
                    role: "user",
                    content: prompt,
                },
                {
                    role: "assistant",
                    content: "",
                },
            ],
        }));

        try {
            const token = localStorage.getItem("token");

            const stream = await streamMessage(
                selectedChat._id,
                prompt,
                token
            );

            const reader = stream.getReader();
            const decoder = new TextDecoder();

            let fullResponse = "";

            while (true) {
                const { value, done } = await reader.read();

                if (done) break;

                fullResponse += decoder.decode(value, {
                    stream: true,
                });

                setSelectedChat((prev) => {
                    const messages = [...prev.messages];

                    messages[messages.length - 1] = {
                        ...messages[messages.length - 1],
                        content: fullResponse,
                    };

                    return {
                        ...prev,
                        messages,
                    };
                });
            }
        } catch (error) {
            console.error(error);

            setSelectedChat((prev) => {
                const messages = [...prev.messages];

                messages[messages.length - 1] = {
                    role: "assistant",
                    content:
                        "❌ Failed to generate response.",
                };

                return {
                    ...prev,
                    messages,
                };
            });
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

 return (
    <div className="nexus-chat-input-container">
        <textarea
            rows={3}
            value={message}
            disabled={loading}
            placeholder="Type your message... (Press Enter to send)"
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="nexus-chat-textarea"
        />

        <div className="nexus-chat-actions">
            <button
                onClick={handleSend}
                disabled={loading || !message.trim()}
                className={`nexus-chat-send-btn ${loading ? 'loading' : ''}`}
            >
                {loading ? (
                    <>
                        <span className="material-symbols-outlined spin-icon"></span>
                        Generating...
                    </>
                ) : (
                    <>
                        Send
                        <span className="material-symbols-outlined"></span>
                    </>
                )}
            </button>
        </div>
    </div>
);  
}