"use client";
import {
  useGetOverviewsApi,
  useGetTopRankingLendersApi,
  useGetTopRankingCreditScoresApi,
  useGetRecentActivityApi,
  useGetMonthlyTrendApi,
  useGetLoanCollectionSummaryApi,
} from "@/api/analytics.api";

const useFetchOverviewService = (params?: IOverviewParamsDto) => {
  const { data, isLoading, refetch } = useGetOverviewsApi(params);

  return {
    overviewData: data,
    isOverviewLoading: isLoading,
    refetchOverview: refetch,
  };
};

const useFetchTopRankingLendersService = (params?: { region?: regionType }) => {
  const { data, isLoading, refetch } = useGetTopRankingLendersApi(params);

  return {
    topRankingLenders: data,
    isTopLendersLoading: isLoading,
    refetchTopLenders: refetch,
  };
};

const useFetchTopRankingCreditScoresService = (params?: { region?: regionType }) => {
  const { data, isLoading, refetch } = useGetTopRankingCreditScoresApi(params);

  return {
    topRankingCreditScores: data,
    isTopScoresLoading: isLoading,
    refetchTopScores: refetch,
  };
};

const useFetchRecentActivityService = (params?: { limit?: number; region?: regionType }) => {
  const { data, isLoading, refetch } = useGetRecentActivityApi(params);

  return {
    recentActivity: data,
    isRecentActivityLoading: isLoading,
    refetchRecentActivity: refetch,
  };
};

const useFetchMonthlyTrendService = (params?: { months?: number; region?: regionType }) => {
  const { data, isLoading, refetch } = useGetMonthlyTrendApi(params);

  return {
    monthlyTrend: data,
    isMonthlyTrendLoading: isLoading,
    refetchMonthlyTrend: refetch,
  };
};

const useFetchLoanCollectionSummaryService = (
  params: ILoanCollectionSummaryDto,
) => {
  const { data, isLoading, refetch } = useGetLoanCollectionSummaryApi(params);

  return {
    loanCollectionSummary: data,
    isLoanCollectionSummaryLoading: isLoading,
    refetchLoanCollectionSummary: refetch,
  };
};

export {
  useFetchOverviewService,
  useFetchTopRankingLendersService,
  useFetchTopRankingCreditScoresService,
  useFetchRecentActivityService,
  useFetchMonthlyTrendService,
  useFetchLoanCollectionSummaryService,
};
