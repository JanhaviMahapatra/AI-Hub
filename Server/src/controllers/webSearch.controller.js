import { webSearch } from "../services/webSearch.service.js";

export const searchWeb = async (req, res) => {
    try {
        const { query } = req.body;

        if (!query || !query.trim()) {
            return res.status(400).json({
                success: false,
                message: "Search query is required.",
            });
        }

        const result = await webSearch(query);

        return res.status(200).json({
            success: true,
            answer: result.answer,
            sources: result.sources,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message:
                error.response?.data?.message ||
                error.message ||
                "Web search failed.",
        });
    }
};