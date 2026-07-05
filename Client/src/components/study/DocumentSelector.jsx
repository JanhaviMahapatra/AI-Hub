import "../../style/DocumentSelector.css";

export default function DocumentSelector({
    documents,
    selectedDocument,
    setSelectedDocument,
}) 

{
  return (
    <>
        <h2 className="nexus-study-title">Select Study Material</h2>

        {documents.length === 0 ? (
            <div className="nexus-study-empty-state">
                No study material uploaded yet.
            </div>
        ) : (
            <div className="nexus-study-grid">
                {documents.map((document) => {
                    const isSelected = selectedDocument === document.documentId;

                    return (
                        <div
                            key={document.documentId}
                            onClick={() => setSelectedDocument(document.documentId)}
                            className={`nexus-study-card ${isSelected ? 'is-selected' : ''}`}
                        >
                            <div className="nexus-study-icon-wrapper">
                                <span className="material-symbols-outlined document-card-icon">
                                    Topic
                                </span>
                            </div>

                            <h4 className="nexus-study-filename">
                                {document.filename}
                            </h4>

                            <p className="nexus-study-meta-text">
                                Uploaded Study Material
                            </p>

                            {isSelected && (
                                <div className="nexus-study-selected-badge">
                                    <span className="material-symbols-outlined check-icon"></span>
                                    <span>Selected</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        )}

        <hr className="nexus-study-divider" />
    </>
);  
}