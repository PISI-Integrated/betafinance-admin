export const formatNumber = (num: number): string => {
  return num.toLocaleString("en-US");
};

export const formatCurrency = (amount: number, region?: string): string => {
  if (region === "UG") {
    return `UGX ${formatNumber(amount)}`;
  }
  return `₦${formatNumber(amount)}`;
};

export const formatPercentage = (value: number): string => {
  return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
};

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
