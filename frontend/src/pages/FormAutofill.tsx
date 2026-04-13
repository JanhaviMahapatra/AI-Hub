  import { useState } from "react";
  import { Link } from 'react-router-dom';
  import ReactMarkdown from 'react-markdown';
  import API from "../services/api";
  import "./FormAutofill.css"

  const FormAutofill = () => {
  const [name, setName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [result, setResult] = useState("");

  const generate = async () => {
  if (!name || !purpose) {
  alert("Please fill all fields");
  return;
  }

  try {
  const res = await API.post("/form/generate", {
  name,
  purpose,
  });

  setResult(res.data.data);
  } catch (err: any) {
  alert("Failed to generate");
  }
  };

  return (
  <div className="form-tool-container">
  <header className="tool-header">
  <Link to="/" className="back-link">← Back</Link>
  <h2>Form Autofill AI</h2>
  <p className="subtitle">Enter basic details and AI will generate complete form data for you.</p>
  </header>

  <div className="tool-content">
  <div className="input-group">
  <label>Full Name</label>
  <input
  type="text"
  placeholder="e.g. Rahul Sharma"
  value={name}
  onChange={(e) => setName(e.target.value)}
  />
  </div>

  <div className="info-box">
  <span className="info-title">✨ What will be generated:</span>
  <div className="tag-container">
  <span>Name</span>
  <span>Email</span>
  <span>Phone</span>
  <span>Address</span>
  <span>Description</span>
  </div>
  </div>

  <div className="input-group">
  <label>Purpose</label>
  <input
  type="text"
  placeholder="e.g. Job Application / College Form / Signup"
  value={purpose}
  onChange={(e) => setPurpose(e.target.value)}
  />
  </div>

  <button className="generate-btn" onClick={generate}>
  Generate Form Data
  </button>

  {result && (
  <div className="result-section animate-fade-in">
  <div className="result-header">
  <h3>Generated Data</h3>
  <button className="copy-btn" onClick={() => navigator.clipboard.writeText(result)}>Copy</button>
  </div>
  <div className="result-display">
  <ReactMarkdown>{result}</ReactMarkdown>
  </div>
  </div>
  )}
  </div>
  </div>
  );
  };

  export default FormAutofill;