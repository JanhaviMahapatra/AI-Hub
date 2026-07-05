import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        documentId: {
            type: String,
            required: true,
            unique: true,
        },

        filename: {
            type: String,
            required: true,
        },

        totalChunks: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model(
    "Document",
    documentSchema
);