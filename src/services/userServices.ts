import {
  getUserDetailsById,
  updateProfilePicture,
  updateUserDetailsById,
} from "../models/userModel";
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

export const updateUser = async (
  id: string,
  username: string | undefined,
  statusMessage: string | undefined,
): Promise<void> => {
  const user = await getUserDetailsById(id);
  if (!user) {
    throw new CustomError("User not found", 400);
  }

  const toUpdate = {
    username,
    statusMessage,
  };

  await updateUserDetailsById(id, toUpdate);
};
