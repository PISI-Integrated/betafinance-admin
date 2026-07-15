"use client";

import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SPIN_REWARD_THEMES, REWARD_TYPES } from "@/lib/constants/spin";
import {
  useCreateRewardService,
  useUpdateRewardService,
} from "@/services/spin.service";
import { SpinFormValues, spinSchema } from "@/schema/spin.validation";
import { normalizePayload } from "@/lib/utils";

interface SpinRewardFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: SpinRewardItem | null;
  existingRewards: SpinRewardItem[];
}

export function SpinRewardForm({
  open,
  onOpenChange,
  initialData,
  existingRewards,
}: SpinRewardFormProps) {
  const { createReward, isRewardCreateLoading } = useCreateRewardService();
  const { updateReward, isRewardUpdateLoading } = useUpdateRewardService();

  const form = useForm<z.infer<typeof spinSchema>>({
    resolver: zodResolver(spinSchema),
    defaultValues: {
      name: "",
      value: 0,
      weight: 10,
      type: "none",
      is_active: true,
      themeId: "",
    },
  });

  useEffect(() => {
    if (open) {
      if (initialData) {
        // Find matching theme
        const theme = SPIN_REWARD_THEMES.find(
          (t) =>
            t.color === initialData.color &&
            t.textColour === initialData.textColour,
        );

        form.reset({
          name: initialData.name,
          value: initialData.value,
          weight: initialData.weight,
          type: initialData.type,
          is_active: initialData.is_active,
          themeId: theme ? theme.id : "",
        });
      } else {
        form.reset({
          name: "",
          value: 0,
          weight: 10,
          type: "none",
          is_active: true,
          themeId: "",
        });
      }
    }
  }, [open, initialData, form]);

  const isLoading = isRewardCreateLoading || isRewardUpdateLoading;

  // Determine forbidden themes based on neighbors
  const forbiddenThemeIds = useMemo(() => {
    if (!open) return [];

    // If no existing rewards, nothing is forbidden
    if (existingRewards.length === 0) return [];

    let prevReward: SpinRewardItem | undefined;
    let nextReward: SpinRewardItem | undefined;

    if (initialData) {
      // Editing
      const index = existingRewards.findIndex((r) => r.id === initialData.id);
      if (index === -1) return []; // Should not happen

      prevReward =
        existingRewards.length > 1
          ? existingRewards[
              (index - 1 + existingRewards.length) % existingRewards.length
            ]
          : undefined;
      nextReward =
        existingRewards.length > 1
          ? existingRewards[(index + 1) % existingRewards.length]
          : undefined;
    } else {
      // Creating (appending to end)
      prevReward = existingRewards[existingRewards.length - 1];
      nextReward = existingRewards[0];
    }

    const forbiddenColors = new Set<string>();
    if (prevReward) forbiddenColors.add(prevReward.color);
    if (nextReward) forbiddenColors.add(nextReward.color);

    return SPIN_REWARD_THEMES.filter((t) => forbiddenColors.has(t.color)).map(
      (t) => t.id,
    );
  }, [open, initialData, existingRewards]);

  const onSubmit = async (values: SpinFormValues) => {
    const theme = SPIN_REWARD_THEMES.find((t) => t.id === values.themeId);
    if (!theme) return;

    const payload: IRewardDto = {
      name: values.name,
      value: values.value,
      weight: values.weight,
      type: values.type,
      is_active: values.is_active,
      color: theme.color,
      textColour: theme.textColour,
    };

    const normalized = normalizePayload(payload);

    if (initialData) {
      updateReward(initialData.id, normalized);
    } else {
      createReward(normalized);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Reward" : "Create New Reward"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. ₦100 Cash" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {REWARD_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Value</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight (Probability)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="is_active"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={(val) => field.onChange(val === "true")}
                      value={field.value ? "true" : "false"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="true">Active</SelectItem>
                        <SelectItem value="false">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="themeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Visual Theme</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SPIN_REWARD_THEMES.map((theme) => {
                        const isForbidden = forbiddenThemeIds.includes(
                          theme.id,
                        );
                        const isCurrent = field.value === theme.id;

                        return (
                          <SelectItem
                            key={theme.id}
                            value={theme.id}
                            disabled={isForbidden && !isCurrent}
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className="h-4 w-4 rounded-full border"
                                style={{ background: theme.previewBg }}
                              />
                              <span
                                className={
                                  isForbidden && !isCurrent
                                    ? "text-muted-foreground"
                                    : "text-foreground"
                                }
                              >
                                {theme.label}{" "}
                                {isForbidden && !isCurrent ? "(Clash)" : ""}
                              </span>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
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
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : initialData ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
