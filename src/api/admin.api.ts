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

const useGetPermissionsApi = () => {
  return useQuery<IPermissionsResponse[], ICustomError>({
    queryKey: ["admin", "permissions"],
    queryFn: () => api.get<IPermissionsResponse[]>(ADMIN.permissions),
  });
};

const useGetRolesApi = () => {
  return useQuery<IRolesResponse[], ICustomError>({
    queryKey: ["admin", "roles"],
    queryFn: () => api.get<IRolesResponse[]>(ADMIN.roles),
  });
};

const useCreateRoleApi = () => {
  return useMutation<string, ICustomError, IRoleDto>({
    mutationFn: (body) => api.post(ADMIN.roles, body),
  });
};

const useUpdateRoleApi = () => {
  return useMutation<string, ICustomError, { roleId: string; body: IRoleDto }>({
    mutationFn: ({ roleId, body }) => api.patch(ADMIN.updateRole(roleId), body),
  });
};

const useGetProviderBalancesApi = () => {
  return useQuery<IProviderBalancesResponse[], ICustomError>({
    queryKey: ["admin", "provider-balances"],
    queryFn: () => api.get<IProviderBalancesResponse[]>(ADMIN.providerBalances),
  });
};

const useGetWalletBalancesApi = () => {
  return useQuery<IWalletBalancesResponse, ICustomError>({
    queryKey: ["admin", "wallet-balances"],
    queryFn: () => api.get<IWalletBalancesResponse>(ADMIN.walletBalances),
  });
};

const useGetWalletApi = () => {
  return useQuery<IWalletResponse, ICustomError>({
    queryKey: ["admin", "wallet"],
    queryFn: () => api.get<IWalletResponse>(ADMIN.wallet),
  });
};

export {
  useGetAdminListApi,
  useInviteAdminApi,
  useResendInviteApi,
  useGetAdminSettingsApi,
  useUpdateAdminSettingsApi,
  useGetAdminProfileApi,
  useGetPermissionsApi,
  useGetRolesApi,
  useCreateRoleApi,
  useUpdateRoleApi,
  useGetProviderBalancesApi,
  useGetWalletBalancesApi,
  useGetWalletApi,
};
