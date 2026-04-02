import { z } from "zod";

export const inviteAdminSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(11, "Please enter a valid phone number"),
  role_name: z.string().min(1, "Please select a role"),
});

export type InviteAdminFormValues = z.infer<typeof inviteAdminSchema>;

export const roleSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  permission_names: z
    .array(z.string())
    .min(1, "Please select at least one permission"),
});

export type RoleFormValues = z.infer<typeof roleSchema>;
