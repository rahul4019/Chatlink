import express from "express";
import { updateProfilePicture } from "../controllers/userController";
import { verifyAccessToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/profile-picture", verifyAccessToken, updateProfilePicture);

export default router;
