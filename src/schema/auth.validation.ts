import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  pin: z.string().min(4, "PIN must be at least 4 digits"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
