import { query } from "../config/db";
import { UserSession } from "../types/user";
import CustomError from "../utils/customError";

// creates user_sessions table
export const createUserSessionTable = async (): Promise<void> => {
  const createUserSessionQuery = `
  CREATE TABLE IF NOT EXISTS user_sessions (
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    access_token TEXT NOT NULL,
    refresh_token TEXT NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_active TIMESTAMPTZ DEFAULT NOW(),
    ip_address VARCHAR(45), 
    user_agent TEXT,
    is_valid BOOLEAN DEFAULT TRUE
  );
  `;

  await query(createUserSessionQuery);
};

// creates session for user
export const createUserSession = async (
  user_id: string,
  refresh_token: string,
  access_token: string,
  ip_address: string,
  user_agent: string,
): Promise<UserSession> => {
  const createUserSessionQuery = `
    INSERT INTO user_sessions (user_id, access_token, refresh_token, ip_address, user_agent) 
    VALUES ($1, $2, $3, $4, $5) RETURNING *; 
  `;
  try {
    const result = await query(createUserSessionQuery, [
      user_id,
      access_token,
      refresh_token,
      ip_address,
      user_agent,
    ]);

    return result.rows[0];
  } catch (error) {
    console.log("Error creating user session: ", error);
    throw new CustomError("Could not create user session", 500);
  }
};
