import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  pin: z.string().min(4, "PIN must be at least 4 digits"),
});

export const setPinSchema = z
  .object({
    pin: z.string().min(4, "PIN must be at least 4 digits"),
    confirmPin: z.string().min(4, "PIN must be at least 4 digits"),
  })
  .refine((data) => data.pin === data.confirmPin, {
    message: "Pins don't match",
    path: ["confirmPin"],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SetPinFormValues = z.infer<typeof setPinSchema>;
