"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, formatNumber } from "@/lib/utils/formatters";

interface KPICardsProps {
  overviewData: IOverviewResponse | undefined;
  isOverviewLoading: boolean;
}

export function KPICards({ overviewData, isOverviewLoading }: KPICardsProps) {
  const kpiCards = overviewData
    ? [
        {
          title: "Total Transaction Volume",
          content: formatCurrency(overviewData.total_transaction_volume),
          footer: formatCurrency(overviewData.volume_this_month),
        },
        {
          title: "Total Credit Transactions",
          content: formatCurrency(overviewData.total_credit_transactions),
        },
        {
          title: "Total Debit Transactions",
          content: formatCurrency(overviewData.total_debit_transactions),
        },
        {
          title: "Total Users",
          content: formatNumber(overviewData.total_users),
          footer: "",
        },
        {
          title: "New Users This Month",
          content: formatNumber(overviewData.new_users_this_month),
          footer: "",
        },
        {
          title: "Active Loans",
          content: formatNumber(overviewData.active_loans),
          footer: "",
        },
        {
          title: "New Loans This Month",
          content: formatNumber(overviewData.new_loans_this_month),
          footer: "",
        },
        {
          title: "Average Credit Score",
          content: formatNumber(overviewData.average_credit_score),
          footer: "",
        },
      ]
    : [];

  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-lg border-l border-t border-[#E5E7EB] bg-white md:grid-cols-2 lg:grid-cols-4">
      {isOverviewLoading
        ? Array.from({ length: 8 }).map((_, index) => (
            <Card
              key={index}
              className="rounded-none border-0 border-b border-r border-[#E5E7EB] bg-white shadow-none h-full"
            >
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-32" />
              </CardHeader>
              <CardContent className="space-y-1">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-3 w-40" />
              </CardContent>
            </Card>
          ))
        : kpiCards.map((item, index) => (
            <Card
              key={index}
              className="rounded-none border-0 border-b border-r border-[#E5E7EB] bg-white shadow-none h-full"
            >
              <CardHeader className="pb-2">
                <CardDescription className="text-xs text-[#95989E] truncate">
                  {item.title}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-1">
                <p className="text-2xl font-bold text-gray-900 text-wrap break-words">
                  {item.content}
                </p>
                {item.footer && (
                  <p className="text-xs text-black">
                    {item.footer}{" "}
                    <span className="text-[#95989E]">in the last 30 days</span>
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
    </div>
  );
}
