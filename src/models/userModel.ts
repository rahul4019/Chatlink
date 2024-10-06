import { query } from "../config/db";
import { User } from "../types/user";
import CustomError from "../utils/customError";

// creates user table
export const createUserTable = async (): Promise<void> => {
  const createUserTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    profile_picture TEXT,
    status_message VARCHAR(255),
    is_online BOOLEAN DEFAULT FALSE,
    last_seen TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
  );
  `;

  await query(createUserTableQuery);
};

// inserts user in the user table
export const createUser = async (
  email: string,
  password: string,
  username: string,
): Promise<any> => {
  const createUserQuery = `
    INSERT INTO users (email, password, username) 
    VALUES ($1, $2, $3) RETURNING *;  
`;
  try {
    const result = await query(createUserQuery, [email, password, username]);
    return result.rows[0];
  } catch (error) {
    console.log("Error creating user: ", error);
    throw new CustomError("Could not create user", 500);
  }
};

// checks if email already exist
export const emailExist = async (email: string): Promise<Boolean> => {
  const emailCheckQuery = `
    SELECT * 
    FROM users
    WHERE email = $1;
  `;
  try {
    const result = await query(emailCheckQuery, [email]);
    // ?? => nullish coalescing operator
    return (result.rowCount ?? 0) > 0; // will fallback to 0 if rowcount is null
  } catch (error) {
    console.log("Error checking email existence: ", error);
    throw new CustomError("Could not check email existence", 500);
  }
};

// get user details
export const getUserDetails = async (email: string): Promise<User> => {
  const getUserDetailsQuery = `
    SELECT * 
    FROM users
    WHERE email = $1;
  `;
  try {
    const result = await query(getUserDetailsQuery, [email]);
    return result.rows[0];
  } catch (error) {
    console.log("Error getting user details ", error);
    throw new CustomError("Could not get user details", 500);
  }
};

// get user details by userId
export const getUserDetailsById = async (id: string): Promise<User> => {
  const getUserDetailsQuery = `
    SELECT 
    id,
    email,
    username,
    profile_picture,
    status_message,
    is_online,
    last_seen
    FROM users
    WHERE id = $1;
  `;
  try {
    const result = await query(getUserDetailsQuery, [id]);
    return result.rows[0];
  } catch (error) {
    console.log("Error getting user details by id", error);
    throw new CustomError("Could not get user details by id", 500);
  }
};

export const updateProfilePicture = async (
  id: string,
  profilePictureURL: string,
): Promise<void> => {
  const updateProfilePictureQuery = `
  UPDATE users
  SET profile_picture = $1
  WHERE id = $2
  `;

  try {
    await query(updateProfilePictureQuery, [profilePictureURL, id]);
  } catch (error) {
    console.log("Error updating profile picture", error);
    throw new CustomError("Could not update profile picture", 500);
  }
};
