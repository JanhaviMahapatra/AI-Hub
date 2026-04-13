import { useState } from "react";
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import API from "../services/api";
import './ResumeAnalyzer.css';

const ResumeAnalyzer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState("");

  const upload = async () => {
    if (!file) {
      alert("Select a PDF first");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await API.post("/ai/analyze-resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResult(res.data.analysis);
    } catch (err: any) {
      console.error("ERROR:", err.response?.data || err.message);
      alert("Upload failed");
    }
  };

  return (
    <div className="resume-tool-container">
      <header className="tool-header">
        <Link to="/" className="back-link">← Back</Link>
        <div className="header-text">
          <h2>Resume Analyzer</h2>
          <p className="subtitle">Get instant AI-powered feedback and score your resume.</p>
        </div>
      </header>

      <div className="upload-section">
        <div className="upload-wrapper">
          {/* This label acts as the beautiful button */}
          <label className="select-button-premium">
            <span className="button-icon">📁</span>
            {file ? <span className="file-name-display">{file.name}</span> : "Select Resume (PDF)"}
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden-input-actual"
            />
          </label>
          
          <p className="upload-hint">Max file size: 5MB • PDF format only</p>
        </div>

        <button className="analyze-btn-main" onClick={upload} disabled={!file}>
          {file ? "Start AI Analysis" : "Choose a file first"}
        </button>
      </div>

      {result && (
        <div className="result-container animate-fade-in">
          <div className="result-card">
            <div className="result-header">
              <h3>Analysis Results</h3>
              <span className="ai-badge">AI Insights</span>
            </div>
            <div className="markdown-content">
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;