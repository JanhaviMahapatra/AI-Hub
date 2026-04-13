import { Router } from "express";
import { generateForm } from "../controllers/form.controller";

const router = Router();

router.post("/generate", generateForm);

export default router;