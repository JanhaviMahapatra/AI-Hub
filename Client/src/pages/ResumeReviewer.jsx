import { useState } from "react";
import api from "../services/api";
import "../style/ResumeReviewer.css";

export default function ResumeReviewer() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [review, setReview] = useState(null);

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a resume.");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("file", file);

            const { data } = await api.post(
                "/resume/review",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setReview(data.review);
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                    "Failed to analyze resume."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="resume-page">
            <div className="bg-orb orb-left"></div>
            <div className="bg-orb orb-right"></div>

            <div className="resume-container">

                <div className="resume-header">

                    <div className="badge">
                        AI Powered Analysis
                    </div>

                    <h1>
                        AI <span>Resume Reviewer</span>
                    </h1>

                    <p>
                        Upload your resume and receive an in-depth AI analysis,
                        ATS compatibility score, strengths, weaknesses, missing
                        keywords, and personalized improvement suggestions.
                    </p>

                </div>

                <div className="upload-card">

                    <div className="upload-icon">
                        📄
                    </div>

                    <h2>Upload Resume</h2>

                    <p>
                        Supported format: PDF
                    </p>

                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) =>
                            setFile(e.target.files[0])
                        }
                    />

                    {file && (
                        <div className="selected-file">
                            {file.name}
                        </div>
                    )}

                    <button
                        onClick={handleUpload}
                        disabled={loading}
                    >
                        {loading
                            ? "Analyzing Resume..."
                            : "Analyze Resume"}
                    </button>

                </div>

                {review && (
                    <div className="review-card">

                        <div className="score-card">

                            <div>
                                <span className="label">
                                    Resume Score
                                </span>

                                <h2>
                                    {review.score}
                                    <span>/10</span>
                                </h2>
                            </div>

                            <div>
                                <span className="label">
                                    ATS Score
                                </span>

                                <h2>
                                    {review.ats.score}
                                    <span>/100</span>
                                </h2>
                            </div>

                        </div>

                        <section className="review-section">
                            <h3>Summary</h3>
                            <p>{review.summary}</p>
                        </section>

                        <div className="grid">

                            <section className="review-section">
                                <h3>Strengths</h3>

                                <ul>
                                    {review.strengths.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </section>

                            <section className="review-section">
                                <h3>Weaknesses</h3>

                                <ul>
                                    {review.weaknesses.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </section>

                            <section className="review-section">
                                <h3>Suggestions</h3>

                                <ul>
                                    {review.suggestions.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </section>

                            <section className="review-section">
                                <h3>Missing Keywords</h3>

                                <ul>
                                    {review.missing_keywords.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </section>

                        </div>

                        <section className="review-section ats-section">

                            <h3>ATS Issues</h3>

                            <ul>
                                {review.ats.issues.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>

                        </section>

                    </div>
                )}
            </div>
        </div>
    );
}