import { Router } from "express";
import { uploadPDF, queryPDF } from "../controllers/pdf.controller";
import { upload } from "../middleware/upload";

const router = Router();

router.post("/upload-pdf", upload.single("pdf"), uploadPDF);
router.post("/query-pdf", queryPDF);

export default router;