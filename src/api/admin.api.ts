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

const useResendInviteApi = () => {
  return useMutation<string, Error, { email: string }>({
    mutationFn: (body) => api.post(ADMIN.resendInvite, body),
  });
};

const useGetAdminSettingsApi = () => {
  return useQuery<IAdminSettingsResponse, Error>({
    queryKey: ["admin", "settings"],
    queryFn: () => api.get<IAdminSettingsResponse>(ADMIN.settings),
  });
};

const useUpdateAdminSettingsApi = () => {
  return useMutation<string, Error, IUpdateAdminSettingsDto>({
    mutationFn: (body) => api.patch(ADMIN.settings, body),
  });
};

export {
  useGetAdminListApi,
  useInviteAdminApi,
  useResendInviteApi,
  useGetAdminSettingsApi,
  useUpdateAdminSettingsApi,
};
