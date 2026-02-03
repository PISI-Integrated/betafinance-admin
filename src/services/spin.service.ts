import {
  useCreateRewardApi,
  useGetSingleSpinRewardsApi,
  useGetSpinHistoryApi,
  useGetSpinRewardsApi,
  useUpdateRewardApi,
} from "@/api/spin.api";
import { queryClient } from "@/lib/query/queryClient";
import toast from "react-hot-toast";

const useFetchSpinHistoryService = (params?: ISpinHistoryParamsDto) => {
  const { data, isLoading, refetch } = useGetSpinHistoryApi(params);

  return {
    spinHistories: data,
    isHistoriesLoading: isLoading,
    refetchHistories: refetch,
  };
};

const useFetchSpinRewardsService = (params?: ISpinRewardsParamsDto) => {
  const { data, isLoading, refetch } = useGetSpinRewardsApi(params);

  return {
    spinRewards: data,
    isRewardsLoading: isLoading,
    refetchRewards: refetch,
  };
};

const useFetchSingleSpinRewardService = (rewardId: string) => {
  const { data, isLoading, refetch } = useGetSingleSpinRewardsApi(rewardId);

  return {
    spinReward: data,
    isRewardLoading: isLoading,
    refetchReward: refetch,
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
      }
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
};
