import ReactMarkdown from "react-markdown";
import Flashcard from "./Flashcard";
import "../../style/ResponseViewer.css";

export default function ResponseViewer({ mode, result }) {
    if (!result) {
        return null;
    }

    // Reusable UI frame styled with unified class architecture
    const Card = ({ children }) => (
        <div className="nexus-viewer-card">
            {children}
        </div>
    );

    switch (mode) {
        case "question":
            return (
                <Card>
                    <div className="nexus-viewer-header">
                        <span className="material-symbols-outlined diagnostic-icon text-teal">auto_awesome</span>
                        <h2 className="nexus-viewer-main-heading">Answer</h2>
                    </div>
                    <div className="nexus-markdown-body">
                        <ReactMarkdown>
                            {result.answer}
                        </ReactMarkdown>
                    </div>
                </Card>
            );

        case "summary":
            return (
                <Card>
                    <div className="nexus-viewer-header">
                        <span className="material-symbols-outlined diagnostic-icon text-violet">description</span>
                        <h2 className="nexus-viewer-main-heading">{result.title}</h2>
                    </div>

                    <div className="nexus-markdown-body markdown-lead">
                        <ReactMarkdown>
                            {result.summary}
                        </ReactMarkdown>
                    </div>

                    <div className="nexus-inner-content-block">
                        <h3 className="nexus-inner-subheading">Key Points</h3>
                        <ul className="nexus-viewer-list">
                            {result.key_points?.map((point, index) => (
                                <li key={index}>
                                    <ReactMarkdown>{point}</ReactMarkdown>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Card>
            );

        case "important_topics":
            return (
                <Card>
                    <div className="nexus-viewer-header">
                        <span className="material-symbols-outlined diagnostic-icon text-teal">analytics</span>
                        <h2 className="nexus-viewer-main-heading">Important Topics</h2>
                    </div>
                    <ul className="nexus-viewer-list font-sora-list">
                        {result.topics?.map((topic, index) => (
                            <li key={index}>
                                <ReactMarkdown>{topic}</ReactMarkdown>
                            </li>
                        ))}
                    </ul>
                </Card>
            );

        case "quiz":
            return (
                <Card>
                    <div className="nexus-viewer-header">
                        <span className="material-symbols-outlined diagnostic-icon text-violet"></span>
                        <h2 className="nexus-viewer-main-heading">Quiz Evaluation</h2>
                    </div>

                    {result.questions?.map((question, index) => (
                        <div key={index} className="nexus-quiz-item-block">
                            <h3 className="nexus-quiz-question-number">
                                Question {index + 1}
                            </h3>

                            <div className="nexus-markdown-body question-text-space">
                                <ReactMarkdown>
                                    {question.question}
                                </ReactMarkdown>
                            </div>

                            <ol type="A" className="nexus-quiz-options-list">
                                {question.options?.map((option, optionIndex) => (
                                    <li key={optionIndex}>
                                        <ReactMarkdown>{option}</ReactMarkdown>
                                    </li>
                                ))}
                            </ol>

                            <div className="nexus-quiz-answer-key">
                                <span className="material-symbols-outlined check-circle-icon"></span>
                                <span>
                                    <strong>Correct Answer:</strong> {question.answer}
                                </span>
                            </div>

                            {index < result.questions.length - 1 && <hr className="nexus-quiz-divider" />}
                        </div>
                    ))}
                </Card>
            );

        case "flashcards":
            return (
                <Card>
                    <div className="nexus-viewer-header">
                        <span className="material-symbols-outlined diagnostic-icon text-teal">style</span>
                        <h2 className="nexus-viewer-main-heading">Flashcards Deck</h2>
                    </div>
                    <div className="nexus-flashcards-grid">
                        {result.flashcards?.map((card, index) => (
                            <Flashcard
                                key={index}
                                card={card}
                                index={index}
                            />
                        ))}
                    </div>
                </Card>
            );

        case "explain":
            return (
                <Card>
                    <div className="nexus-viewer-header">
                        <span className="material-symbols-outlined diagnostic-icon text-teal">school</span>
                        <h2 className="nexus-viewer-main-heading">{result.title}</h2>
                    </div>

                    {result.sections?.map((section, index) => (
                        <div key={index} className="nexus-explain-section">
                            <h3 className="nexus-inner-subheading">{section.heading}</h3>
                            <div className="nexus-markdown-body">
                                <ReactMarkdown>
                                    {section.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    ))}

                    {/* Translucent context panels replaces old white/light callout containers */}
                    <div className="nexus-callout-panel panel-neutral">
                        <h3 className="callout-heading">
                            <span className="material-symbols-outlined callout-icon">terminal</span>
                            Example Verification
                        </h3>
                        <div className="nexus-markdown-body">
                            <ReactMarkdown>
                                {result.example}
                            </ReactMarkdown>
                        </div>
                    </div>

                    <div className="nexus-callout-panel panel-info">
                        <h3 className="callout-heading">
                            <span className="material-symbols-outlined callout-icon">tips_and_updates</span>
                            Revision Directive
                        </h3>
                        <div className="nexus-markdown-body">
                            <ReactMarkdown>
                                {result.revision_tip}
                            </ReactMarkdown>
                        </div>
                    </div>
                </Card>
            );

        default:
            return (
                <Card>
                    <div className="nexus-viewer-header">
                        <span className="material-symbols-outlined diagnostic-icon">code</span>
                        <h2 className="nexus-viewer-main-heading">Raw System Output Data</h2>
                    </div>
                    <pre className="nexus-raw-json-block">
                        {JSON.stringify(result, null, 2)}
                    </pre>
                </Card>
            );
    }
}