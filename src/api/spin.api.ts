import { api } from "@/lib/axios";
import { SPIN } from "@/lib/constants/config";
import { useQuery, keepPreviousData, useMutation } from "@tanstack/react-query";

const useGetSpinHistoryApi = (params?: ISpinHistoryParamsDto) => {
  return useQuery<ISpinHistoryResponse, Error>({
    queryKey: ["spin", "history", params],
    queryFn: () => api.get<ISpinHistoryResponse>(SPIN.history, params),
    placeholderData: keepPreviousData,
  });
};

const useGetSpinRewardsApi = (params?: ISpinRewardsParamsDto) => {
  return useQuery<ISpinRewardsResponse, Error>({
    queryKey: ["spin", "rewards", params],
    queryFn: () => api.get<ISpinRewardsResponse>(SPIN.rewards, params),
    placeholderData: keepPreviousData,
  });
};

const useGetSpinRewardStats = () => {
  return useQuery<ISpinRewardStatsResponse, Error>({
    queryKey: ["spin", "rewards", "stats"],
    queryFn: () => api.get<ISpinRewardStatsResponse>(SPIN.rewardStats),
  });
};

const useGetSingleSpinRewardsApi = (rewardId: string) => {
  return useQuery<SpinRewardItem, Error>({
    queryKey: ["spin", "reward", rewardId],
    queryFn: () => api.get<SpinRewardItem>(SPIN.rewardByID(rewardId)),
    enabled: !!rewardId,
  });
};

const useCreateRewardApi = () => {
  return useMutation<SpinRewardItem, Error, IRewardDto>({
    mutationFn: (body) => api.post(SPIN.createReward, body),
  });
};

const useUpdateRewardApi = () => {
  return useMutation<SpinRewardItem, Error, { id: string; body: IRewardDto }>({
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
