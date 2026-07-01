import { api } from "@/lib/axios";
import { ANALYTICS } from "@/lib/constants/config";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useGetOverviewsApi = (params?: IOverviewParamsDto) => {
  return useQuery<IOverviewResponse, Error>({
    queryKey: ["analytics", "overview", params],
    queryFn: () => api.get<IOverviewResponse>(ANALYTICS.overview, params),
    placeholderData: keepPreviousData,
  });
};

const useGetTopRankingLendersApi = (params?: { region?: regionType }) => {
  return useQuery<ITopRankssResponse, Error>({
    queryKey: ["analytics", "top-lenders", params],
    queryFn: () => api.get<ITopRankssResponse>(ANALYTICS.topRankLenders, params),
  });
};

const useGetTopRankingCreditScoresApi = (params?: { region?: regionType }) => {
  return useQuery<ITopRankssResponse, Error>({
    queryKey: ["analytics", "top-credit", params],
    queryFn: () => api.get<ITopRankssResponse>(ANALYTICS.topRankCreditScores, params),
  });
};

const useGetRecentActivityApi = (params?: { limit?: number; region?: regionType }) => {
  return useQuery<IRecentActivityResponse, Error>({
    queryKey: ["analytics", "recent-activity", params],
    queryFn: () =>
      api.get<IRecentActivityResponse>(ANALYTICS.recentActivity, params),
    placeholderData: keepPreviousData,
  });
};

const useGetMonthlyTrendApi = (params?: { months?: number; region?: regionType }) => {
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
