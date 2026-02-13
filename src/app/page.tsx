"use client";
import { Chart } from "@/components/Chart";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";
import {
  useFetchOverviewService,
  useFetchTopRankingCreditScoresService,
  useFetchTopRankingLendersService,
} from "@/services/analytics.service";
import {
  formatCurrency,
  formatCurrencyWithHash,
  formatNumber,
  getUserInitials,
} from "@/lib/utils/formatters";
import Icon from "@/lib/constants/icons";
import { Skeleton } from "@/components/ui/skeleton";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Dashboard | Betafinance",
//   description: "Dashboard Overview",
// };

export default function Home() {
  const { overviewData, isOverviewLoading } = useFetchOverviewService();
  const { topRankingLenders, isTopLendersLoading } =
    useFetchTopRankingLendersService();
  const { topRankingCreditScores, isTopScoresLoading } =
    useFetchTopRankingCreditScoresService();

  // Map overview data to KPI cards
  const kpiCards = overviewData
    ? [
      {
        title: "Total Transaction Volume",
        content: formatCurrency(
          overviewData.total_transaction_volume,
        ),
        footer: formatCurrency(overviewData.volume_this_month),
      },
      {
        title: "Total Credit Transactions",
        content: formatCurrency(
          overviewData.total_credit_transactions,
        ),
      },
      {
        title: "Total Debit Transactions",
        content: formatCurrency(
          overviewData.total_debit_transactions,
        ),
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
    <main className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 overflow-hidden rounded-lg border-l border-t border-[#E5E7EB] bg-white md:grid-cols-2 lg:grid-cols-4">
        {isOverviewLoading
          ? // Loading skeletons
          Array.from({ length: 5 }).map((_, index) => (
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
                    <span className="text-[#95989E]">
                      in the last 30 days
                    </span>
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Top Rankings and Credit Score */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Top Ranking Lenders */}
        <Card className="overflow-hidden rounded-lg border-gray-200 bg-white">
          <CardHeader className="border-b border-gray-200 pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">
              Top ranking lenders
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {isTopLendersLoading ? (
              <div className="p-4 space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="flex items-center gap-x-4">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton className="h-4 w-20" />
                  </div>
                ))}
              </div>
            ) : (
              <Table>
                <TableBody>
                  {topRankingLenders?.slice(0, 5).map((item, rowIndex) => (
                    <TableRow key={item.user_id} className="w-full">
                      <TableCell>
                        <div className="flex items-center gap-x-2">
                          <span className="font-semibold text-gray-900">
                            {item.rank}
                          </span>
                          <Image
                            src={
                              rowIndex === 0
                                ? Icon.ArrowUp
                                : rowIndex === 2
                                  ? Icon.ArrowDown
                                  : Icon.Minus
                            }
                            alt="rank indicator"
                            width={16}
                            height={16}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="flex items-center gap-x-2">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-blue-100 text-sm font-semibold text-blue-600">
                            {getUserInitials(item.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {item.username}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {item.email || "-"}
                      </TableCell>
                      <TableCell className="text-right font-semibold text-gray-900">
                        {item.total_loans || 0}
                        <span className="block text-xs text-gray-500">
                          Loans
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Highest Credit Score Holders */}
        <Card className="overflow-hidden rounded-lg border-gray-200 bg-white">
          <CardHeader className="border-b border-gray-200 pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">
              Highest credit score holders
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {isTopScoresLoading ? (
              <div className="p-4 space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="flex items-center gap-x-4">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton className="h-4 w-20" />
                  </div>
                ))}
              </div>
            ) : (
              <Table>
                <TableBody>
                  {topRankingCreditScores?.slice(0, 5).map((item, rowIndex) => (
                    <TableRow key={item.user_id} className="w-full">
                      <TableCell>
                        <div className="flex items-center gap-x-2">
                          <span className="font-semibold text-gray-900">
                            {item.rank}
                          </span>
                          <Image
                            src={
                              rowIndex === 0
                                ? Icon.Minus
                                : rowIndex === 1
                                  ? Icon.ArrowDown
                                  : Icon.ArrowUp
                            }
                            alt="rank indicator"
                            width={16}
                            height={16}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="flex items-center gap-x-2">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-blue-100 text-sm font-semibold text-blue-600">
                            {getUserInitials(item.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {item.username}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {item.email || "-"}
                      </TableCell>
                      <TableCell className="text-right font-semibold text-gray-900">
                        {item.credit_score || 0}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="overflow-hidden rounded-lg border-gray-200 bg-white">
        <CardHeader className="border-b border-gray-200 pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Loan collection summary
          </CardTitle>
        </CardHeader>
        <CardContent className="py-4 w-full h-full">
          <Chart />
        </CardContent>
      </Card>
    </main>
  );
}
