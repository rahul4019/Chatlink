import bcrypt from "bcrypt";
import { createUser, emailExist, getUserDetails } from "../models/userModel";
import CustomError from "../utils/customError";
import { User, UserSession } from "../types/user";
import jwt from "jsonwebtoken";
import { createUserSession } from "../models/userSessionModel";

export const generateAccessToken = (user_id: string): string => {
  const accessToken = jwt.sign(
    { user_id },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY as string,
    },
  );
  return accessToken;
};

export const generateRefreshToken = (user_id: string): string => {
  const refreshToken = jwt.sign(
    { user_id },
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY as string,
    },
  );
  return refreshToken;
};

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

export const loginUser = async (
  email: string,
  password: string,
  ip_address: string,
  user_agent: string,
): Promise<UserSession> => {
  const userDetails: User = await getUserDetails(email);

  // check if user exist
  const userExist = await emailExist(email);

  if (!userExist) {
    throw new CustomError("First register your email.", 400);
  }

  // compare the password
  const isPasswordCorrect = await bcrypt.compare(
    password,
    userDetails.password,
  );

  if (!isPasswordCorrect) {
    throw new CustomError("Incorrect Password", 401);
  }

  const accessToken = generateAccessToken(userDetails.id);
  const refreshToken = generateRefreshToken(userDetails.id);

  // create a session for user
  const userSession = await createUserSession(
    userDetails.id,
    accessToken,
    refreshToken,
    ip_address,
    user_agent,
  );

  return userSession;
};
