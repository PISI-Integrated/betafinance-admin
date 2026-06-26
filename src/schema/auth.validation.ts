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

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(4, "Password must be at least 4 digits"),
    confirmPassword: z.string().min(4, "Password must be at least 4 digits"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SetPinFormValues = z.infer<typeof setPinSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
