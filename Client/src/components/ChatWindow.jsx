import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

import "../style/ChatWindow.css";

export default function ChatWindow({ selectedChat }) {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [selectedChat]);

    if (!selectedChat) {
        return (
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <h2>Start a New Conversation</h2>
            </div>
        );
    }

return (
    <div className="nexus-chat-window-viewport">
        {selectedChat.messages.length === 0 ? (
            <div className="nexus-empty-chat-state">
                <span className="material-symbols-outlined empty-state-icon">AI-Hub</span>
                <h2 className="empty-state-title"></h2>
                <p className="empty-state-text">
                    
                </p>
            </div>
        ) : (
            selectedChat.messages.map((message, index) => (
                <ChatMessage
                    key={index}
                    message={message}
                />
            ))
        )}

        <div ref={bottomRef} />
    </div>
);
}