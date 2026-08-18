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
import { ProviderBalances } from "@/components/dashboard/ProviderBalances";
import { RankingSection } from "@/components/dashboard/RankingSection";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { useSearchParams } from "next/navigation";
import { useState, useMemo, Suspense } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { months, years } from "@/lib/constants/data";
import {
  useFetchProviderBalancesService,
  useFetchWalletBalancesService,
  useFetchWalletService,
} from "@/services/admin.service";

function HomeContent() {
  const searchParams = useSearchParams();
  const startDate = searchParams.get("start_date") || undefined;
  const endDate = searchParams.get("end_date") || undefined;

  const [period, setPeriod] =
    useState<ILoanCollectionSummaryDto["period"]>("month");
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [region, setRegion] = useState<regionType>("all");

  const { overviewData, isOverviewLoading } = useFetchOverviewService({
    start_date: startDate,
    end_date: endDate,
    ...(region !== "all" && { region }),
  });
  const { topRankingLenders, isTopLendersLoading } =
    useFetchTopRankingLendersService({
      ...(region !== "all" && { region }),
    });
  const { topRankingCreditScores, isTopScoresLoading } =
    useFetchTopRankingCreditScoresService({
      ...(region !== "all" && { region }),
    });

  const { recentActivity, isRecentActivityLoading } =
    useFetchRecentActivityService({
      ...(region !== "all" && { region }),
    });

  const loanCollectionParams = useMemo(
    () => ({
      period,
      year,
      ...(period === "day" && { month }),
      ...(region !== "all" && { region }),
    }),
    [period, year, month, region],
  );

  const { loanCollectionSummary, isLoanCollectionSummaryLoading } =
    useFetchLoanCollectionSummaryService(loanCollectionParams);

  const { providerBalances, providerBalancesLoading } =
    useFetchProviderBalancesService();

  const { walletBalances, walletBalancesLoading } =
    useFetchWalletBalancesService();

  return (
    <main className="space-y-6 pb-10">
      <div className="flex justify-end">
        <Select
          value={region}
          onValueChange={(val) => setRegion(val as regionType)}
        >
          <SelectTrigger className="w-[180px] bg-white border-gray-200">
            <SelectValue placeholder="All Regions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            <SelectItem value="NG">Nigeria</SelectItem>
            <SelectItem value="UG">Uganda</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI Cards */}
      <KPICards
        overviewData={overviewData}
        isOverviewLoading={isOverviewLoading}
        region={region}
      />
      {/* Provider Balances */}
      <ProviderBalances
        providerBalances={providerBalances}
        isLoading={providerBalancesLoading}
        walletBalances={walletBalances}
        isWalletLoading={walletBalancesLoading}
      />
      {/* Top Rankings and Credit Score */}
      <RankingSection
        topRankingLenders={topRankingLenders}
        isTopLendersLoading={isTopLendersLoading}
        topRankingCreditScores={topRankingCreditScores}
        isTopScoresLoading={isTopScoresLoading}
      />
      <DashboardCharts region={region} />
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

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
