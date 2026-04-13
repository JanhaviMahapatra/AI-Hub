import { useState } from "react";
import { Link ,} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import API from "../services/api";
import "./PDFChat.css"

const PDFChat = () => {
  const [file, setFile] = useState<any>(null);
  const [query, setQuery] = useState("");
  const [msgs, setMsgs] = useState<any[]>([]);

  const upload = async () => {
    const form = new FormData();
    form.append("pdf", file);

    await API.post("/pdf/upload-pdf", form);
    alert("Uploaded!");
  };

  const ask = async () => {
    const res = await API.post("/pdf/query-pdf", { query });

    setMsgs([...msgs, { q: query, a: res.data.answer }]);
    setQuery("");
  };

 return (
    <div className="pdf-chat-container">
      {/* Tool Header */}
      <header className="tool-header">
        <div className="header-left">
          <Link to="/" className="back-link">← Back</Link>
          <h2>PDF Chat</h2>
        </div>
        <div className="file-controls">
          <label className="file-input-label">
            {file ? file.name : "Select PDF"}
            <input 
              type="file" 
              accept=".pdf"
              onChange={(e: any) => setFile(e.target.files[0])} 
            />
          </label>
          <button className="upload-btn" onClick={upload} disabled={!file}>
            Upload
          </button>
        </div>
      </header>

      {/* Chat History Area */}
      <div className="chat-window">
        {msgs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📂</div>
            <p>Upload a document to start asking questions</p>
          </div>
        ) : (
          msgs.map((m, i) => (
            <div key={i} className="qa-group">
              <div className="bubble user-query animate-in">
                <span className="bubble-label">Question</span>
                <p>{m.q}</p>
              </div>
              <div className="bubble ai-response animate-in">
                <span className="bubble-label">Analysis</span>
                {/* Updated to use ReactMarkdown for AI responses */}
                <div className="markdown-content">
                  <ReactMarkdown>{m.a}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Footer */}
      <footer className="query-footer">
        <div className="query-wrapper">
          <input 
            value={query} 
            placeholder="Ask a question about the PDF..."
            onChange={(e) => setQuery(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && ask()}
          />
          <button className="ask-btn" onClick={ask} disabled={!query.trim()}>
            Ask
          </button>
        </div>
      </footer>
    </div>
  ); 
}

export default PDFChat;