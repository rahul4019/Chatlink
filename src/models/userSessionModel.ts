import { access } from "fs";
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
  access_token: string,
  refresh_token: string,
  ip_address: string,
  user_agent: string,
): Promise<UserSession> => {
  try {
    const refreshTokenExpiry = 7 * 24 * 60 * 60 * 1000;
    const expiresAt = new Date(Date.now() + refreshTokenExpiry);

    const createUserSessionQuery = `
    INSERT INTO user_sessions (
      user_id, access_token, refresh_token, expires_at, ip_address, user_agent
    ) 
    VALUES ($1, $2, $3, $4, $5, $6) 
    RETURNING *; 
  `;
    const result = await query(createUserSessionQuery, [
      user_id,
      access_token,
      refresh_token,
      expiresAt,
      ip_address,
      user_agent,
    ]);

    return result.rows[0];
  } catch (error) {
    console.log("Error creating user session: ", error);
    throw new CustomError("Could not create user session", 500);
  }
};

export const updateTokens = async (
  user_id: string,
  access_token: string,
  refresh_token: string,
): Promise<UserSession> => {
  try {
    const updateTokensQuery = `
      UPDATE user_sessions
      SET access_token = $1,
        refresh_token = $2
      WHERE user_id = $3
      RETURNING *;
    `;

    const result = await query(updateTokensQuery, [
      access_token,
      refresh_token,
      user_id,
    ]);

    return result.rows[0];
  } catch (error) {
    console.log("Error updating tokens: ", error);
    throw new CustomError("Could not update tokens", 500);
  }
};
