import { useGetLoansApi, useGetLoansCountApi } from "@/api/loans.api";

const useFetchAllLoansService = (params?: ILoansParamsDto) => {
  const { data, isLoading, refetch } = useGetLoansApi(params);

  return {
    allLoans: data,
    isLoansLoading: isLoading,
    refetchLoans: refetch,
  };
};

const useFetchLoansCountService = (params?: ILoansParamsDto) => {
  const { data, isLoading, refetch } = useGetLoansCountApi(params);

  return {
    LoanCount: data,
    isLoanCountLoading: isLoading,
    refetchLoanCount: refetch,
  };
};

export { useFetchAllLoansService, useFetchLoansCountService };
