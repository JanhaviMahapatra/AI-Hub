import api from "./api";

export const reviewCode = async ({
    code,
    language,
}) => {
    return api.post(
        "/code-review",
        {
            code,
            language,
        }
    );
};