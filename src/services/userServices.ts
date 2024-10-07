import { getUserDetailsById, updateProfilePicture } from "../models/userModel";
import CustomError from "../utils/customError";

export const updateUserProfilePicture = async (
  id: string,
  profilePictureURL: string,
): Promise<void> => {
  const user = await getUserDetailsById(id);
  if (!user) {
    throw new CustomError("User not found", 400);
  }

  await updateProfilePicture(id, profilePictureURL);
};
