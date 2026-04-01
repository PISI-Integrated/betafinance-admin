"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateRoleService, useUpdateRoleService, useFetchPermissionsService } from "@/services/admin.service";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

const roleSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  permission_names: z.array(z.string()).min(1, "Please select at least one permission"),
});

type RoleFormValues = z.infer<typeof roleSchema>;

interface CreateRoleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedRole?: IRolesResponse | null;
}

export function CreateRoleModal({
  open,
  onOpenChange,
  selectedRole,
}: CreateRoleModalProps) {
  const { createRole, createRoleLoading } = useCreateRoleService();
  const { updateRole, updateRoleLoading } = useUpdateRoleService(selectedRole?.id || "");
  const { permissions, permissionsLoading } = useFetchPermissionsService();

  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: "",
      description: "",
      permission_names: [],
    },
  });

  useEffect(() => {
    if (selectedRole) {
      form.reset({
        name: selectedRole.name,
        description: selectedRole.description,
        permission_names: selectedRole.permissions?.map((p: any) => p.name) || [],
      });
    } else {
      form.reset({
        name: "",
        description: "",
        permission_names: [],
      });
    }
  }, [selectedRole, form]);

  const onSubmit = (values: RoleFormValues) => {
    if (selectedRole) {
      updateRole(values);
    } else {
      createRole(values);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{selectedRole ? "Edit Role" : "Create New Role"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 pt-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Finance Admin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Describe what this role does" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="permission_names"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Permissions</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Enable specific system capabilities for this role.
                    </p>
                  </div>
                  
                  <ScrollArea className="h-[250px] w-full rounded-md border p-4 bg-gray-50/30">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                      {permissionsLoading ? (
                        Array.from({ length: 8 }).map((_, i) => (
                          <div key={i} className="flex flex-row items-start space-x-3 space-y-0">
                            <Skeleton className="h-4 w-4 rounded" />
                            <Skeleton className="h-4 w-[120px]" />
                          </div>
                        ))
                      ) : (
                        permissions?.map((permission) => (
                          <FormField
                            key={permission.id}
                            control={form.control}
                            name="permission_names"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={permission.id}
                                  className="flex flex-row items-start space-x-3 space-y-0 p-1 group"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(permission.name)}
                                      onCheckedChange={(checked: boolean) => {
                                        return checked
                                          ? field.onChange([...field.value, permission.name])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== permission.name,
                                              ),
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <div className="space-y-1.5 leading-none">
                                    <FormLabel className="font-semibold text-sm cursor-pointer group-hover:text-blue-600 transition-colors">
                                      {permission.name}
                                    </FormLabel>
                                    <p className="text-gray-400 text-[10px] leading-relaxed line-clamp-1">
                                      {permission.description}
                                    </p>
                                  </div>
                                </FormItem>
                              );
                            }}
                          />
                        ))
                      )}
                    </div>
                  </ScrollArea>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="px-6"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={createRoleLoading || updateRoleLoading}
                className="px-8 bg-blue-600 hover:bg-blue-700 font-bold"
              >
                {createRoleLoading || updateRoleLoading ? "Processing..." : selectedRole ? "Update Role" : "Create Role"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
