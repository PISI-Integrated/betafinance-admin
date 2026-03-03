"use client";

import {
  useGetCustomersApi,
  useGetCustomerAnalyticsApi,
  useGetCustomerActivityApi,
  useGetCustomerDocumentsApi,
  useUpdateDocsStatusApi,
  useSuspendUserApi,
  useGenerateDocsDownloadLinkApi,
} from "@/api/users.api";
import { queryClient } from "@/lib/query/queryClient";
import toast from "react-hot-toast";

const useFetchCustomersService = (params?: ICustomersParamsDto) => {
  const { data, isLoading, refetch, error } = useGetCustomersApi(params);

  return {
    allCustomers: data,
    isCustomersLoading: isLoading,
    refetchCustomers: refetch,
    error,
  };
};

const useFetchCustomerAnalyticsService = (userId: string) => {
  const { data, isLoading, refetch } = useGetCustomerAnalyticsApi(userId);

  return {
    customer: data,
    isCustomerLoading: isLoading,
    refetchCustomer: refetch,
  };
};

const useFetchCustomerActivitiesService = (
  userId: string,
  params?: ICustomerActivityParamsDto,
) => {
  const { data, isLoading, refetch } = useGetCustomerActivityApi(
    userId,
    params,
  );

  return {
    customerActivity: data,
    isActivityLoading: isLoading,
    refetchActivities: refetch,
  };
};

const useFetchCustomerDocsService = (
  userId: string,
  params?: ICustomerDocsParamsDto,
) => {
  const { data, isLoading, refetch } = useGetCustomerDocumentsApi(
    userId,
    params,
  );

  return {
    customerDocs: data,
    isDocsLoading: isLoading,
    refetchDocs: refetch,
  };
};

const useUpdateCustomerDocsService = (userId: string, docsId: string) => {
  const { mutateAsync, isPending } = useUpdateDocsStatusApi(userId, docsId);

  const updateDocsStatus = (body: updateDocsStatusDto) => {
    mutateAsync(body, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["documents"] });
        toast.success(`Change Document status to "${body.status}"`);
      },

      onError: () => {
        toast.error(`Document status change to "${body.status}" failed`);
      },
    });
  };

  return {
    updateDocsStatus,
    isDocsLoading: isPending,
  };
};

const useSuspendCustomerService = (userId: string) => {
  const { mutateAsync, isPending } = useSuspendUserApi(userId);

  const suspendUser = (body: ISuspendUserDto, onComplete: () => void) => {
    mutateAsync(body, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        toast.success(`User suspended successfully`);
        onComplete();
      },

      onError: () => {
        toast.error(`User suspension failed`);
      },
    });
  };

  return {
    suspendUser,
    isSuspendLoading: isPending,
  };
};

const useGenerateDocsDownloadLinkService = (file_url: string) => {
  const { mutateAsync, isPending } = useGenerateDocsDownloadLinkApi(file_url);

  const generateDocsDownloadLink = async () => {
    return await mutateAsync();
  };

  return {
    generateDocsDownloadLink,
    isGenerateDocsDownloadLinkLoading: isPending,
  };
};

export {
  useFetchCustomersService,
  useFetchCustomerAnalyticsService,
  useFetchCustomerActivitiesService,
  useFetchCustomerDocsService,
  useUpdateCustomerDocsService,
  useSuspendCustomerService,
  useGenerateDocsDownloadLinkService,
};
