import express from "express";
import { updateProfilePicture } from "../controllers/userController";
import { verifyAccessToken } from "../middleware/authMiddleware";
import { upload } from "../middleware/multer";

const router = express.Router();

router.post(
  "/profile-picture",
  verifyAccessToken,
  upload.single("profile_picture"),
  updateProfilePicture,
);

export default router;
