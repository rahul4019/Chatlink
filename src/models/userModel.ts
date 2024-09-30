import { query } from "../config/db";

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
  const createUserQuey = `
    INSERT INTO users (email, password, username) 
    VALUES ($1, $2, $3) RETURNING *;  
`;
  const result = await query(createUserQuey, [email, password, username]);
  return result.rows[0];
};

// checks if email already exist
export const emailExist = async (email: string): Promise<Boolean> => {
  const emailCheckQuery = `
    SELECT * 
    FROM users
    WHERE email = $1;
  `;

  const result = await query(emailCheckQuery, [email]);
  // ?? => nullish coalescing operator
  return (result.rowCount ?? 0) > 0; // will fallback to 0 if rowcount is null
};
