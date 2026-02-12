import { z } from "zod";

export const loginSchema = z.object({
  phone: z.string().min(11, "Phone number must be at least 11 characters long"),
  pin: z.string().min(4, "PIN must be at least 4 characters long"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
