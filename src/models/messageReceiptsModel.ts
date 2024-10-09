import { query } from "../config/db";

export const createMessageRecipetsTable = async (): Promise<void> => {
  const createMessageReceiptsTableQuery = `
    CREATE TABLE IF NOT EXISTS message_receipts (
      id SERIAL PRIMARY KEY, 
      message_id INT REFERENCES messages(id) ON DELETE CASCADE,
      receiver_id UUID REFERENCES users(id) ON DELETE CASCADE,
      delivered_at TIMESTAMPTZ,
      read_at TIMESTAMPTZ,
      is_deleted BOOLEAN DEFAULT FALSE
    );
  `;
  await query(createMessageReceiptsTableQuery);
};
