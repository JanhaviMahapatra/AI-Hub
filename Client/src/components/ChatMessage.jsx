import ReactMarkdown from "react-markdown";
import "../style/ChatMessage.css";

export default function ChatMessage({ message }) {
    const isUser = message.role === "user";

    return (
        <div
            style={{
                display: "flex",
                justifyContent: isUser
                    ? "flex-end"
                    : "flex-start",
                marginBottom: "16px",
            }}
        >
            <div
                style={{
                    maxWidth: "70%",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    backgroundColor: isUser
                        ? "#2563eb"
                        : "#f1f5f9",
                    color: isUser ? "#fff" : "#000",
                    wordBreak: "break-word",
                    boxShadow:
                        "0 1px 3px rgba(0,0,0,0.1)",
                }}
            >
                <div
                    style={{
                        fontSize: "12px",
                        fontWeight: "bold",
                        marginBottom: "8px",
                        opacity: 0.8,
                    }}
                >
                    {isUser ? "You" : "AI"}
                </div>

                {isUser ? (
                    <div
                        style={{
                            whiteSpace: "pre-wrap",
                        }}
                    >
                        {message.content}
                    </div>
                ) : (
                    <div
                        style={{
                            lineHeight: "1.7",
                        }}
                    >
                        <ReactMarkdown>
                            {message.content}
                        </ReactMarkdown>
                    </div>
                )}
            </div>
        </div>
    );
}