import z from "zod";

export const sendMessageSchema = z.object({
  receiverId: z.string(),
  messageText: z.string().trim(),
});
