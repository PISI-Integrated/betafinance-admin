"use client";

import {
  useGetCustomersApi,
  useGetCustomerAnalyticsApi,
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

export { useFetchCustomersService, useFetchCustomerAnalyticsService };
