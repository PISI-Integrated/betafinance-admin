import { api } from "@/lib/axios";
import { CUSTOMER } from "@/lib/constants/config";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

const useGetCustomersApi = (params?: ICustomersParamsDto) => {
  return useQuery<ICustomersResponse, ICustomError>({
    queryKey: ["users", params],
    queryFn: () => api.get<ICustomersResponse>(CUSTOMER.users, params),
    placeholderData: keepPreviousData,
  });
};

const useGetCustomerAnalyticsApi = (userId: string) => {
  return useQuery<ICustomerAnalyticsResponse, ICustomError>({
    queryKey: ["user", userId],
    queryFn: () =>
      api.get<ICustomerAnalyticsResponse>(CUSTOMER.userAnalytics(userId)),
    enabled: !!userId,
  });
};

const useGetCustomerActivityApi = (
  userId: string,
  params?: ICustomerActivityParamsDto,
) => {
  return useQuery<ICustomerActivityResponse[], ICustomError>({
    queryKey: ["activity", userId, params],
    queryFn: () =>
      api.get<ICustomerActivityResponse[]>(
        CUSTOMER.userActivitiess(userId),
        params,
      ),
    enabled: !!userId,
    placeholderData: keepPreviousData,
  });
};

const useGetCustomerDocumentsApi = (
  userId: string,
  params?: ICustomerDocsParamsDto,
) => {
  return useQuery<ICustomerDocument[], ICustomError>({
    queryKey: ["documents", userId, params],
    queryFn: () =>
      api.get<ICustomerDocument[]>(CUSTOMER.userDocuments(userId), params),
    enabled: !!userId,
    placeholderData: keepPreviousData,
  });
};

const useUpdateDocsStatusApi = (userId: string) => {
  return useMutation<
    string,
    ICustomError,
    updateDocsStatusDto & { docsId: string }
  >({
    mutationFn: ({ docsId, ...body }) =>
      api.patch(CUSTOMER.updateUserDocuments(userId, docsId), body),
  });
};

const useSuspendUserApi = (userId: string) => {
  return useMutation<string, ICustomError, ISuspendUserDto>({
    mutationFn: (body) => api.patch(CUSTOMER.suspendUser(userId), body),
  });
};

const useGenerateDocsDownloadLinkApi = (file_url: string) => {
  return useMutation<{ presigned_url: string }, ICustomError, void>({
    mutationFn: () =>
      api.get<{ presigned_url: string }>(
        CUSTOMER.generateDocsDownloadLink(file_url),
      ),
  });
};

export {
  useGetCustomersApi,
  useGetCustomerAnalyticsApi,
  useGetCustomerActivityApi,
  useGetCustomerDocumentsApi,
  useUpdateDocsStatusApi,
  useSuspendUserApi,
  useGenerateDocsDownloadLinkApi,
};
