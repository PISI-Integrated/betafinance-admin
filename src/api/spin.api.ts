import { api } from "@/lib/axios";
import { SPIN } from "@/lib/constants/config";
import { useQuery, keepPreviousData, useMutation } from "@tanstack/react-query";

const useGetSpinHistoryApi = (params?: ISpinHistoryParamsDto) => {
  return useQuery<ISpinHistoryResponse, ICustomError>({
    queryKey: ["spin", "history", params],
    queryFn: () => api.get<ISpinHistoryResponse>(SPIN.history, params),
    placeholderData: keepPreviousData,
  });
};

const useGetSpinRewardsApi = (params?: ISpinRewardsParamsDto) => {
  return useQuery<ISpinRewardsResponse, ICustomError>({
    queryKey: ["spin", "rewards", params],
    queryFn: () => api.get<ISpinRewardsResponse>(SPIN.rewards, params),
    placeholderData: keepPreviousData,
  });
};

const useGetSpinRewardStats = () => {
  return useQuery<ISpinRewardStatsResponse, ICustomError>({
    queryKey: ["spin", "rewards", "stats"],
    queryFn: () => api.get<ISpinRewardStatsResponse>(SPIN.rewardStats),
  });
};

const useGetSingleSpinRewardsApi = (rewardId: string) => {
  return useQuery<SpinRewardItem, ICustomError>({
    queryKey: ["spin", "reward", rewardId],
    queryFn: () => api.get<SpinRewardItem>(SPIN.rewardByID(rewardId)),
    enabled: !!rewardId,
  });
};

const useCreateRewardApi = () => {
  return useMutation<SpinRewardItem, ICustomError, IRewardDto>({
    mutationFn: (body) => api.post(SPIN.createReward, body),
  });
};

const useUpdateRewardApi = () => {
  return useMutation<
    SpinRewardItem,
    ICustomError,
    { id: string; body: IRewardDto }
  >({
    mutationFn: ({ id, body }) => api.put(SPIN.rewardByID(id), body),
  });
};

export {
  useGetSpinHistoryApi,
  useUpdateRewardApi,
  useCreateRewardApi,
  useGetSpinRewardsApi,
  useGetSingleSpinRewardsApi,
  useGetSpinRewardStats,
};
