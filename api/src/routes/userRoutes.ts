import express from "express";
import {
  getAllUsers,
  isUsernameUnique,
  updateProfilePicture,
  updateUserDetails,
} from "../controllers/userController";
import { verifyAccessToken } from "../middleware/authMiddleware";
import { upload } from "../middleware/multer";

const router = express.Router();

router.get("/unique-username", isUsernameUnique);

// Protected routes
router.post(
  "/profile-picture",
  verifyAccessToken,
  upload.single("profile_picture"),
  updateProfilePicture,
);
router.put("/update", verifyAccessToken, updateUserDetails);
router.get("/users", verifyAccessToken, getAllUsers);

export default router;
