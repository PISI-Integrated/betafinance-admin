import { api } from "@/lib/axios";
import { ADMIN } from "@/lib/constants/config";
import { useQuery, keepPreviousData, useMutation } from "@tanstack/react-query";

const useGetAdminListApi = (params: IPaginationParamsDto) => {
  return useQuery<IAdminListResponse, Error>({
    queryKey: ["admin", "list", params],
    queryFn: () => api.get<IAdminListResponse>(ADMIN.list, params),
    placeholderData: keepPreviousData,
  });
};

const useInviteAdminApi = () => {
  return useMutation<string, Error, IInviteAdminDto>({
    mutationFn: (body) => api.post(ADMIN.invite, body),
  });
};

export { useGetAdminListApi, useInviteAdminApi };
