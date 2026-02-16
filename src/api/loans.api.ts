import { api } from "@/lib/axios";
import { LOAN } from "@/lib/constants/config";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

const useGetLoansApi = (params?: ILoansParamsDto) => {
  return useQuery<ILoansResponse, Error>({
    queryKey: ["loans", params],
    queryFn: () => api.get<ILoansResponse>(LOAN.loans, params),
    placeholderData: keepPreviousData,
  });
};

const useGetTotalLoansAmountApi = (
  params?: Omit<ILoansParamsDto, "size" | "page">,
) => {
  return useQuery<{ amount: number }, Error>({
    queryKey: ["loans", "total", params],
    queryFn: () => api.get<{ amount: number }>(LOAN.loansTotalAmount, params),
    placeholderData: keepPreviousData,
  });
};

const useGetLoansCountApi = (
  params?: Omit<ILoansParamsDto, "size" | "page">,
) => {
  return useQuery<{ count: number }, Error>({
    queryKey: ["loans", "count", params],
    queryFn: () => api.get<{ count: number }>(LOAN.loansCount, params),
    placeholderData: keepPreviousData,
  });
};

export { useGetLoansApi, useGetTotalLoansAmountApi, useGetLoansCountApi };
