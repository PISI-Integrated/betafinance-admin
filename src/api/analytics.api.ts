import { api } from "@/lib/axios";
import { ANALYTICS } from "@/lib/constants/config";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useGetOverviewsApi = () => {
  return useQuery<IOverviewResponse, Error>({
    queryKey: ["analytics", "overview"],
    queryFn: () => api.get<IOverviewResponse>(ANALYTICS.overview),
  });
};

const useGetTopRankingLendersApi = () => {
  return useQuery<ITopRankssResponse, Error>({
    queryKey: ["analytics", "top-lenders"],
    queryFn: () => api.get<ITopRankssResponse>(ANALYTICS.topRankLenders),
  });
};

const useGetTopRankingCreditScoresApi = () => {
  return useQuery<ITopRankssResponse, Error>({
    queryKey: ["analytics", "top-credit"],
    queryFn: () => api.get<ITopRankssResponse>(ANALYTICS.topRankCreditScores),
  });
};

const useGetRecentActivityApi = (params?: { limit: number }) => {
  return useQuery<IRecentActivityResponse, Error>({
    queryKey: ["analytics", "recent-activity", params],
    queryFn: () =>
      api.get<IRecentActivityResponse>(ANALYTICS.recentActivity, params),
    placeholderData: keepPreviousData,
  });
};

const useGetMonthlyTrendApi = (params?: { months: number }) => {
  return useQuery<IMonthlyTrendResponse, Error>({
    queryKey: ["analytics", "monthly-trends", params],
    queryFn: () =>
      api.get<IMonthlyTrendResponse>(ANALYTICS.monthlyTrends, params),
    placeholderData: keepPreviousData,
  });
};

const useGetLoanCollectionSummaryApi = (params: ILoanCollectionSummaryDto) => {
  return useQuery<ILoanCollectionSummaryResponse, Error>({
    queryKey: ["analytics", "loan-collection", params],
    queryFn: () =>
      api.get<ILoanCollectionSummaryResponse>(ANALYTICS.loanSummary, params),
    placeholderData: keepPreviousData,
  });
};

export {
  useGetOverviewsApi,
  useGetTopRankingLendersApi,
  useGetTopRankingCreditScoresApi,
  useGetRecentActivityApi,
  useGetMonthlyTrendApi,
  useGetLoanCollectionSummaryApi,
};
