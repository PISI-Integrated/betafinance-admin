import { api } from "@/lib/axios";
import { TRANSACTIONS } from "@/lib/constants/config";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useGetAllTransactionsApi = (params?: ITransactionParamsDto) => {
  return useQuery<ITransactionListResponse, Error>({
    queryKey: ["transactions", "list", params],
    queryFn: () => api.get<ITransactionListResponse>(TRANSACTIONS.list, params),
    placeholderData: keepPreviousData,
  });
};

export { useGetAllTransactionsApi };
