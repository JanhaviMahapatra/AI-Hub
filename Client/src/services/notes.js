import api from "./api";

export const summarizeNotes = async (file) => {
    const formData = new FormData();

    formData.append("file", file);

    return api.post(
        "/notes/summarize",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
};