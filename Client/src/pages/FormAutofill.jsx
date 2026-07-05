import { useState } from "react";
import Navbar from "../components/Navbar";
import { extractFormData } from "../services/formAutofill";
import "../style/FormAutofill.css";

export default function FormAutofill() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    const handleExtract = async () => {
        if (!file) {
            alert("Please select a PDF.");
            return;
        }

        try {
            setLoading(true);

            const response = await extractFormData(file);

            setData(response.data.data);
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to extract information."
            );
        } finally {
            setLoading(false);
        }
    };

    
return (
    <>
        <Navbar />

        <div className="nexus-autofill-wrapper">
            <h1 className="nexus-page-title">AI Form Autofill</h1>

            {/* Premium Interactive Dropzone Area */}
            <div className="nexus-upload-zone">
                <span className="material-symbols-outlined upload-icon"></span>
                <label className="nexus-file-label-btn">
                    Choose PDF Document
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="nexus-hidden-file-input"
                    />
                </label>
                <p className="upload-zone-hint">Supported standard format: .PDF</p>
            </div>

            {file && (
                <div className="nexus-selected-file-badge">
                    <span className="material-symbols-outlined file-status-icon"></span>
                    <span className="file-name-text">
                        Selected File: <strong>{file.name}</strong>
                    </span>
                </div>
            )}

            <button
                onClick={handleExtract}
                disabled={loading || !file}
                className="nexus-extract-btn"
            >
                {loading ? "Extracting..." : "Extract Information"}
            </button>

            {data && (
                <div className="nexus-extracted-results-card">
                    <div className="nexus-card-header-block">
                        <span className="material-symbols-outlined diagnostic-icon"></span>
                        <h2 className="nexus-results-main-heading">Personal Information</h2>
                    </div>

                    <div className="nexus-info-fields-grid">
                        <div className="nexus-info-field">
                            <span className="field-meta-label">Full Name</span>
                            <div className="field-value-text">{data.full_name || "N/A"}</div>
                        </div>
                        <div className="nexus-info-field">
                            <span className="field-meta-label">Email Address</span>
                            <div className="field-value-text">{data.email || "N/A"}</div>
                        </div>
                        <div className="nexus-info-field">
                            <span className="field-meta-label">Phone Number</span>
                            <div className="field-value-text">{data.phone || "N/A"}</div>
                        </div>
                        <div className="nexus-info-field">
                            <span className="field-meta-label">Physical Address</span>
                            <div className="field-value-text">{data.address || "N/A"}</div>
                        </div>
                    </div>

                    <div className="nexus-split-metrics-row">
                        <div className="nexus-block-section">
                            <h3 className="nexus-inner-heading">Education</h3>
                            <div className="block-text-content">{data.education || "N/A"}</div>
                        </div>

                        <div className="nexus-block-section">
                            <h3 className="nexus-inner-heading">Experience</h3>
                            <div className="block-text-content">{data.experience || "N/A"}</div>
                        </div>
                    </div>

                    {/* Arrays mapping blocks rendered uniformly */}
                    <div className="nexus-array-metrics-grid">
                        <div className="nexus-array-box">
                            <h3 className="nexus-inner-heading text-teal">Skills</h3>
                            {data.skills.length === 0 ? (
                                <p className="empty-array-text">No skills found.</p>
                            ) : (
                                <ul className="nexus-data-list">
                                    {data.skills.map((skill, index) => (
                                        <li key={index}>{skill}</li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="nexus-array-box">
                            <h3 className="nexus-inner-heading text-violet">Projects</h3>
                            {data.projects.length === 0 ? (
                                <p className="empty-array-text">No projects found.</p>
                            ) : (
                                <ul className="nexus-data-list">
                                    {data.projects.map((project, index) => (
                                        <li key={index}>{project}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className="nexus-array-metrics-grid">
                        <div className="nexus-array-box">
                            <h3 className="nexus-inner-heading text-violet">Certifications</h3>
                            {data.certifications.length === 0 ? (
                                <p className="empty-array-text">No certifications found.</p>
                            ) : (
                                <ul className="nexus-data-list">
                                    {data.certifications.map((certification, index) => (
                                        <li key={index}>{certification}</li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="nexus-array-box">
                            <h3 className="nexus-inner-heading text-teal">Languages</h3>
                            {data.languages.length === 0 ? (
                                <p className="empty-array-text">No languages found.</p>
                            ) : (
                                <ul className="nexus-data-list">
                                    {data.languages.map((language, index) => (
                                        <li key={index}>{language}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    </>
);

}