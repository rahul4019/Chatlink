import { z } from "zod";

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, "Not a valid password"),
    newPassword: z.string().min(6, "Not a valid password"),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "new password and confirm new password must match",
    path: ["confirmNewPassword"],
  });
