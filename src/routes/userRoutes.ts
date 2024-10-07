import express from "express";
import {
  updateProfilePicture,
  updateUserDetails,
} from "../controllers/userController";
import { verifyAccessToken } from "../middleware/authMiddleware";
import { upload } from "../middleware/multer";

const router = express.Router();

router.post(
  "/profile-picture",
  verifyAccessToken,
  upload.single("profile_picture"),
  updateProfilePicture,
);

router.put("/update", verifyAccessToken, updateUserDetails);
export default router;
