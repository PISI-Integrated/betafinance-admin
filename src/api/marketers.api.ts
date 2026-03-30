import { api } from "@/lib/axios";
import { MARKETERS } from "@/lib/constants/config";
import { useQuery, keepPreviousData, useMutation } from "@tanstack/react-query";

const useGetMarketersListApi = (params?: IMarketerParamsDto) => {
  return useQuery<IMarketerResponse, ICustomError>({
    queryKey: ["marketers", "list", params],
    queryFn: () => api.get<IMarketerResponse>(MARKETERS.list, params),
    placeholderData: keepPreviousData,
  });
};

const useGetSingleMarketerApi = (marketerId: string) => {
  return useQuery<IMarketerResponse["items"][number], ICustomError>({
    queryKey: ["marketer", marketerId],
    queryFn: () =>
      api.get<IMarketerResponse["items"][number]>(MARKETERS.action(marketerId)),
    placeholderData: keepPreviousData,
  });
};

const useCreateMarketerApi = () => {
  return useMutation<string, ICustomError, ICreateMarketerDto>({
    mutationFn: (body) => api.post(MARKETERS.create, body),
  });
};

const useUpdateMarketerApi = (marketerId: string) => {
  return useMutation<string, ICustomError, ICreateMarketerDto>({
    mutationFn: (body) => api.patch(MARKETERS.action(marketerId), body),
  });
};

const useDeleteMarketerApi = (marketerId: string) => {
  return useMutation<string, ICustomError, void>({
    mutationFn: () => api.delete(MARKETERS.action(marketerId)),
  });
};

export {
  useGetMarketersListApi,
  useGetSingleMarketerApi,
  useCreateMarketerApi,
  useUpdateMarketerApi,
  useDeleteMarketerApi,
};
