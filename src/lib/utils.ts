import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, region?: string) {
  const currency = region === "UG" ? "UGX" : "NGN";
  const locale = region === "UG" ? "en-UG" : "en-NG";
  const formatted = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 2,
  }).format(amount);
  return formatted;
}

export function formatDate(date: string, time = false) {
  const newDate = new Date(date);

  const formattedDate = newDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: time ? "2-digit" : undefined,
    minute: time ? "2-digit" : undefined,
    timeZone: "Africa/Lagos",
  });

  return formattedDate;
}

export const formatTime = (dateString: string) =>
  new Date(dateString).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Lagos",
  });

export const formatAmount = (amount: string, type: "debit" | "credit") =>
  `${type === "credit" ? "+" : "-"}₦${Number(amount).toLocaleString()}`;

export const getTimeBucket = (date: Date) => {
  const now = new Date();

  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );
  const startOfDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  const diffInDays =
    (startOfToday.getTime() - startOfDate.getTime()) / (1000 * 60 * 60 * 24);

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays <= 7) return "Last week";
  if (diffInDays <= 30) return "Last month";

  const diffInMonths =
    now.getFullYear() * 12 +
    now.getMonth() -
    (date.getFullYear() * 12 + date.getMonth());

  return `${diffInMonths} months ago`;
};

export const formatEnumString = (value: string) => {
  return value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export function normalizePayload<T extends Record<string, any> | any[]>(
  obj: T,
): any {
  if (obj === null || obj === undefined) return obj;

  if (Array.isArray(obj)) {
    if (obj.length === 0) return null;
    // normalize items and remove empty/null items
    const items = obj
      .map((item) => normalizePayload(item))
      .filter((it) => it !== null && it !== undefined && !(typeof it === "object" && Object.keys(it).length === 0));
    return items.length === 0 ? null : items;
  }

  if (typeof obj === "object") {
    const out: Record<string, any> = {};
    for (const [k, v] of Object.entries(obj as Record<string, any>)) {
      // treat numeric zero and string zeros (including "0%") as null
      if (v === 0 || (typeof v === "string" && v.trim() === "0")) {
        out[k] = null;
        continue;
      }

      if (typeof v === "string" && k.toLowerCase() === "percentage") {
        const cleaned = v.trim().replace(/%$/, "");
        if (
          cleaned !== "" &&
          !Number.isNaN(Number(cleaned)) &&
          Number(cleaned) === 0
        ) {
          out[k] = null;
          continue;
        }
      }

      if (Array.isArray(v)) {
        const items = v
          .map((item) => normalizePayload(item))
          .filter((it) => it !== null && it !== undefined && !(typeof it === "object" && Object.keys(it).length === 0));
        if (items.length > 0) out[k] = items;
        // else omit key
      } else if (v && typeof v === "object") {
        const nested = normalizePayload(v);
        if (nested !== null && !(typeof nested === "object" && Object.keys(nested).length === 0)) {
          out[k] = nested;
        }
      } else if (v !== null && v !== undefined) {
        out[k] = v;
      }
    }
    // if object has no keys, return null to signal emptiness
    return Object.keys(out).length === 0 ? null : out;
  }

  return obj;
}
