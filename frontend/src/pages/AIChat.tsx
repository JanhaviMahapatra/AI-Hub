import { useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import API from "../services/api";
import "./AIChat.css"

const AIChat = () => {
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<any[]>([]);

  const send = async () => {
    const res = await API.post("/ai/chat", { message: input });

    setMsgs([...msgs, { q: input, a: res.data.response }]);
    setInput("");
  };

return (
  <div className="chat-container">
    {/* Header with navigation back to Home */}
    <header className="chat-header">
      <Link to="/" className="back-link">← Back</Link>
      <h2>AI Chat</h2>
      <div className="status-dot"></div>
    </header>

    {/* Scrollable message area */}
    <div className="messages-window">
      {msgs.length === 0 && (
        <p style={{ textAlign: 'center', color: '#94a3b8', marginTop: '20px' }}>
          No messages yet. Start a conversation!
        </p>
      )}
      
      {msgs.map((m, i) => (
        <div key={i} className="message-pair">
          <div className="message user-msg animate-slide-left">
            <span className="label">You</span>
            <p>{m.q}</p>
          </div>
          
          {m.a && (
            <div className="message ai-msg animate-slide-right">
              <span className="label">AI</span>
              {/* Updated to use ReactMarkdown for AI responses */}
              <div className="markdown-content">
                <ReactMarkdown>{m.a}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>

    {/* Fixed bottom input bar */}
    <div className="input-area">
      <div className="input-wrapper">
        <input 
          value={input} 
          placeholder="Ask me anything..."
          onChange={(e) => setInput(e.target.value)} 
          onKeyDown={(e) => e.key === 'Enter' && send()}
        />
        <button className="send-btn" onClick={send} disabled={!input.trim()}>
          Send
        </button>
      </div>
    </div>
  </div>
);
};

export default AIChat;