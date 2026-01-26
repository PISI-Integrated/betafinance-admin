"use client";
import {
  useGetOverviewsApi,
  useGetTopRankingLendersApi,
  useGetTopRankingCreditScoresApi,
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

export {
  useFetchOverviewService,
  useFetchTopRankingLendersService,
  useFetchTopRankingCreditScoresService,
};
