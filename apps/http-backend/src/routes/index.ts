import express from "express";
import { SendURL } from "../controllers";

const router = express.Router();

router.post("/sendUrl", SendURL)

export default router;