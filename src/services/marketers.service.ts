import {
  useCreateMarketerApi,
  useDeleteMarketerApi,
  useGetMarketersListApi,
  useGetSingleMarketerApi,
  useUpdateMarketerApi,
} from "@/api/marketers.api";
import { queryClient } from "@/lib/query/queryClient";
import toast from "react-hot-toast";

const useFetchMarketersService = (params?: IMarketerParamsDto) => {
  const { data, isLoading, error } = useGetMarketersListApi(params);

  return {
    marketers: data,
    isMarketersLoading: isLoading,
    marketersError: error,
  };
};

const useFetchSingleMarketerService = (marketerId: string) => {
  const { data, isLoading, error } = useGetSingleMarketerApi(marketerId);

  return {
    marketer: data,
    isMarketerLoading: isLoading,
    marketerError: error,
  };
};

const useCreateMarketerService = () => {
  const { mutateAsync, isPending, error } = useCreateMarketerApi();

  const createMarketer = async (body: ICreateMarketerDto) => {
    return await mutateAsync(body, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["marketers"] });
        toast.success("Marketer created successfully");
      },
      onError: () => {
        toast.error("Failed to create marketer");
      },
    });
  };

  return {
    createMarketer,
    isMarketerLoading: isPending,
    marketerError: error,
  };
};

const useUpdateMarketerService = (marketerId: string) => {
  const { mutateAsync, isPending, error } = useUpdateMarketerApi(marketerId);

  const updateMarketer = async (body: ICreateMarketerDto) => {
    return await mutateAsync(body, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["marketers"] });
        queryClient.invalidateQueries({ queryKey: ["marketer", marketerId] });
        toast.success("Marketer updated successfully");
      },
      onError: () => {
        toast.error("Failed to update marketer");
      },
    });
  };

  return {
    updateMarketer,
    isMarketerLoading: isPending,
    marketerError: error,
  };
};

const useDeleteMarketerService = (marketerId: string) => {
  const { mutateAsync, isPending, error } = useDeleteMarketerApi(marketerId);

  const deleteMarketer = async () => {
    return await mutateAsync(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["marketers"] });
        toast.success("Marketer deleted successfully");
      },
      onError: () => {
        toast.error("Failed to delete marketer");
      },
    });
  };

  return {
    deleteMarketer,
    isMarketerLoading: isPending,
    marketerError: error,
  };
};

export {
  useFetchMarketersService,
  useFetchSingleMarketerService,
  useCreateMarketerService,
  useUpdateMarketerService,
  useDeleteMarketerService,
};
