"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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
import {
  Save,
  Plus,
  Trash2,
  Shield,
  Wallet,
  Percent,
  CreditCard,
} from "lucide-react";
import {
  settingsSchema,
  SettingsFormValues,
} from "@/schema/settings.validation";
import { FeeScheduleEditor } from "./FeeScheduleEditor";

type Provider = "yo" | "dusupay" | "momo" | "paystack";

const PROVIDERS: { key: Provider; name: string }[] = [
  { key: "yo", name: "Yo Payments" },
  { key: "dusupay", name: "DusuPay" },
  { key: "momo", name: "MTN MoMo" },
  { key: "paystack", name: "Paystack" },
];

/** Coerce 0 → null and [] → null for fee schedule values before sending to API */
function coerceFeeSchedules(
  schedules: SettingsFormValues["withdrawal_fee_schedules"],
): SettingsFormValues["withdrawal_fee_schedules"] {
  if (!schedules) return schedules;
  const result: typeof schedules = {};
  for (const key of Object.keys(schedules) as Provider[]) {
    const phases = schedules[key];
    if (!phases || phases.length === 0) {
      result[key] = undefined;
      continue;
    }
    result[key] = phases.map((phase) => ({
      effective_from: phase.effective_from || null,
      flat_fee: phase.flat_fee === 0 ? null : (phase.flat_fee ?? null),
      percentage: phase.percentage === 0 ? null : (phase.percentage ?? null),
      tiers: !phase.tiers || phase.tiers.length === 0 ? null : phase.tiers,
    }));
  }
  return result;
}

const defaultSchedule = () => [
  { effective_from: null, flat_fee: 0, tiers: null, percentage: null },
];

export default function SettingsContent() {
  const { adminSettings, adminSettingsLoading } =
    useFetchAdminSettingsService();
  const { updateAdminSettings, updateAdminSettingsLoading } =
    useUpdateAdminSettingsService();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      p2p_platform_fee_percentage: 0,
      p2p_interest_rate_caps: { NG: [], UG: [] },
      withdrawal_fee_schedules: { yo: [], dusupay: [], momo: [], paystack: [] },
      deposit_fee_schedules: { yo: [], dusupay: [], momo: [], paystack: [] },
    },
    values: adminSettings
      ? {
          p2p_platform_fee_percentage:
            adminSettings.p2p_platform_fee_percentage || 0,
          p2p_interest_rate_caps: {
            NG: adminSettings.p2p_interest_rate_caps?.NG || [],
            UG: adminSettings.p2p_interest_rate_caps?.UG || [],
          },
          withdrawal_fee_schedules: {
            yo: adminSettings.withdrawal_fee_schedules?.yo?.length
              ? adminSettings.withdrawal_fee_schedules.yo
              : [],
            dusupay: adminSettings.withdrawal_fee_schedules?.dusupay?.length
              ? adminSettings.withdrawal_fee_schedules.dusupay
              : [],
            momo: adminSettings.withdrawal_fee_schedules?.momo?.length
              ? adminSettings.withdrawal_fee_schedules.momo
              : [],
            paystack: adminSettings.withdrawal_fee_schedules?.paystack?.length
              ? adminSettings.withdrawal_fee_schedules.paystack
              : [],
          },
          deposit_fee_schedules: {
            yo: adminSettings.deposit_fee_schedules?.yo?.length
              ? adminSettings.deposit_fee_schedules.yo
              : [],
            dusupay: adminSettings.deposit_fee_schedules?.dusupay?.length
              ? adminSettings.deposit_fee_schedules.dusupay
              : [],
            momo: adminSettings.deposit_fee_schedules?.momo?.length
              ? adminSettings.deposit_fee_schedules.momo
              : [],
            paystack: adminSettings.deposit_fee_schedules?.paystack?.length
              ? adminSettings.deposit_fee_schedules.paystack
              : [],
          },
        }
      : undefined,
  });

  const onSubmit = (values: SettingsFormValues) => {
    const payload: SettingsFormValues = {
      ...values,
      withdrawal_fee_schedules: coerceFeeSchedules(
        values.withdrawal_fee_schedules,
      ),
      deposit_fee_schedules: coerceFeeSchedules(values.deposit_fee_schedules),
    };
    updateAdminSettings(payload);
  };

  // Helpers to show only providers returned by the API and allow adding from known set
  const [depositAddKey, setDepositAddKey] = useState<Provider | "">("");
  const [withdrawalAddKey, setWithdrawalAddKey] = useState<Provider | "">("");

  const addProviderToForm = (
    scheduleType: "deposit_fee_schedules" | "withdrawal_fee_schedules",
    key: Provider,
  ) => {
    const path = `${scheduleType}.${key}` as const;
    form.setValue(path as any, defaultSchedule(), {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const removeProviderFromForm = (
    scheduleType: "deposit_fee_schedules" | "withdrawal_fee_schedules",
    key: Provider,
  ) => {
    const path = `${scheduleType}.${key}` as const;
    form.setValue(path as any, [], {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const {
    fields: ngFields,
    append: appendNg,
    remove: removeNg,
  } = useFieldArray({
    control: form.control,
    name: "p2p_interest_rate_caps.NG",
  });

  const {
    fields: ugFields,
    append: appendUg,
    remove: removeUg,
  } = useFieldArray({
    control: form.control,
    name: "p2p_interest_rate_caps.UG",
  });

  const [activeCapRegion, setActiveCapRegion] = useState<"NG" | "UG">("NG");

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
    <div className="space-y-6 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage system-wide administrative settings and platform
          configurations.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="columns-1 md:columns-2 gap-6 space-y-6 [&>*]:break-inside-avoid-column">
            {/* Platform Fees */}
            <Card className="border-none shadow-sm bg-white dark:bg-card">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Percent className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <CardTitle className="text-xl">Platform Fees</CardTitle>
                </div>
                <CardDescription>
                  Configure the default fee percentage applied to P2P
                  transactions.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="p2p_platform_fee_percentage"
                  render={({ field }) => (
                    <TextInput
                      label="P2P Platform Fee (%)"
                      type="number"
                      placeholder="e.g. 2.5"
                      field={field as any}
                    />
                  )}
                />
              </CardContent>
            </Card>

            {/* Interest Rate Caps */}
            <Card className="border-none shadow-sm bg-white dark:bg-card">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <CardTitle className="text-xl">
                    P2P Interest Rate Caps
                  </CardTitle>
                </div>
                <CardDescription>
                  Set interest rate caps based on minimum credit scores per
                  region.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 border-b pb-2">
                  {(["NG", "UG"] as const).map((region) => (
                    <button
                      key={region}
                      type="button"
                      onClick={() => setActiveCapRegion(region)}
                      className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
                        activeCapRegion === region
                          ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`}
                    >
                      {region === "NG" ? "Nigeria (NG)" : "Uganda (UG)"}
                    </button>
                  ))}
                </div>

                <div className="space-y-3">
                  {(activeCapRegion === "NG" ? ngFields : ugFields).map(
                    (item, index) => (
                      <div
                        key={item.id}
                        className="flex gap-4 items-end border p-3 rounded-lg bg-slate-50/50 dark:bg-slate-800/20"
                      >
                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name={
                              `p2p_interest_rate_caps.${activeCapRegion}.${index}.min_score` as any
                            }
                            render={({ field }) => (
                              <TextInput
                                label="Min Score"
                                type="number"
                                placeholder="e.g. 500"
                                field={field as any}
                              />
                            )}
                          />
                        </div>
                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name={
                              `p2p_interest_rate_caps.${activeCapRegion}.${index}.cap` as any
                            }
                            render={({ field }) => (
                              <TextInput
                                label="Cap (%)"
                                type="number"
                                step="0.1"
                                placeholder="e.g. 20"
                                field={field as any}
                              />
                            )}
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 h-10 w-10 shrink-0 mb-[2px]"
                          onClick={() =>
                            activeCapRegion === "NG"
                              ? removeNg(index)
                              : removeUg(index)
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ),
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-dashed"
                    onClick={() =>
                      activeCapRegion === "NG"
                        ? appendNg({ min_score: 0, cap: 0 })
                        : appendUg({ min_score: 0, cap: 0 })
                    }
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Cap Rule
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Deposit Fee Schedules */}
            <Card className="border-none shadow-sm bg-white dark:bg-card">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <CardTitle className="text-xl">
                    Deposit Fee Schedules
                  </CardTitle>
                </div>
                <CardDescription>
                  Each phase applies from its start date until the next phase
                  begins. Phase 1 with no date is active immediately.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {(() => {
                  const current = form.getValues("deposit_fee_schedules") || {};
                  const keys = Object.keys(current).filter(
                    (k) =>
                      Array.isArray((current as any)[k]) &&
                      (current as any)[k].length > 0,
                  ) as Provider[];

                  return (
                    <>
                      {keys.map((key) => {
                        const provider = PROVIDERS.find((p) => p.key === key);
                        return (
                          <div key={key} className="space-y-2">
                            <FeeScheduleEditor
                              scheduleType="deposit_fee_schedules"
                              providerKey={key}
                              providerName={provider?.name ?? key}
                              control={form.control}
                              onRemove={() =>
                                removeProviderFromForm(
                                  "deposit_fee_schedules",
                                  key,
                                )
                              }
                            />
                          </div>
                        );
                      })}

                      {/* Add provider control */}
                      <div className="flex gap-2 items-center">
                        <select
                          className="rounded-md border p-2 text-sm"
                          value={depositAddKey}
                          onChange={(e) =>
                            setDepositAddKey(e.target.value as any)
                          }
                        >
                          <option value="">Add provider...</option>
                          {PROVIDERS.filter((p) => !keys.includes(p.key)).map(
                            (p) => (
                              <option key={p.key} value={p.key}>
                                {p.name}
                              </option>
                            ),
                          )}
                        </select>
                        <Button
                          type="button"
                          onClick={() => {
                            if (depositAddKey) {
                              addProviderToForm(
                                "deposit_fee_schedules",
                                depositAddKey as Provider,
                              );
                              setDepositAddKey("");
                            }
                          }}
                        >
                          Add provider
                        </Button>
                      </div>
                    </>
                  );
                })()}
              </CardContent>
            </Card>

            {/* Withdrawal Fee Schedules */}
            <Card className="border-none shadow-sm bg-white dark:bg-card">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <CardTitle className="text-xl">
                    Withdrawal Fee Schedules
                  </CardTitle>
                </div>
                <CardDescription>
                  Each phase applies from its start date until the next phase
                  begins. Phase 1 with no date is active immediately.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {(() => {
                  const current =
                    form.getValues("withdrawal_fee_schedules") || {};
                  const keys = Object.keys(current).filter(
                    (k) =>
                      Array.isArray((current as any)[k]) &&
                      (current as any)[k].length > 0,
                  ) as Provider[];

                  return (
                    <>
                      {keys.map((key) => {
                        const provider = PROVIDERS.find((p) => p.key === key);
                        return (
                          <div key={key} className="space-y-2">
                            <FeeScheduleEditor
                              scheduleType="withdrawal_fee_schedules"
                              providerKey={key}
                              providerName={provider?.name ?? key}
                              control={form.control}
                              onRemove={() =>
                                removeProviderFromForm(
                                  "withdrawal_fee_schedules",
                                  key,
                                )
                              }
                            />
                          </div>
                        );
                      })}

                      {/* Add provider control */}
                      <div className="flex gap-2 items-center">
                        <select
                          className="rounded-md border p-2 text-sm"
                          value={withdrawalAddKey}
                          onChange={(e) =>
                            setWithdrawalAddKey(e.target.value as any)
                          }
                        >
                          <option value="">Select Provider...</option>
                          {PROVIDERS.filter((p) => !keys.includes(p.key)).map(
                            (p) => (
                              <option key={p.key} value={p.key}>
                                {p.name}
                              </option>
                            ),
                          )}
                        </select>
                        <Button
                          type="button"
                          onClick={() => {
                            if (withdrawalAddKey) {
                              addProviderToForm(
                                "withdrawal_fee_schedules",
                                withdrawalAddKey as Provider,
                              );
                              setWithdrawalAddKey("");
                            }
                          }}
                        >
                          Add Provider
                        </Button>
                      </div>
                    </>
                  );
                })()}
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={!form.formState.isDirty}
              loading={updateAdminSettingsLoading}
              className="w-full sm:w-auto px-8 py-6 text-base font-semibold shadow-md"
            >
              <Save className="mr-2 h-5 w-5" />
              Save All Settings
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
