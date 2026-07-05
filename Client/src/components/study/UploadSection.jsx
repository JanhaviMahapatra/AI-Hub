export default function UploadSection({
    file,
    setFile,
    uploading,
    handleUpload,
}) {
   return (
    <>
        <div className="nexus-upload-panel">
            <h2 className="nexus-upload-title">Upload Study Material</h2>

            {/* Premium Hidden-Input Dropzone Box */}
            <div className="nexus-dropzone-box">
                <span className="material-symbols-outlined dropzone-icon"></span>
                <label className="nexus-dropzone-label">
                    Choose PDF Document
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="nexus-hidden-input"
                    />
                </label>
                <p className="dropzone-subtext">Accepted formats: .PDF only</p>
            </div>

            {file && (
                <div className="nexus-file-status-badge">
                    <span className="material-symbols-outlined file-badge-icon"></span>
                    <span className="file-badge-text">
                        Selected: <strong>{file.name}</strong>
                    </span>
                </div>
            )}

            <button
                onClick={handleUpload}
                disabled={uploading || !file}
                className="nexus-upload-action-btn"
            >
                {uploading ? (
                    <>
                        <span className="material-symbols-outlined spin-icon"></span>
                        Uploading...
                    </>
                ) : (
                    "Upload PDF"
                )}
            </button>
        </div>

        <hr className="nexus-upload-divider" />
    </>
);
}