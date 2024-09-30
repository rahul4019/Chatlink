import bcrypt from "bcrypt";
import { createUser, emailExist } from "../models/userModel";

export const registerUser = async (
  email: string,
  password: string,
  username: string,
) => {
  // check if email already exist
  const userExist = await emailExist(email);

  if (userExist) {
    throw new Error("Email already exists").status(200);
  }

  // password hashing
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = await createUser(email, hashedPassword, username);

  return user;
};
