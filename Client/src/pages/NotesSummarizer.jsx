import { useState } from "react";
import ReactMarkdown from "react-markdown";
import "../style/NotesSummarizer.css";

import Navbar from "../components/Navbar";
import { summarizeNotes } from "../services/notes";

export default function NotesSummarizer() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState(null);

    const handleSubmit = async () => {
        if (!file) {
            alert("Please select a PDF.");
            return;
        }

        try {
            setLoading(true);

            const { data } = await summarizeNotes(file);

            setSummary(data.summary);
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to summarize notes."
            );
        } finally {
            setLoading(false);
        }
    };

   return (
    <>
        <Navbar />

        <div className="nexus-summarizer-layout">
            {/* Ambient platform backdrop glow spheres */}
            <div className="nexus-ambient-glow nexus-glow-left"></div>
            <div className="nexus-ambient-glow nexus-glow-right"></div>

            <header className="nexus-summarizer-header">
                <h1 className="nexus-page-title">AI Notes Summarizer</h1>
                <p className="nexus-page-subtitle">
                    Transform lengthy notes and complex study scripts into crisp, actionable executive briefings instantly.
                </p>
            </header>

            {/* Custom Premium File Upload Deck Block */}
            <div className="nexus-upload-deck">
                <span className="material-symbols-outlined upload-deck-icon"></span>
                <label className="nexus-upload-deck-label">
                    Choose Notes PDF Document
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="nexus-hidden-file-element"
                    />
                </label>
                <p className="upload-deck-subtext">Accepted system formats: .PDF only</p>
            </div>

            {file && (
                <div className="nexus-file-status-tag">
                    <span className="material-symbols-outlined file-tag-icon"></span>
                    <span className="file-tag-text">
                        Selected File: <strong>{file.name}</strong>
                    </span>
                </div>
            )}

            <button
                onClick={handleSubmit}
                disabled={loading || !file}
                className="nexus-summarize-submit-btn"
            >
                {loading ? (
                    <>
                        <span className="material-symbols-outlined spin-icon"></span>
                        <span>Compiling Engine...</span>
                    </>
                ) : (
                    "Summarize Notes"
                )}
            </button>

            {summary && (
                <div className="nexus-summary-results-viewport">
                    
                    {/* Summaries Blocks Render Panels */}
                    <div className="nexus-summary-split-grid">
                        <div className="nexus-summary-block-card">
                            <h2 className="nexus-results-heading text-teal">Short Summary</h2>
                            <div className="nexus-markdown-body">
                                <ReactMarkdown>
                                    {summary.short_summary}
                                </ReactMarkdown>
                            </div>
                        </div>

                        <div className="nexus-summary-block-card">
                            <h2 className="nexus-results-heading text-violet">Detailed Summary</h2>
                            <div className="nexus-markdown-body">
                                <ReactMarkdown>
                                    {summary.detailed_summary}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>

                    {/* Meta Lists Breakdown Segment */}
                    <div className="nexus-summary-split-grid">
                        <div className="nexus-metrics-box">
                            <h2 className="nexus-results-heading">Key Points</h2>
                            <ul className="nexus-analytics-list">
                                {summary.key_points.map((point, index) => (
                                    <li key={index}>{point}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="nexus-metrics-box">
                            <h2 className="nexus-results-heading">Important Topics</h2>
                            <ul className="nexus-analytics-list font-sora-items">
                                {summary.important_topics.map((topic, index) => (
                                    <li key={index}>{topic}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Operational Action Items Footer Block */}
                    <div className="nexus-action-items-footer-card">
                        <h2 className="nexus-results-heading text-teal">Action Items</h2>
                        {summary.action_items.length === 0 ? (
                            <p className="empty-action-items-text">No immediate action items found in target document context.</p>
                        ) : (
                            <ul className="nexus-analytics-list dynamic-checkbox-style">
                                {summary.action_items.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        )}
                    </div>

                </div>
            )}
        </div>
    </>
); 
}