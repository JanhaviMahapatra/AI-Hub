import "../../style/QuestionInput.css";

export default function QuestionInput({
    mode,
    question,
    setQuestion,
}) {
    if (
        mode === "summary" ||
        mode === "important_topics"
    ) {
        return (
            <>
                <div className="nexus-input-panel">
                    <h2 className="nexus-input-title">Topic Scope</h2>
                    <div className="nexus-info-callout">
                        <span className="material-symbols-outlined callout-info-icon"></span>
                        <p className="callout-info-text">
                            This mode processes the entirety of your selected study
                            material. No additional query parameter input is required.
                        </p>
                    </div>
                </div>

                <hr className="nexus-input-divider" />
            </>
        );
    }

    const placeholders = {
        question: "Ask any question from your study material...",
        explain: "Enter the concept you want explained...",
        quiz: "Generate a quiz on which topic?",
        flashcards: "Generate flashcards for which topic?",
    };

    const headings = {
        question: "Ask Question",
        explain: "Explain Topic",
        quiz: "Quiz Topic",
        flashcards: "Flashcard Topic",
    };

    return (
        <>
            <div className="nexus-input-panel">
                <h2 className="nexus-input-title">
                    {headings[mode] || "Question"}
                </h2>

                <textarea
                    rows={5}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder={
                        placeholders[mode] || "Enter your question..."
                    }
                    className="nexus-interactive-textarea"
                />
            </div>

            <hr className="nexus-input-divider" />
        </>
    );
}