import "../../style/ModeSelector.css";

export default function ModeSelector({
    mode,
    setMode,
}) {
   return (
    <>
        <div className="nexus-mode-container">
            <h2 className="nexus-mode-title">Study Mode</h2>
            
            <div className="nexus-select-wrapper">
                <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    className="nexus-mode-select"
                >
                    <option value="question">Ask Question</option>
                    <option value="summary">Summarize Chapter</option>
                    <option value="quiz">Generate Quiz</option>
                    <option value="flashcards">Generate Flashcards</option>
                    <option value="important_topics">Important Topics</option>
                    <option value="explain">Explain Simply</option>
                </select>
                <span className="material-symbols-outlined select-arrow-icon"></span>
            </div>
        </div>

        <hr className="nexus-mode-divider" />
    </>
);
}