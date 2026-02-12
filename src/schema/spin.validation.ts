import z from "zod";


export const spinSchema = z.object({
    name: z.string().min(1, "Name is required"),
    value: z.coerce.number().min(0, "Value must be positive"),
    weight: z.coerce.number().min(1, "Weight must be at least 1"),
    type: z.enum(["airtime", "discount", "cash", "bonus", "none"]),
    is_active: z.boolean().default(true),
    themeId: z.string().min(1, "Theme is required"),
});

export type SpinFormValues = z.infer<typeof spinSchema>;