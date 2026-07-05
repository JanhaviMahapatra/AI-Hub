import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import UploadSection from "../components/study/UploadSection";
import DocumentSelector from "../components/study/DocumentSelector";
import ModeSelector from "../components/study/ModeSelector";
import QuestionInput from "../components/study/QuestionInput";
import ResponseViewer from "../components/study/ResponseViewer";
import "../style/StudyAssistant.css";

import api from "../services/api";
import { askStudyAssistant } from "../services/studyAssistant";

export default function StudyAssistant() {
    const [documents, setDocuments] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState("");

    const [file, setFile] = useState(null);

    const [mode, setMode] = useState("question");

    const [question, setQuestion] = useState("");

    const [result, setResult] = useState(null);

    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadDocuments();
    }, []);

    const loadDocuments = async () => {
        try {
            const { data } = await api.get("/pdf");

            setDocuments(data.documents);

            if (
                data.documents.length > 0 &&
                !selectedDocument
            ) {
                setSelectedDocument(
                    data.documents[0].documentId
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please choose a PDF.");
            return;
        }

        try {
            setUploading(true);

            const formData = new FormData();

            formData.append("file", file);

            await api.post("/pdf/upload", formData, {
                headers: {
                    "Content-Type":
                        "multipart/form-data",
                },
            });

            setFile(null);

            await loadDocuments();

            alert("Study material uploaded.");
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

    const handleGenerate = async () => {
        if (!selectedDocument) {
            alert("Please select a study material.");
            return;
        }

        let prompt = question;

        if (
            mode === "summary" ||
            mode === "important_topics"
        ) {
            prompt = "Entire document";
        }

        if (!prompt.trim()) {
            alert("Please enter a topic or question.");
            return;
        }

        try {
            setLoading(true);

            const { data } =
                await askStudyAssistant({
                    mode,
                    question: prompt,
                    documentId: selectedDocument,
                });

            console.log("Study Assistant Response:", data);


            setResult(data.result);
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
    <>
        <Navbar />

        <div className="nexus-assistant-layout">
            {/* Atmospheric platform background glow modules */}
            <div className="nexus-ambient-glow nexus-glow-left"></div>
            <div className="nexus-ambient-glow nexus-glow-right"></div>

            <header className="nexus-assistant-header">
                <h1 className="nexus-assistant-title">AI Study Assistant</h1>
                <p className="nexus-assistant-subtitle">
                    Upload your materials, select a strategy mode, and orchestrate deep study insights with precision.
                </p>
            </header>

            <div className="nexus-assistant-workspace-deck">
                <UploadSection
                    file={file}
                    setFile={setFile}
                    uploading={uploading}
                    handleUpload={handleUpload}
                />

                <DocumentSelector
                    documents={documents}
                    selectedDocument={selectedDocument}
                    setSelectedDocument={setSelectedDocument}
                />

                <ModeSelector
                    mode={mode}
                    setMode={setMode}
                />

                <QuestionInput
                    mode={mode}
                    question={question}
                    setQuestion={setQuestion}
                />

                <div className="nexus-action-strip">
                    <button
                        onClick={handleGenerate}
                        disabled={loading || (!selectedDocument && mode !== "summary")}
                        className={`nexus-generate-btn ${loading ? 'is-loading' : ''}`}
                    >
                        {loading ? (
                            <>
                                <span className="material-symbols-outlined spin-icon"></span>
                                <span>Generating Core...</span>
                            </>
                        ) : (
                            <>
                                <span>Execute Pipeline</span>
                                <span className="material-symbols-outlined btn-arrow"></span>
                            </>
                        )}
                    </button>
                </div>

                <ResponseViewer
                    mode={mode}
                    result={result}
                />
            </div>
        </div>
    </>
); 
}