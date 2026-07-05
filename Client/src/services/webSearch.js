import api from "./api";

export const searchWeb = async (query) => {
    return api.post("/web-search/search", {
        query,
    });
};