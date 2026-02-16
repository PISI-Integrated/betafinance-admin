import {
  useGetLoansApi,
  useGetLoansCountApi,
  useGetTotalLoansAmountApi,
} from "@/api/loans.api";

const useFetchAllLoansService = (params?: ILoansParamsDto) => {
  const { data, isLoading, refetch } = useGetLoansApi(params);

  return {
    allLoans: data,
    isLoansLoading: isLoading,
    refetchLoans: refetch,
  };
};

const useFetchTotalLoansAmountService = (params?: ILoansParamsDto) => {
  const { data, isLoading, refetch } = useGetTotalLoansAmountApi(params);

  return {
    totalLoansAmount: data,
    isTotalLoansAmountLoading: isLoading,
    refetchTotalLoansAmount: refetch,
  };
};

const useFetchLoansCountService = (params?: ILoansParamsDto) => {
  const { data, isLoading, refetch } = useGetLoansCountApi(params);

  return {
    loanCount: data,
    isLoanCountLoading: isLoading,
    refetchLoanCount: refetch,
  };
};

export {
  useFetchAllLoansService,
  useFetchTotalLoansAmountService,
  useFetchLoansCountService,
};
