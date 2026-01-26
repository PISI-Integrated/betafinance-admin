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
import { cn } from "@/lib/utils";
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
          content: formatCurrencyWithHash(
            overviewData.total_transaction_volume,
          ),
          footer: formatCurrency(overviewData.volume_this_month),
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
          title: "Average Credit Score",
          content: formatNumber(overviewData.average_credit_score),
          footer: "",
        },
      ]
    : [];

  return (
    <main className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 rounded border border-[#E5E7EB] bg-white md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {isOverviewLoading
          ? // Loading skeletons
            Array.from({ length: 5 }).map((_, index) => (
              <Card
                key={index}
                className={cn(
                  "border-y-0 border-l-0 rounded-none bg-white",
                  "border-r-0",
                  "border-b-[#E5E7EB]",
                  index !== 4 && "border-b",
                  index === 4 && "border-b-0",
                  "md:border-r-[#E5E7EB] md:border-r md:border-b-0",
                  (index + 1) % 2 === 0 && "md:border-r-0",
                  index < 3 && "md:border-b-[#E5E7EB] md:border-b",
                  "lg:border-b-0 lg:border-r-[#E5E7EB] lg:border-r",
                  index === 4 && "border-0 md:border-0 lg:border-0",
                )}
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
                className={cn(
                  "border-y-0 border-l-0 rounded-none bg-white",
                  "border-r-0",
                  "border-b-[#E5E7EB]",
                  index !== kpiCards.length - 1 && "border-b",
                  index === kpiCards.length - 1 && "border-b-0",
                  "md:border-r-[#E5E7EB] md:border-r md:border-b-0",
                  (index + 1) % 2 === 0 && "md:border-r-0",
                  index < kpiCards.length - 2 &&
                    "md:border-b-[#E5E7EB] md:border-b",
                  "lg:border-b-0 lg:border-r-[#E5E7EB] lg:border-r",
                  index === kpiCards.length - 1 &&
                    "border-0 md:border-0 lg:border-0",
                )}
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
        <CardContent className="p-6 w-full h-[400px]">
          <Chart />
        </CardContent>
      </Card>
    </main>
  );
}
