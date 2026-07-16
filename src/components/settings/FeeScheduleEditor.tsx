"use client";
import {
  useFieldArray,
  Control,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, CalendarClock, Trash2 } from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";
import { SettingsFormValues, FeePhase } from "@/schema/settings.validation";
import { cn } from "@/lib/utils";

type Provider = "yo" | "dusupay" | "momo" | "paystack";
type ScheduleType = "withdrawal_fee_schedules" | "deposit_fee_schedules";
type FeeType = "flat_fee" | "percentage" | "tiers";

interface FeeScheduleEditorProps {
  scheduleType: ScheduleType;
  providerKey: Provider;
  providerName: string;
  control: Control<SettingsFormValues>;
  onRemove?: () => void;
}

function detectFeeType(phase: Partial<FeePhase>): FeeType {
  if (
    phase.tiers != null &&
    Array.isArray(phase.tiers) &&
    phase.tiers.length > 0
  )
    return "tiers";
  if (phase.percentage != null) return "percentage";
  return "flat_fee";
}

function addMonths(dateStr: string | null | undefined, months: number): string {
  const base = dateStr ? new Date(dateStr) : new Date();
  base.setMonth(base.getMonth() + months);
  return base.toISOString().split("T")[0];
}

export function FeeScheduleEditor({
  scheduleType,
  providerKey,
  providerName,
  control,
  onRemove,
}: FeeScheduleEditorProps) {
  const fieldPath = `${scheduleType}.${providerKey}` as const;

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: fieldPath as any,
  });

  const {
    formState: { errors },
  } = useFormContext<SettingsFormValues>();

  // Derive phase-level errors
  const phaseErrors: Record<number, Record<string, string>> = {};
  const scheduleErrors = (errors as any)?.[scheduleType]?.[providerKey];
  if (Array.isArray(scheduleErrors)) {
    scheduleErrors.forEach((phaseErr: any, i: number) => {
      if (!phaseErr) return;
      phaseErrors[i] = {};
      if (phaseErr.effective_from?.message)
        phaseErrors[i].effective_from = phaseErr.effective_from.message;
    });
  }
  const arrayRootError: string | undefined =
    (scheduleErrors as any)?.root?.message ?? (scheduleErrors as any)?.message;

  const [feeTypes, setFeeTypes] = useState<Record<number, FeeType>>(() => {
    const init: Record<number, FeeType> = {};
    fields.forEach((f, i) => {
      init[i] = detectFeeType(f as any);
    });
    return init;
  });

  // Keep a per-phase backup of fee values so switches can be undone
  const [feeBackups, setFeeBackups] = useState<
    Record<number, Partial<FeePhase>>
  >({});

  const watchedPhases = useWatch({ control, name: fieldPath as any }) as
    | FeePhase[]
    | undefined;

  const getFeeType = (index: number): FeeType => {
    if (feeTypes[index] !== undefined) return feeTypes[index];
    const phase = watchedPhases?.[index];
    if (!phase) return "flat_fee";
    return detectFeeType(phase);
  };

  const setFeeType = (index: number, type: FeeType) => {
    setFeeTypes((prev) => ({ ...prev, [index]: type }));

    const current = (watchedPhases?.[index] ?? {}) as Partial<FeePhase>;

    const prevType = feeTypes[index] ?? detectFeeType(current);

    // Store the previous value of the previous type into backups
    if (prevType !== type) {
      setFeeBackups((prev) => {
        const copy = { ...(prev || {}) } as typeof prev;
        copy[index] = { ...(copy[index] ?? {}) };
        if (prevType === "flat_fee") copy[index].flat_fee = current.flat_fee;
        if (prevType === "percentage")
          copy[index].percentage = current.percentage;
        if (prevType === "tiers") copy[index].tiers = current.tiers;
        return copy;
      });
    }

    // Backed-up value when switching back, else use current value or sensible default
    const backup = feeBackups[index] ?? {};

    const next: any = {
      effective_from: current.effective_from ?? null,
      flat_fee: null,
      percentage: null,
      tiers: null,
    };

    if (type === "flat_fee") {
      next.flat_fee = backup.flat_fee ?? current.flat_fee ?? 0;
    } else if (type === "percentage") {
      next.percentage = backup.percentage ?? current.percentage ?? 0;
    } else if (type === "tiers") {
      next.tiers = backup.tiers ?? current.tiers ?? [{ min_amount: 0, fee: 0 }];
    }

    update(index, next);
  };

  const handleAddPhase = () => {
    const lastPhase = watchedPhases?.[watchedPhases.length - 1];
    const newDate = addMonths(lastPhase?.effective_from, 1);
    const newIndex = fields.length;
    setFeeTypes((prev) => ({ ...prev, [newIndex]: "flat_fee" }));
    append({
      effective_from: newDate,
      flat_fee: 0,
      percentage: null,
      tiers: null,
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2 mb-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-slate-800 dark:text-slate-200">
            {providerName}
          </span>
          <span className="text-xs uppercase bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-500 dark:text-slate-400 font-mono">
            {providerKey}
          </span>
        </div>
        {onRemove && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-700"
            onClick={onRemove}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Remove provider
          </Button>
        )}
      </div>

      {fields.map((field, index) => {
        const isPhase1 = index === 0;
        const phaseDate = (watchedPhases?.[index] as any)?.effective_from;
        const isScheduled = !!phaseDate;
        const feeType = getFeeType(index);
        const phaseErr = phaseErrors[index] ?? {};
        const hasDateErr = !!phaseErr.effective_from;

        return (
          <div
            key={field.id}
            className="border rounded-xl bg-white dark:bg-slate-900/20 overflow-hidden shadow-sm"
          >
            {/* Phase header */}
            <div className="flex items-center justify-between px-4 py-3 border-b bg-slate-50/70 dark:bg-slate-800/40">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-slate-800 dark:text-slate-200">
                  Phase {index + 1}
                </span>
                {isPhase1 && !isScheduled ? (
                  <span className="text-[10px] font-semibold uppercase tracking-wide bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                    Active Now
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold uppercase tracking-wide bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CalendarClock className="h-3 w-3" />
                    Scheduled
                  </span>
                )}
              </div>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    remove(index);
                    setFeeTypes((prev) => {
                      const next: Record<number, FeeType> = {};
                      Object.entries(prev).forEach(([k, v]) => {
                        const ki = parseInt(k);
                        if (ki < index) next[ki] = v;
                        else if (ki > index) next[ki - 1] = v;
                      });
                      return next;
                    });
                  }}
                  className="text-red-500 dark:hover:text-red-400 transition-colors"
                  aria-label="Remove phase"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="p-4 space-y-4">
              {/* Effective from date */}
              <div className="space-y-1">
                <Label className="text-xs font-medium text-slate-600 dark:text-slate-400">
                  Effective from
                </Label>
                <DatePicker
                  control={control as any}
                  name={`${fieldPath}.${index}.effective_from`}
                  className={cn(
                    hasDateErr && "border-red-500 focus-visible:ring-red-500",
                  )}
                />
                {hasDateErr ? (
                  <p className="text-xs text-red-500 mt-0.5">
                    {phaseErr.effective_from}
                  </p>
                ) : isPhase1 ? (
                  <p className="text-xs text-slate-400 mt-0.5">
                    Blank = active immediately
                  </p>
                ) : null}
              </div>

              {/* Fee type tab selector */}
              <div className="space-y-3">
                <div className="grid grid-cols-3 rounded-lg overflow-hidden border bg-white dark:bg-slate-900/30">
                  {(["flat_fee", "percentage", "tiers"] as FeeType[]).map(
                    (t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setFeeType(index, t)}
                        className={cn(
                          "py-2 text-xs font-semibold transition-colors border-r last:border-r-0",
                          feeType === t
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                            : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40",
                        )}
                      >
                        {t === "flat_fee"
                          ? "Flat fee"
                          : t === "percentage"
                            ? "Percentage"
                            : "Tiers"}
                      </button>
                    ),
                  )}
                </div>

                {/* Flat fee input */}
                {feeType === "flat_fee" && (
                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-slate-600 dark:text-slate-400">
                      Amount
                    </Label>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="0"
                        className="pr-14 text-sm"
                        {...(control as any).register(
                          `${fieldPath}.${index}.flat_fee`,
                          { valueAsNumber: true },
                        )}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none">
                        UGX
                      </span>
                    </div>
                  </div>
                )}

                {/* Percentage input */}
                {feeType === "percentage" && (
                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-slate-600 dark:text-slate-400">
                      Percentage
                    </Label>
                    <div className="relative">
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className="pr-8 text-sm"
                        {...(control as any).register(
                          `${fieldPath}.${index}.percentage`,
                          { valueAsNumber: true },
                        )}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none">
                        %
                      </span>
                    </div>
                  </div>
                )}

                {/* Tiers rows */}
                {feeType === "tiers" && (
                  <TieredEditor
                    control={control}
                    fieldPath={`${fieldPath}.${index}.tiers`}
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}

      <button
        type="button"
        onClick={handleAddPhase}
        className="w-full flex items-center justify-center gap-2 py-2.5 border border-dashed rounded-lg text-sm text-slate-500 dark:text-slate-400 hover:border-slate-400 hover:text-slate-700 dark:hover:border-slate-500 dark:hover:text-slate-300 transition-colors"
      >
        <Plus className="h-4 w-4" /> Add phase
      </button>

      {arrayRootError && (
        <p className="text-xs text-red-500">{arrayRootError}</p>
      )}
    </div>
  );
}

// Tiers sub-editor
interface TieredEditorProps {
  control: Control<SettingsFormValues>;
  fieldPath: string;
}

function TieredEditor({ control, fieldPath }: TieredEditorProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldPath as any,
  });

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-[1fr_1fr_auto] gap-2 px-0.5">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
          Min Amount (UGX)
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
          Fee (UGX)
        </span>
        <span />
      </div>

      {fields.map((tier, ti) => (
        <div
          key={tier.id}
          className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center"
        >
          <Input
            type="number"
            placeholder="0"
            className="text-sm h-9"
            {...(control as any).register(`${fieldPath}.${ti}.min_amount`, {
              valueAsNumber: true,
            })}
          />
          <Input
            type="number"
            placeholder="0"
            className="text-sm h-9"
            {...(control as any).register(`${fieldPath}.${ti}.fee`, {
              valueAsNumber: true,
            })}
          />
          <button
            type="button"
            onClick={() => remove(ti)}
            className="text-red-500 transition-colors p-1"
            aria-label="Remove tier"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ min_amount: 0, fee: 0 })}
        className="flex items-center gap-1.5 text-sm text-primary dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors pt-0.5"
      >
        <Plus className="h-3.5 w-3.5" />
        Add tier
      </button>
    </div>
  );
}
