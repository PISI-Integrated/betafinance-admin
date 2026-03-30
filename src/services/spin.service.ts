import {
  useCreateRewardApi,
  useGetSingleSpinRewardsApi,
  useGetSpinHistoryApi,
  useGetSpinRewardsApi,
  useGetSpinRewardStats,
  useUpdateRewardApi,
} from "@/api/spin.api";
import { queryClient } from "@/lib/query/queryClient";
import toast from "react-hot-toast";

const useFetchSpinHistoryService = (params?: ISpinHistoryParamsDto) => {
  const { data, isLoading, refetch, error } = useGetSpinHistoryApi(params);

  return {
    spinHistories: data,
    isHistoriesLoading: isLoading,
    refetchHistories: refetch,
    spinHistoriesError: error,
  };
};

const useFetchSpinRewardsService = (params?: ISpinRewardsParamsDto) => {
  const { data, isLoading, refetch, error } = useGetSpinRewardsApi(params);

  return {
    spinRewards: data,
    isRewardsLoading: isLoading,
    refetchRewards: refetch,
    spinRewardsError: error,
  };
};

const useFetchSingleSpinRewardService = (rewardId: string) => {
  const { data, isLoading, refetch, error } =
    useGetSingleSpinRewardsApi(rewardId);

  return {
    spinReward: data,
    isRewardLoading: isLoading,
    refetchReward: refetch,
    spinRewardError: error,
  };
};

const useFetchSpinRewardStatsService = () => {
  const { data, isLoading, refetch, error } = useGetSpinRewardStats();

  return {
    spinRewardStats: data,
    isRewardStatsLoading: isLoading,
    refetchRewardStats: refetch,
    spinRewardStatsError: error,
  };
};

const useUpdateRewardService = () => {
  const { mutateAsync, isPending } = useUpdateRewardApi();

  const updateReward = (id: string, body: IRewardDto) => {
    mutateAsync(
      { id, body },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["spin", "rewards"] });
          toast.success(`Spin reward updated`);
        },

        onError: () => {
          toast.error(`Spin reward update failed`);
        },
      },
    );
  };

  return {
    updateReward,
    isRewardUpdateLoading: isPending,
  };
};

const useCreateRewardService = () => {
  const { mutateAsync, isPending } = useCreateRewardApi();

  const createReward = (body: IRewardDto) => {
    mutateAsync(body, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["spin", "rewards"] });
        toast.success(`Spin reward created`);
      },

      onError: () => {
        toast.success(`Spin reward creation failed`);
      },
    });
  };

  return {
    createReward,
    isRewardCreateLoading: isPending,
  };
};

export {
  useFetchSpinHistoryService,
  useUpdateRewardService,
  useFetchSpinRewardsService,
  useFetchSingleSpinRewardService,
  useCreateRewardService,
  useFetchSpinRewardStatsService,
};
