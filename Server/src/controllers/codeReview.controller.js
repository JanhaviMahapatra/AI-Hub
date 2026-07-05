import { reviewCode } from "../services/codeReview.service.js";

export const reviewSourceCode = async (req, res) => {
    try {
        const { code, language } = req.body;

        if (!code || !language) {
            return res.status(400).json({
                success: false,
                message: "Code and language are required.",
            });
        }

        const result = await reviewCode({
            code,
            language,
        });

        return res.status(200).json(result);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};