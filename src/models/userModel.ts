import { query } from "../config/db";

export const createUserTable = async () => {
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
