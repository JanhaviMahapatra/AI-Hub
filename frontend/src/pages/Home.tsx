import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
return (
<div className="dashboard-wrapper">
{/* Decorative background elements */}
<div className="bg-glow"></div>
<div className="bg-glow secondary"></div>

<nav className="navbar">
<div className="logo">AI<span>Hub</span></div>
<div className="nav-links">
<Link to="/">Home</Link>
<a href="#tools">Tools</a>
</div>
</nav>

<header className="hero">
<h1 className="animate-pop">AI Hub – All Your AI Tools in One Place</h1>
<p className="animate-fade">Boost productivity with powerful AI tools — chat, analyze, and create instantly.</p>
</header>

<main id="tools" className="tools-grid">
<div className="tool-card">
<div className="icon">💬</div>
<h3>AI Chat</h3>
<p>Ask anything and get instant intelligent responses.</p>
<Link to="/chat" className="card-btn">Open</Link>
</div>

<div className="tool-card">
<div className="icon">📄</div>
<h3>Resume Analyzer</h3>
<p>Analyze your resume and get smart improvement suggestions.</p>
<Link to="/resume" className="card-btn">Open</Link>
</div>

<div className="tool-card">
<div className="icon">📂</div>
<h3>PDF Chat</h3>
<p>Upload a PDF and ask questions from its content.</p>
<Link to="/pdf" className="card-btn">Open</Link>
</div>

<div className="tool-card">
<div className="icon">📝</div>
<h3>Summarizer</h3>
<p>Convert long text into short, clear summaries.</p>
<Link to="/summarizer" className="card-btn">Open</Link>
</div>

<div className="tool-card">
<div className="icon">⚡</div>
<h3>Form Autofill</h3>
<p>Automatically fill forms using AI-generated data.</p>
<Link to="/form" className="card-btn">Open</Link>
</div>
</main>
</div>
);
};

export default Home;