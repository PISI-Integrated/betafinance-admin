"use client";
import { Chart } from "@/components/Chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useFetchOverviewService,
  useFetchTopRankingCreditScoresService,
  useFetchTopRankingLendersService,
} from "@/services/analytics.service";
import { KPICards } from "@/components/dashboard/KPICards";
import { RankingSection } from "@/components/dashboard/RankingSection";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";

export default function Home() {
  const { overviewData, isOverviewLoading } = useFetchOverviewService();
  const { topRankingLenders, isTopLendersLoading } =
    useFetchTopRankingLendersService();
  const { topRankingCreditScores, isTopScoresLoading } =
    useFetchTopRankingCreditScoresService();

  return (
    <main className="space-y-6">
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

      {/* Comparison Charts */}
      <DashboardCharts />

      {/* Chart */}
      <Card className="overflow-hidden rounded-lg border-gray-200 bg-white shadow-none">
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
