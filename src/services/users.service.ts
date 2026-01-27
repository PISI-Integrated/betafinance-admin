"use client";

import {
  useGetCustomersApi,
  useGetCustomerAnalyticsApi,
  useGetCustomerActivityApi,
} from "@/api/users.api";

const useFetchCustomersService = () => {
  const { data, isLoading, refetch, error } = useGetCustomersApi();

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

export {
  useFetchCustomersService,
  useFetchCustomerAnalyticsService,
  useFetchCustomerActivitiesService,
};
