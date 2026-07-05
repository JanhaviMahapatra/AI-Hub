import { useState } from "react";
import ReactMarkdown from "react-markdown";
import "../style/WebSearch.css";

import Navbar from "../components/Navbar";
import { searchWeb } from "../services/webSearch";

export default function WebSearch() {
    const [query, setQuery] = useState("");

    const [answer, setAnswer] = useState("");

    const [sources, setSources] = useState([]);

    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!query.trim()) {
            alert("Please enter a question.");
            return;
        }

        try {
            setLoading(true);

            const { data } = await searchWeb(query);

            setAnswer(data.answer);

            setSources(data.sources);
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Search failed."
            );
        } finally {
            setLoading(false);
        }
    };

  return (
    <>
        <Navbar />

        <div className="search-page">

            <div className="bg-orb orb-left"></div>
            <div className="bg-orb orb-right"></div>

            <div className="search-container">

                <div className="search-header">

                    <div className="badge">
                        🌐 AI Powered Search
                    </div>

                    <h1>
                        AI <span>Web Search</span>
                    </h1>

                    <p>
                        Search the web using AI and receive summarized,
                        citation-backed answers with reliable sources.
                    </p>

                </div>

                {/* Search Card */}

                <div className="search-card">

                    <h2>Ask Anything</h2>

                    <p>
                        Enter your question below and let AI search the web.
                    </p>

                    <textarea
                        rows={5}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Example: Explain quantum computing in simple terms..."
                    />

                    <button
                        onClick={handleSearch}
                        disabled={loading}
                    >
                        {loading ? "Searching..." : "Search Web"}
                    </button>

                </div>

                {/* AI Answer */}

                {answer && (
                    <div className="answer-card">

                        <div className="answer-title">

                            <div className="answer-icon">
                                🤖
                            </div>

                            <div>
                                <h2>AI Answer</h2>
                                <span>
                                    Generated using AI Web Search
                                </span>
                            </div>

                        </div>

                        <div className="answer-content">
                            <ReactMarkdown>
                                {answer}
                            </ReactMarkdown>
                        </div>

                    </div>
                )}

                {/* Sources */}

                {sources.length > 0 && (

                    <div className="sources-card">

                        <div className="sources-header">

                            <h2>Sources</h2>

                            <span>
                                {sources.length} References
                            </span>

                        </div>

                        {sources.map((source, index) => (

                            <div
                                key={index}
                                className="source-item"
                            >

                                <div className="source-icon">
                                    🔗
                                </div>

                                <div className="source-info">

                                    <a
                                        href={source.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {source.title}
                                    </a>

                                    <p>
                                        {source.url}
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    </>
);
    
}