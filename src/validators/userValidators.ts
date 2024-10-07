import z from "zod";

export const userUpdateSchema = z
  .object({
    username: z.string().min(3).max(50).trim().optional(),
    statusMessage: z.string().min(1).trim().optional(),
  })
  .refine(
    (data) => data.username !== undefined || data.statusMessage !== undefined,
    {
      message: "At least one field username or status_message must be provided",
    },
  );
