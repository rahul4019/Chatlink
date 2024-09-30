import express, { Router } from "express";
import { userRegistration } from "../controllers/authController";

const router = express.Router();

router.post("/register", userRegistration);

export default router;
