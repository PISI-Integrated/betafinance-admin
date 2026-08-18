"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Wallet, CreditCard, Coins, Zap, Landmark } from "lucide-react";

interface ProviderBalancesProps {
  providerBalances:
    | IProviderBalancesResponse[]
    | IProviderBalancesResponse
    | IProviderBalanceItem[]
    | any;
  isLoading: boolean;
  walletBalances?: IWalletBalancesResponse | any;
  isWalletLoading?: boolean;
}

const PROVIDER_METADATA: Record<
  string,
  { displayName: string; color: string; bg: string; icon: any }
> = {
  paystack: {
    displayName: "Paystack",
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    icon: CreditCard,
  },
  yo: {
    displayName: "Yo! Payments",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    icon: Wallet,
  },
  momo: {
    displayName: "MTN MoMo",
    color: "text-amber-600",
    bg: "bg-amber-50",
    icon: Zap,
  },
  dusupay: {
    displayName: "DusuPay",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    icon: Coins,
  },
};

function formatAmount(val: string | number, currencyCode: string): string {
  const num = typeof val === "number" ? val : parseFloat(String(val));
  if (isNaN(num)) return String(val);

  const formattedNum = num.toLocaleString("en-US", {
    minimumFractionDigits: num % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });

  const upperCurr = currencyCode.toUpperCase();
  if (upperCurr === "NGN") return `₦${formattedNum}`;
  if (upperCurr === "UGX") return `UGX ${formattedNum}`;
  if (upperCurr === "USD") return `$${formattedNum}`;
  if (upperCurr === "EUR") return `€${formattedNum}`;
  if (upperCurr === "GBP") return `£${formattedNum}`;
  if (upperCurr === "KES") return `KSh ${formattedNum}`;
  if (upperCurr === "GHS") return `GH₵ ${formattedNum}`;

  return `${upperCurr} ${formattedNum}`;
}

function isLowWalletBalance(
  currencyCode: string,
  val: string | number,
): boolean {
  const num = typeof val === "number" ? val : parseFloat(String(val));
  if (isNaN(num)) return false;

  const upper = currencyCode.toUpperCase();
  if (upper === "NGN" && num < 200000) return true;
  if (upper === "UGX" && num < 500000) return true;
  return false;
}

export function ProviderBalances({
  providerBalances,
  isLoading,
  walletBalances,
  isWalletLoading,
}: ProviderBalancesProps) {
  // Filter ONLY active/supported providers
  const activeProvidersList = useMemo<IProviderBalanceItem[]>(() => {
    if (!providerBalances) return [];

    let rawList: IProviderBalanceItem[] = [];

    if (Array.isArray(providerBalances)) {
      for (const entry of providerBalances) {
        if (entry && typeof entry === "object") {
          if (Array.isArray(entry.providers)) {
            rawList.push(...entry.providers);
          } else if ("provider" in entry) {
            rawList.push(entry as IProviderBalanceItem);
          }
        }
      }
    } else if (
      typeof providerBalances === "object" &&
      Array.isArray(providerBalances.providers)
    ) {
      rawList = providerBalances.providers;
    }

    return rawList.filter((item) => item.supported);
  }, [providerBalances]);

  // Normalize wallet balances (merging walletBalances and wallet single response)
  const parsedWalletBalances = useMemo<[string, string | number][]>(() => {
    const result: [string, string | number][] = [];
    const addedCurrencies = new Set<string>();

    if (
      typeof walletBalances === "object" &&
      walletBalances.balances &&
      typeof walletBalances.balances === "object"
    ) {
      return Object.entries(walletBalances.balances) as [
        string,
        string | number,
      ][];
    }

    if (typeof walletBalances === "object" && !Array.isArray(walletBalances)) {
      return Object.entries(walletBalances).filter(
        ([_, val]) => typeof val === "string" || typeof val === "number",
      ) as [string, string | number][];
    }

    return [];
  }, [walletBalances]);

  const hasLowWalletBalance = useMemo(() => {
    return parsedWalletBalances.some(([curr, amt]) =>
      isLowWalletBalance(curr, amt),
    );
  }, [parsedWalletBalances]);

  const isOverallLoading = isLoading || isWalletLoading;
  const hasNoData =
    activeProvidersList.length === 0 && parsedWalletBalances.length === 0;

  return (
    <Card className="overflow-hidden rounded-lg border-gray-200 bg-white shadow-none">
      <CardHeader className="border-b border-gray-200 pb-4 flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Provider & Wallet Balances
          </CardTitle>
          {!isOverallLoading && (
            <Badge
              variant="outline"
              className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs font-normal"
            >
              {activeProvidersList.length} Active Gateways
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {isOverallLoading ? (
          <div className="p-4 space-y-4">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="flex items-center gap-x-4">
                <Skeleton className="h-9 w-9 rounded-md" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-4 w-28" />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <Table className="w-full min-w-[650px]">
              <TableHeader>
                <TableRow className="hover:bg-transparent whitespace-nowrap">
                  <TableHead className="w-[40%] whitespace-nowrap text-xs font-medium text-gray-500">
                    ACCOUNT / PROVIDER
                  </TableHead>
                  <TableHead className="w-[25%] whitespace-nowrap text-xs font-medium text-gray-500">
                    CATEGORY
                  </TableHead>
                  <TableHead className="w-[15%] whitespace-nowrap text-xs font-medium text-gray-500">
                    STATUS
                  </TableHead>
                  <TableHead className="w-[20%] text-right whitespace-nowrap text-xs font-medium text-gray-500">
                    AVAILABLE BALANCE
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* System Wallet Row */}
                {parsedWalletBalances.length > 0 && (
                  <TableRow className="hover:bg-gray-50/50 whitespace-nowrap">
                    <TableCell className="whitespace-nowrap">
                      <div className="flex items-center gap-x-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                          <Landmark className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            System Wallet
                          </p>
                          <p className="text-xs text-gray-500">
                            B2C Lending Pool
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Badge
                        variant="outline"
                        className="border-blue-200 bg-blue-50 text-blue-700 text-xs font-normal"
                      >
                        Internal Wallet
                      </Badge>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {hasLowWalletBalance ? (
                        <Badge
                          variant="outline"
                          className="border-red-200 bg-red-50 text-red-700 text-xs font-medium gap-1"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                          Low Liquidity
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="border-emerald-200 bg-emerald-50 text-emerald-700 text-xs font-medium gap-1"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Active
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right whitespace-nowrap">
                      <div className="space-y-0.5">
                        {parsedWalletBalances.map(([currency, amount]) => {
                          const isLow = isLowWalletBalance(currency, amount);
                          return (
                            <p
                              key={currency}
                              className={
                                isLow
                                  ? "text-sm font-bold text-red-600 animate-pulse whitespace-pre"
                                  : "text-sm font-bold text-gray-900 whitespace-pre"
                              }
                            >
                              {formatAmount(amount, currency)}
                            </p>
                          );
                        })}
                      </div>
                    </TableCell>
                  </TableRow>
                )}

                {/* Active Provider Rows */}
                {activeProvidersList.map((item, index) => {
                  const rawKey = (item.provider || "").toLowerCase();
                  const meta = PROVIDER_METADATA[rawKey] || {
                    displayName: item.provider
                      ? item.provider.toUpperCase()
                      : "Provider",
                    color: "text-gray-700",
                    bg: "bg-gray-100",
                    icon: Wallet,
                  };
                  const Icon = meta.icon;
                  const balances = item.balances
                    ? Object.entries(item.balances)
                    : [];

                  return (
                    <TableRow
                      key={index}
                      className="hover:bg-gray-50/50 whitespace-nowrap"
                    >
                      <TableCell className="whitespace-nowrap">
                        <div className="flex items-center gap-x-3">
                          <div
                            className={`flex h-9 w-9 items-center justify-center rounded-md ${meta.bg} ${meta.color}`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {meta.displayName}
                            </p>
                            <p className="text-xs text-gray-500">
                              Payment Gateway
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <Badge
                          variant="outline"
                          className="border-gray-200 bg-gray-50 text-gray-600 text-xs font-normal"
                        >
                          Payment Provider
                        </Badge>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <Badge
                          variant="outline"
                          className="border-emerald-200 bg-emerald-50 text-emerald-700 text-xs font-medium gap-1"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Active
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right whitespace-nowrap">
                        {balances.length > 0 ? (
                          <div className="space-y-0.5">
                            {balances.map(([currency, amount]) => (
                              <p
                                key={currency}
                                className="text-sm font-bold text-gray-900 whitespace-pre"
                              >
                                {formatAmount(amount, currency)}
                              </p>
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400 italic whitespace-nowrap">
                            No balance reported
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}

                {hasNoData && (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="h-24 text-center text-sm text-gray-500 whitespace-nowrap"
                    >
                      No active provider or wallet balance data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
