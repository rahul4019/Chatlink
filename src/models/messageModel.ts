import { query } from "../config/db";
import CustomError from "../utils/customError";
import { Message } from "../types/message";

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

export const insertMessage = async (
  senderId: string,
  receiverId: string,
  messageText: string,
): Promise<Message> => {
  try {
    const insertMessageQuery = `
      INSERT INTO messages (sender_id, receiver_id, message_text)
      values ($1, $2, $3) RETURNING *;
    `;

    const result = await query(insertMessageQuery, [
      senderId,
      receiverId,
      messageText,
    ]);

    return result.rows[0];
  } catch (error) {
    console.log("Error inserting message: ", error);
    throw new CustomError("Could not insert message", 500);
  }
};
