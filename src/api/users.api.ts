import { api } from "@/lib/axios";
import { CUSTOMER } from "@/lib/constants/config";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

const useGetCustomersApi = (params?: ICustomersParamsDto) => {
  return useQuery<ICustomersResponse, Error>({
    queryKey: ["users", params],
    queryFn: () => api.get<ICustomersResponse>(CUSTOMER.users, params),
    placeholderData: keepPreviousData,
  });
};

const useGetCustomerAnalyticsApi = (userId: string) => {
  return useQuery<ICustomerAnalyticsResponse, Error>({
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
  return useQuery<ICustomerActivityResponse[], Error>({
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
  return useQuery<ICustomerDocument[], Error>({
    queryKey: ["documents", userId, params],
    queryFn: () =>
      api.get<ICustomerDocument[]>(CUSTOMER.userDocuments(userId), params),
    enabled: !!userId,
    placeholderData: keepPreviousData,
  });
};

const useUpdateDocsStatusApi = (userId: string, docsId: string) => {
  return useMutation<string, Error, updateDocsStatusDto>({
    mutationFn: (body) =>
      api.patch(CUSTOMER.updateUserDocuments(userId, docsId), body),
  });
};

export {
  useGetCustomersApi,
  useGetCustomerAnalyticsApi,
  useGetCustomerActivityApi,
  useGetCustomerDocumentsApi,
  useUpdateDocsStatusApi,
};
