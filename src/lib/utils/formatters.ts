/**
 * Format number with commas
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString("en-US");
};

/**
 * Format currency in Naira
 */
export const formatCurrency = (amount: number): string => {
  return `₦${formatNumber(amount)}`;
};

/**
 * Format currency with hash prefix
 */
export const formatCurrencyWithHash = (amount: number): string => {
  return `#${formatNumber(amount)}`;
};

/**
 * Format percentage
 */
export const formatPercentage = (value: number): string => {
  return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
};

/**
 * Get user initials from name
 */
export const getUserInitials = (name: string): string => {
  const parts = name.trim().split(" ");
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};
