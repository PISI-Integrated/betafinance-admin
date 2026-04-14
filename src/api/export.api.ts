import { api } from "@/lib/axios";
import { EXPORT } from "@/lib/constants/config";
import { useMutation } from "@tanstack/react-query";

const useExportOverviewApi = () => {
  return useMutation<
    Blob | MediaSource,
    ICustomError,
    IExportParamsDto | undefined
  >({
    mutationKey: ["export", "overview"],
    mutationFn: (params) => api.getBlob(EXPORT.overview, params),
  });
};

const useExportMonthlyTrendsApi = () => {
  return useMutation<
    Blob | MediaSource,
    ICustomError,
    IExportParamsDto | undefined
  >({
    mutationKey: ["export", "monthly-trends"],
    mutationFn: (params) => api.getBlob(EXPORT.monthlyTrends, params),
  });
};

const useExportUserStatsApi = () => {
  return useMutation<
    Blob | MediaSource,
    ICustomError,
    IExportParamsDto | undefined
  >({
    mutationKey: ["export", "user-stats"],
    mutationFn: (params) => api.getBlob(EXPORT.userStats, params),
  });
};

const useExportLoansApi = () => {
  return useMutation<
    Blob | MediaSource,
    ICustomError,
    IExportParamsDto | undefined
  >({
    mutationKey: ["export", "loans"],
    mutationFn: (params) => api.getBlob(EXPORT.loans, params),
  });
};

const useExportUsersApi = () => {
  return useMutation<
    Blob | MediaSource,
    ICustomError,
    IExportParamsDto | undefined
  >({
    mutationKey: ["export", "users"],
    mutationFn: (params) => api.getBlob(EXPORT.users, params),
  });
};

const useExportTransactionsApi = () => {
  return useMutation<
    Blob | MediaSource,
    ICustomError,
    IExportParamsDto | undefined
  >({
    mutationKey: ["export", "transactions"],
    mutationFn: (params) => api.getBlob(EXPORT.transactions, params),
  });
};

export {
  useExportOverviewApi,
  useExportMonthlyTrendsApi,
  useExportUserStatsApi,
  useExportLoansApi,
  useExportUsersApi,
  useExportTransactionsApi,
};
