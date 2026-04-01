"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  useInviteAdminService,
  useFetchRolesService,
} from "@/services/admin.service";
import {
  inviteAdminSchema,
  InviteAdminFormValues,
} from "@/schema/admin.validation";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";

interface InviteAdminModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InviteAdminModal({
  open,
  onOpenChange,
}: InviteAdminModalProps) {
  const { inviteAdmin, inviteAdminLoading } = useInviteAdminService();
  const { roles, rolesLoading } = useFetchRolesService();

  const form = useForm<InviteAdminFormValues>({
    resolver: zodResolver(inviteAdminSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role_names: [],
    },
  });

  const onSubmit = (values: InviteAdminFormValues) => {
    inviteAdmin(values, () => {
      form.reset();
      onOpenChange(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Invite Administrator</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter admin's name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter admin's email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role_names"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base font-semibold">
                      Roles
                    </FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Select the roles to assign to this administrator.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto max-h-[150px] p-1 rounded-md">
                    {rolesLoading
                      ? Array.from({ length: 4 }).map((_, i) => (
                          <div
                            key={i}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <Skeleton className="h-4 w-4 rounded" />
                            <Skeleton className="h-4 w-[100px]" />
                          </div>
                        ))
                      : roles?.map((role) => (
                          <FormField
                            key={role.id}
                            control={form.control}
                            name="role_names"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={role.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(role.name)}
                                      onCheckedChange={(checked: boolean) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              role.name,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== role.name,
                                              ),
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer select-none capitalize">
                                    {role.name}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={inviteAdminLoading}>
                {inviteAdminLoading ? "Inviting..." : "Invite Admin"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
