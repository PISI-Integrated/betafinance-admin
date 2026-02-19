"use client";
import {
  useGetOverviewsApi,
  useGetTopRankingLendersApi,
  useGetTopRankingCreditScoresApi,
  useGetRecentActivityApi,
  useGetMonthlyTrendApi,
  useGetLoanCollectionSummaryApi,
} from "@/api/analytics.api";

const useFetchOverviewService = () => {
  const { data, isLoading, refetch } = useGetOverviewsApi();

  return {
    overviewData: data,
    isOverviewLoading: isLoading,
    refetchOverview: refetch,
  };
};

const useFetchTopRankingLendersService = () => {
  const { data, isLoading, refetch } = useGetTopRankingLendersApi();

  return {
    topRankingLenders: data,
    isTopLendersLoading: isLoading,
    refetchTopLenders: refetch,
  };
};

const useFetchTopRankingCreditScoresService = () => {
  const { data, isLoading, refetch } = useGetTopRankingCreditScoresApi();

  return {
    topRankingCreditScores: data,
    isTopScoresLoading: isLoading,
    refetchTopScores: refetch,
  };
};

const useFetchRecentActivityService = (params?: { limit: number }) => {
  const { data, isLoading, refetch } = useGetRecentActivityApi(params);

  return {
    recentActivity: data,
    isRecentActivityLoading: isLoading,
    refetchRecentActivity: refetch,
  };
};

const useFetchMonthlyTrendService = (params?: { months: number }) => {
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
