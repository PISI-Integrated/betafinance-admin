import * as z from "zod";

export const settingsSchema = z.object({
  p2p_platform_fee_percentage: z.coerce
    .number()
    .min(0, "Fee cannot be negative")
    .max(100, "Fee cannot exceed 100%"),
});

export type SettingsFormValues = z.infer<typeof settingsSchema>;
