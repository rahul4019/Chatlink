import { query } from "../config/db";

// create messages table
export const createMessageTable = async (): Promise<void> => {
  const createMessageTableQuery = `
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
      receiver_id UUID REFERENCES users(id) ON DELETE CASCADE,
      message_text TEXT NOT NULL,
      sent_at TIMESTAMPTZ DEFAULT NOW(),
      is_deleted BOOLEAN DEFAULT FALSE
    );    
  `;
  await query(createMessageTableQuery);
};
