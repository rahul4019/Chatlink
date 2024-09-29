import bcrypt from "bcrypt";
import { createUser } from "../models/userModel";

export const registerUser = async (
  email: string,
  password: string,
  username: string,
) => {
  // password hashing
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = await createUser(email, hashedPassword, username);

  return user;
};
