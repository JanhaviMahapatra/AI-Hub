import api from "./api";

export const extractFormData = async (file) => {
    const formData = new FormData();

    formData.append("file", file);

    return api.post(
        "/form-autofill/extract",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
};