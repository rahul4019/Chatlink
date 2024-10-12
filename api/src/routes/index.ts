import express from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import messageRoutes from "./messageRoutes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/message", messageRoutes);

export default router;
