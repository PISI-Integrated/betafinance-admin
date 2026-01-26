import { api } from "@/lib/axios";
import { ANALYTICS } from "@/lib/constants/config";
import { useQuery } from "@tanstack/react-query";

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
export {
  useGetOverviewsApi,
  useGetTopRankingLendersApi,
  useGetTopRankingCreditScoresApi,
};
