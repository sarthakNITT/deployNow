import express from "express";
import { Upload } from "../controllers";

const router = express.Router();

router.post("/upload", Upload)

export default router;