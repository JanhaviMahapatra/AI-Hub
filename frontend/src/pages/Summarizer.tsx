import { useState } from "react";
import { Link ,} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import API from "../services/api";
import "./Summarizer.css"

const Summarizer = () => {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");

  const handle = async () => {
    const res = await API.post("/summarizer/summarize", { text });
    setSummary(res.data.summary);
  };

 return (
    <div className="summarizer-container">
      <header className="tool-header">
        <Link to="/" className="back-link">← Back</Link>
        <div className="header-text">
          <h2>Text Summarizer</h2>
          <p className="subtitle">Paste your long text below to get a concise, AI-generated summary.</p>
        </div>
      </header>

      <div className="input-section">
        <textarea
          className="custom-textarea"
          placeholder="Paste your content here (articles, notes, or long reports)..."
          rows={10}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        
        <div className="action-bar">
          <span className="char-count">{text.length} characters</span>
          <button 
            className="summarize-btn" 
            onClick={handle} 
            disabled={!text.trim()}
          >
            Summarize Now
          </button>
        </div>
      </div>

      {summary && (
        <div className="summary-result animate-fade-in">
          <div className="result-card">
            <div className="result-header">
              <h3>Summary</h3>
              <button 
                className="copy-text-btn" 
                onClick={() => navigator.clipboard.writeText(summary)}
              >
                Copy
              </button>
            </div>
            <div className="markdown-content">
              <ReactMarkdown>{summary}</ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Summarizer;