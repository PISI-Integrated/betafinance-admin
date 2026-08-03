import * as z from "zod";

const interestRateCapSchema = z.object({
  min_score: z.coerce.number().min(0, "Min score cannot be negative"),
  cap: z.coerce.number().min(0, "Cap cannot be negative"),
});

const feeTierSchema = z.object({
  min_amount: z.coerce.number().min(0, "Min amount cannot be negative"),
  fee: z.coerce.number().min(0, "Fee cannot be negative"),
});

// One phase: exactly one of flat_fee, percentage, tiers is set; others null.
const feePhaseSchema = z.object({
  effective_from: z.string().nullable().optional(),
  flat_fee: z.coerce.number().nullable().optional(),
  percentage: z.coerce.number().nullable().optional(),
  tiers: z.array(feeTierSchema).nullable().optional(),
});

export type FeePhase = z.infer<typeof feePhaseSchema>;
export type FeeTier = z.infer<typeof feeTierSchema>;

// Array of phases with chronological date ordering validation
const providerPhaseArraySchema = z
  .array(feePhaseSchema)
  .superRefine((phases, ctx) => {
    const seenDates = new Set<string>();
    for (let i = 0; i < phases.length; i++) {
      const phase = phases[i];
      const dateStr = phase.effective_from;

      // Phase 2+ requires a date
      if (i > 0 && !dateStr) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Start date is required for scheduled phases",
          path: [i, "effective_from"],
        });
        continue;
      }

      if (!dateStr) continue; // Phase 1 blank is OK

      // Duplicate date check
      if (seenDates.has(dateStr)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Duplicate date — each phase must have a unique start date",
          path: [i, "effective_from"],
        });
      }
      seenDates.add(dateStr);

      // Chronological order check
      if (i > 0) {
        const prevDateStr = phases[i - 1].effective_from;
        if (prevDateStr && new Date(dateStr) <= new Date(prevDateStr)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Date must be strictly after the previous phase's date",
            path: [i, "effective_from"],
          });
        }
      }
    }
  });

const providerFeeSchedulesSchema = z.object({
  yo: providerPhaseArraySchema.optional(),
  dusupay: providerPhaseArraySchema.optional(),
  momo: providerPhaseArraySchema.optional(),
  paystack: providerPhaseArraySchema.optional(),
});

export const settingsSchema = z.object({
  p2p_platform_fee_percentage: z.coerce
    .number()
    .min(0, "Fee cannot be negative")
    .max(100, "Fee cannot exceed 100%"),
  gnugrid_crb_fee_ugx: z.coerce
    .number()
    .min(0, "CRB fee cannot be negative"),
  gnugrid_crb_freshness_days: z.coerce
    .number()
    .min(0, "Freshness days cannot be negative"),
  p2p_interest_rate_caps: z.object({
    NG: z.array(interestRateCapSchema),
    UG: z.array(interestRateCapSchema),
  }),
  withdrawal_fee_schedules: providerFeeSchedulesSchema,
  deposit_fee_schedules: providerFeeSchedulesSchema,
});

export type SettingsFormValues = z.infer<typeof settingsSchema>;

