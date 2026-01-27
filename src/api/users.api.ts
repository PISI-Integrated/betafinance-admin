import { api } from "@/lib/axios";
import { CUSTOMER } from "@/lib/constants/config";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useGetCustomersApi = () => {
  return useQuery<ICustomersResponse, Error>({
    queryKey: ["users"],
    queryFn: () => api.get<ICustomersResponse>(CUSTOMER.users),
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

export {
  useGetCustomersApi,
  useGetCustomerAnalyticsApi,
  useGetCustomerActivityApi,
};
