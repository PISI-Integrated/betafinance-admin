import { z } from "zod";

export const inviteAdminSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  role_names: z.array(z.string()).min(1, "Please select at least one role"),
});

export type InviteAdminFormValues = z.infer<typeof inviteAdminSchema>;
