import { query } from "../config/db";

// creates user_sessions table
export const createUserSessionTable = async (): Promise<void> => {
  const createUserSessionQuery = `
  CREATE TABLE IF NOT EXISTS user_sessions (
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    refresh_token TEXT NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_active TIMESTAMPTZ DEFAULT NOW(),
    ip_address VARCHAR(45), 
    user_agent TEXT,
    device_info TEXT,
    is_valid BOOLEAN DEFAULT TRUE
  );
  `;

  await query(createUserSessionQuery);
};
