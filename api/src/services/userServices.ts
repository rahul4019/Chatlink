import {
  allUsers,
  getUserDetailsById,
  updateProfilePicture,
  updateUserDetailsById,
  userNameExist,
} from "../models/userModel";
import { PublicUser } from "../types/user";
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

export const checkUsernameExist = async (
  username: string,
): Promise<boolean> => {
  return await userNameExist(username);
};

export const getUsers = async (): Promise<PublicUser[]> => {
  return await allUsers();
};
