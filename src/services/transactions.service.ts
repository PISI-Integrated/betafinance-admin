import { useGetAllTransactionsApi } from "@/api/transactions.api";

const useFetchAllTransactionsService = (params?: ITransactionParamsDto) => {
  const {
    data: transactionData,
    isLoading: transactionLoading,
    error: transactionError,
  } = useGetAllTransactionsApi(params);

  return {
    transactionData,
    transactionLoading,
    transactionError,
  };
};

export default useFetchAllTransactionsService;
