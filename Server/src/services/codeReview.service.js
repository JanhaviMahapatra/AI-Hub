import aiApi from "./ai.service.js";

//Send code to the FastAPI Code Reviewer.
 
export const reviewCode = async ({
    code,
    language,
}) => {
    const { data } = await aiApi.post(
        "/code-review",
        {
            code,
            language,
        }
    );

    return data;
};