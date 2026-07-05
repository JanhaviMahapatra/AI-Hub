import { useState } from "react";
import ReactMarkdown from "react-markdown";
import "../style/PDFChat.css";

import api from "../services/api";

export default function PDFChat() {
    const [file, setFile] = useState(null);
    const [documentId, setDocumentId] = useState("");

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);

    const uploadPDF = async () => {
        if (!file) {
            alert("Please select a PDF.");
            return;
        }

        try {
            setUploading(true);

            const formData = new FormData();
            formData.append("file", file);

            const { data } = await api.post(
                "/pdf/upload",
                formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data",
                    },
                }
            );

            setDocumentId(
                data.document.document_id
            );

            alert("PDF uploaded successfully!");
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                    "Upload failed."
            );
        } finally {
            setUploading(false);
        }
    };

    const askQuestion = async () => {
        if (!question.trim()) return;

        if (!documentId) {
            alert("Upload a PDF first.");
            return;
        }

        try {
            setLoading(true);

            const { data } = await api.post(
                "/pdf/ask",
                {
                    question,
                    documentId,
                }
            );

            setAnswer(data.answer);
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                    "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

 return (
    <div className="pdf-page">
        <div className="bg-orb orb-left"></div>
        <div className="bg-orb orb-right"></div>

        <div className="pdf-container">

            <div className="pdf-header">

                <div className="badge">
                    AI Powered PDF Chat
                </div>

                <h1>
                    Chat with <span>Your PDF</span>
                </h1>

                <p>
                    Upload any PDF and ask questions naturally. AI will retrieve
                    relevant information and answer based only on your document.
                </p>

            </div>

            {/* Upload Card */}

            <div className="upload-card">

                <div className="upload-icon">
                    📄
                </div>

                <h2>Upload Document</h2>

                <p>
                    Upload a PDF to start chatting with it.
                </p>

                <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                />

                {file && (
                    <div className="selected-file">
                        {file.name}
                    </div>
                )}

                <button
                    onClick={uploadPDF}
                    disabled={uploading}
                >
                    {uploading ? "Uploading..." : "Upload PDF"}
                </button>

                {documentId && (
                    <div className="success-box">
                        ✅ Your PDF has been processed successfully.
                    </div>
                )}

            </div>

            {/* Ask Question */}

            <div className="chat-card">

                <h2>Ask Anything</h2>

                <p>
                    Ask questions about your uploaded PDF.
                </p>

                <textarea
                    rows={5}
                    placeholder="Example: Summarize this document..."
                    value={question}
                    onChange={(e) =>
                        setQuestion(e.target.value)
                    }
                />

                <button
                    onClick={askQuestion}
                    disabled={loading}
                >
                    {loading ? "Thinking..." : "Ask AI"}
                </button>

            </div>

            {/* AI Answer */}

            {answer && (
                <div className="answer-card">

                    <div className="answer-title">

                        <div className="answer-icon">
                            🤖
                        </div>

                        <div>
                            <h2>AI Answer</h2>
                            <span>
                                Generated from your uploaded PDF
                            </span>
                        </div>

                    </div>

                    <div className="answer-content">

                        <ReactMarkdown>
                            {answer}
                        </ReactMarkdown>

                    </div>

                </div>
            )}

        </div>
    </div>
);   
}