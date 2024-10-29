import express from "express";
import { verifyAccessToken } from "../middleware/authMiddleware";
import { getUserchats } from "../controllers/chatController";

const router = express.Router();

router.get("/chat-history", verifyAccessToken, getUserchats);

export default router;
