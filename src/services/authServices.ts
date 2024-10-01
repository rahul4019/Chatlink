import bcrypt from "bcrypt";
import { createUser, emailExist } from "../models/userModel";
import CustomError from "../utils/customError";
import { User } from "../types/user";

export const registerUser = async (
  email: string,
  password: string,
  username: string,
): Promise<User> => {
  // check if email already exist
  const userExist = await emailExist(email);

  if (userExist) {
    throw new CustomError("Email already exists", 400);
  }

  // password hashing
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = await createUser(email, hashedPassword, username);

  return user;
};

export const loginUser = async (email: string, password: string, ip_address: string, user_agent: string)=> {
  
} 
