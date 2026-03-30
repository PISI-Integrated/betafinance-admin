import { api } from "@/lib/axios";
import { ADMIN } from "@/lib/constants/config";
import { useQuery, keepPreviousData, useMutation } from "@tanstack/react-query";

const useGetAdminListApi = (params: IPaginationParamsDto) => {
  return useQuery<IAdminListResponse, ICustomError>({
    queryKey: ["admin", "list", params],
    queryFn: () => api.get<IAdminListResponse>(ADMIN.list, params),
    placeholderData: keepPreviousData,
  });
};

const useInviteAdminApi = () => {
  return useMutation<string, ICustomError, IInviteAdminDto>({
    mutationFn: (body) => api.post(ADMIN.invite, body),
  });
};

const useResendInviteApi = () => {
  return useMutation<string, ICustomError, { email: string }>({
    mutationFn: (body) => api.post(ADMIN.resendInvite, body),
  });
};

const useGetAdminSettingsApi = () => {
  return useQuery<IAdminSettingsResponse, ICustomError>({
    queryKey: ["admin", "settings"],
    queryFn: () => api.get<IAdminSettingsResponse>(ADMIN.settings),
  });
};

const useUpdateAdminSettingsApi = () => {
  return useMutation<string, ICustomError, IUpdateAdminSettingsDto>({
    mutationFn: (body) => api.patch(ADMIN.settings, body),
  });
};

const useGetAdminProfileApi = () => {
  return useQuery<IAdminProfileResponse, ICustomError>({
    queryKey: ["admin", "profile"],
    queryFn: () => api.get<IAdminProfileResponse>(ADMIN.profile),
  });
};

export {
  useGetAdminListApi,
  useInviteAdminApi,
  useResendInviteApi,
  useGetAdminSettingsApi,
  useUpdateAdminSettingsApi,
  useGetAdminProfileApi,
};
