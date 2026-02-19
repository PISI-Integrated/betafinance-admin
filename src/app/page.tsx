"use client";
import { Chart } from "@/components/Chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useFetchLoanCollectionSummaryService,
  useFetchOverviewService,
  useFetchRecentActivityService,
  useFetchTopRankingCreditScoresService,
  useFetchTopRankingLendersService,
} from "@/services/analytics.service";
import { KPICards } from "@/components/dashboard/KPICards";
import { RankingSection } from "@/components/dashboard/RankingSection";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import { RecentActivity } from "@/components/dashboard/RecentActivity";

import { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { months, years } from "@/lib/constants/data";

export default function Home() {
  const [period, setPeriod] =
    useState<ILoanCollectionSummaryDto["period"]>("month");
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const { overviewData, isOverviewLoading } = useFetchOverviewService();
  const { topRankingLenders, isTopLendersLoading } =
    useFetchTopRankingLendersService();
  const { topRankingCreditScores, isTopScoresLoading } =
    useFetchTopRankingCreditScoresService();

  const { recentActivity, isRecentActivityLoading } =
    useFetchRecentActivityService();

  const loanCollectionParams = useMemo(
    () => ({
      period,
      year,
      ...(period === "day" && { month }),
    }),
    [period, year, month],
  );

  const { loanCollectionSummary, isLoanCollectionSummaryLoading } =
    useFetchLoanCollectionSummaryService(loanCollectionParams);

  return (
    <main className="space-y-6 pb-10">
      {/* KPI Cards */}
      <KPICards
        overviewData={overviewData}
        isOverviewLoading={isOverviewLoading}
      />
      {/* Top Rankings and Credit Score */}
      <RankingSection
        topRankingLenders={topRankingLenders}
        isTopLendersLoading={isTopLendersLoading}
        topRankingCreditScores={topRankingCreditScores}
        isTopScoresLoading={isTopScoresLoading}
      />
      <DashboardCharts />
      {/* Recent Activity */}
      <RecentActivity
        recentActivity={recentActivity}
        isLoading={isRecentActivityLoading}
      />
      {/* Chart */}
      <Card className="overflow-hidden rounded-lg border-gray-200 bg-white shadow-none">
        <CardHeader className="border-b border-gray-200 pb-4 flex flex-row flex-wrap gap-5 items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Loan collection summary
          </CardTitle>
          <div className="flex items-center gap-3">
            <Select value={period} onValueChange={(v: any) => setPeriod(v)}>
              <SelectTrigger className="w-[120px] h-9">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Daily</SelectItem>
                <SelectItem value="month">Monthly</SelectItem>
                <SelectItem value="year">Yearly</SelectItem>
              </SelectContent>
            </Select>

            {period === "day" && (
              <Select
                value={month.toString()}
                onValueChange={(v) => setMonth(parseInt(v))}
              >
                <SelectTrigger className="w-[130px] h-9">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((m) => (
                    <SelectItem key={m.value} value={m.value.toString()}>
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            <Select
              value={year.toString()}
              onValueChange={(v) => setYear(parseInt(v))}
            >
              <SelectTrigger className="w-[100px] h-9">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((y) => (
                  <SelectItem key={y} value={y.toString()}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="py-4 w-full h-full">
          <Chart
            data={loanCollectionSummary?.data}
            isLoading={isLoanCollectionSummaryLoading}
            period={period}
          />
        </CardContent>
      </Card>
    </main>
  );
}
