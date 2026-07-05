import aiApi from "./ai.service.js";


//Search the web using the AI service. 
export const webSearch = async (query) => {
    const { data } = await aiApi.post(
        "/web-search/search",
        {
            query,
        }
    );

    return data;
};