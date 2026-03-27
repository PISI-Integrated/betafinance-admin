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
  if (!name) return "NA";
  const parts = name.split(" ").filter((part) => part.length > 0);
  if (parts.length === 0) return "NA";
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (
    parts[0].charAt(0).toUpperCase() +
    parts[parts.length - 1].charAt(0).toUpperCase()
  );
};

/**
 * Format date as time ago
 */
export const formatTimeAgo = (date: string | Date): string => {
  const now = new Date();
  const then = new Date(date);
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  return then.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};
