"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  useFetchAdminSettingsService,
  useUpdateAdminSettingsService,
} from "@/services/admin.service";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import { TextInput } from "@/components/ui/TextInput";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Save } from "lucide-react";
import {
  settingsSchema,
  SettingsFormValues,
} from "@/schema/settings.validation";

export default function SettingsContent() {
  const { adminSettings, adminSettingsLoading } =
    useFetchAdminSettingsService();

  const { updateAdminSettings, updateAdminSettingsLoading } =
    useUpdateAdminSettingsService();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      p2p_platform_fee_percentage: 0,
    },
    values: adminSettings
      ? {
          p2p_platform_fee_percentage:
            adminSettings.p2p_platform_fee_percentage,
        }
      : undefined,
  });

  const onSubmit = (values: SettingsFormValues) => {
    updateAdminSettings(values);
  };

  if (adminSettingsLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-5 w-64" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48 mt-2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-24" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage system-wide administrative settings and platform
          configurations.
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="border-none shadow-sm bg-white dark:bg-card">
          <CardHeader>
            <CardTitle className="text-xl">Platform Fees</CardTitle>
            <CardDescription>
              Configure the default fee percentage applied to P2P transactions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 max-w-md"
              >
                <FormField
                  control={form.control}
                  name="p2p_platform_fee_percentage"
                  render={({ field }) => (
                    <TextInput
                      label="P2P Platform Fee (%)"
                      type="number"
                      step="0.01"
                      placeholder="e.g. 2.5"
                      field={field as any}
                    />
                  )}
                />

                <Button
                  type="submit"
                  disabled={!form.formState.isDirty}
                  loading={updateAdminSettingsLoading}
                  className="w-full sm:w-auto"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
