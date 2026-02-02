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
  return useQuery<ISpinHistoryResponse, Error>({
    queryKey: ["spin", "rewards", params],
    queryFn: () => api.get<ISpinHistoryResponse>(SPIN.rewards, params),
    placeholderData: keepPreviousData,
  });
};

const useGetSingleSpinRewardsApi = (rewardId: string) => {
  return useQuery<ISpinHistoryResponse, Error>({
    queryKey: ["spin", "reward", rewardId],
    queryFn: () => api.get<ISpinHistoryResponse>(SPIN.rewardByID(rewardId)),
    enabled: !!rewardId,
  });
};

const useCreateRewardApi = () => {
  return useMutation<string, Error, IRewardDto>({
    mutationFn: (body) => api.patch(SPIN.createReward, body),
  });
};

const useUpdateRewardApi = (rewardId: string) => {
  return useMutation<string, Error, IRewardDto>({
    mutationFn: (body) => api.patch(SPIN.rewardByID(rewardId), body),
  });
};

export {
  useGetSpinHistoryApi,
  useUpdateRewardApi,
  useCreateRewardApi,
  useGetSpinRewardsApi,
  useGetSingleSpinRewardsApi,
};
