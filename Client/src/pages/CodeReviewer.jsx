import { useState } from "react";
import ReactMarkdown from "react-markdown";
import "../style/CodeReviewer.css";

import { reviewCode } from "../services/codeReview";
import Navbar from "../components/Navbar";

export default function CodeReviewer() {
    const [language, setLanguage] = useState("JavaScript");
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [review, setReview] = useState(null);

    const handleReview = async () => {
        if (!code.trim()) {
            alert("Please enter some code.");
            return;
        }

        try {
            setLoading(true);

            const { data } = await reviewCode({
                code,
                language,
            });

            setReview(data.review);
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                    "Failed to review code."
            );
        } finally {
            setLoading(false);
        }
    };

return (
    <>
        <Navbar />

        <div className="nexus-reviewer-wrapper">
            <h1 className="nexus-page-title">AI Code Reviewer</h1>

            <div className="nexus-form-section">
                <label className="nexus-field-label">Programming Language</label>
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="nexus-select-field"
                >
                    <option>JavaScript</option>
                    <option>TypeScript</option>
                    <option>Python</option>
                    <option>Java</option>
                    <option>C++</option>
                    <option>C</option>
                    <option>C#</option>
                    <option>Go</option>
                    <option>PHP</option>
                    <option>Rust</option>
                </select>
            </div>

            <div className="nexus-form-section">
                <textarea
                    rows={18}
                    placeholder="Paste your code here..."
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="nexus-code-textarea"
                />
            </div>

            <button
                onClick={handleReview}
                disabled={loading}
                className="nexus-review-btn"
            >
                {loading ? "Reviewing..." : "Review Code"}
            </button>

            {review && (
                <div className="nexus-review-results-card">
                    <div className="nexus-results-header">
                        <h2 className="nexus-rating-title">
                            Overall Rating: <span className="rating-accent">{review.overall_rating}/10</span>
                        </h2>
                    </div>

                    <div className="nexus-results-section">
                        <h3 className="nexus-section-heading">Summary</h3>
                        <div className="nexus-markdown-body">
                            <ReactMarkdown>
                                {review.summary}
                            </ReactMarkdown>
                        </div>
                    </div>

                    {/* Mapped Metric Arrays Render Blocks grouped for balance */}
                    <div className="nexus-metrics-grid">
                        <div className="nexus-metric-box">
                            <h3 className="nexus-section-heading text-teal">Strengths</h3>
                            <ul className="nexus-metrics-list">
                                {review.strengths.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="nexus-metric-box">
                            <h3 className="nexus-section-heading text-error">Issues</h3>
                            <ul className="nexus-metrics-list">
                                {review.issues.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="nexus-results-section">
                        <h3 className="nexus-section-heading">Suggestions</h3>
                        <ul className="nexus-metrics-list">
                            {review.suggestions.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="nexus-results-section">
                        <h3 className="nexus-section-heading">Best Practices</h3>
                        <ul className="nexus-metrics-list">
                            {review.best_practices.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="nexus-metrics-grid">
                        <div className="nexus-metric-box">
                            <h3 className="nexus-section-heading text-violet">Security</h3>
                            <ul className="nexus-metrics-list">
                                {review.security.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="nexus-metric-box">
                            <h3 className="nexus-section-heading text-teal">Performance</h3>
                            <ul className="nexus-metrics-list">
                                {review.performance.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </>
);
    
}