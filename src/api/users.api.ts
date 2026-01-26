import { api } from "@/lib/axios";
import { CUSTOMER } from "@/lib/constants/config";
import { useQuery } from "@tanstack/react-query";

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

export { useGetCustomersApi, useGetCustomerAnalyticsApi };
