import express from "express";
import {
  refreshToken,
  userLogin,
  userRegistration,
  logout,
} from "../controllers/authController";
import { verifyAccessToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", userRegistration);
router.post("/login", userLogin);
router.post("/refresh-token", refreshToken);
router.post("/logout", verifyAccessToken, logout);

export default router;
