import express from "express";
import {
  refreshToken,
  userLogin,
  userRegistration,
} from "../controllers/authController";

const router = express.Router();

router.post("/register", userRegistration);
router.post("/login", userLogin);
router.post("/refresh-token", refreshToken);

export default router;
