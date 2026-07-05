import aiApi from "../services/ai.service.js";

export const checkAIHealth = async (req, res) => {
    try {
        console.log("FASTAPI_URL:", process.env.FASTAPI_URL);

        const response = await aiApi.get("/health");

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error message:", error.message);
        console.error("Error code:", error.code);

        if (error.response) {
            console.error("Response:", error.response.data);
        }

        res.status(500).json({
            success: false,
            message: "Unable to connect to AI service",
            error: error.message,
            code: error.code,
        });
    }
};