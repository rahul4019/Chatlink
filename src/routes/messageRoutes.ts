import express from "express";
import { sendMessage } from "../controllers/messageController";
import { verifyAccessToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/send-message", verifyAccessToken, sendMessage);

export default router;
