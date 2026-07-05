import { useState } from "react";
import ReactMarkdown from "react-markdown";
import "../../style/Flashcard.css";

export default function Flashcard({ card, index }) {
    const [showAnswer, setShowAnswer] = useState(false);

    return (
    <div
        onClick={() => setShowAnswer(!showAnswer)}
        className={`nexus-flashcard ${showAnswer ? 'is-flipped' : ''}`}
    >
        <div className="nexus-flashcard-header">
            <h3 className="nexus-flashcard-title">Flashcard {index + 1}</h3>
            <span className="material-symbols-outlined state-icon">
                {showAnswer ? 'visibility_off' : 'visibility'}
            </span>
        </div>

        <div className="nexus-flashcard-section">
            <span className="nexus-meta-tag tag-question">Question</span>
            <div className="nexus-markdown-body">
                <ReactMarkdown>
                    {card.question}
                </ReactMarkdown>
            </div>
        </div>

        <hr className="nexus-flashcard-divider" />

        {!showAnswer ? (
            <div className="nexus-flashcard-reveal-prompt">
                <span className="material-symbols-outlined interact-icon"></span>
                <span>Click to reveal answer</span>
            </div>
        ) : (
            <div className="nexus-flashcard-section answer-animation">
                <span className="nexus-meta-tag tag-answer">Answer</span>
                <div className="nexus-markdown-body text-secondary-dim">
                    <ReactMarkdown>
                        {card.answer}
                    </ReactMarkdown>
                </div>
            </div>
        )}
    </div>
);
}