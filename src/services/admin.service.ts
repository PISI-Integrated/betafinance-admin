"use client";
import {
  useCreateRoleApi,
  useGetAdminListApi,
  useGetAdminProfileApi,
  useGetAdminSettingsApi,
  useGetPermissionsApi,
  useGetProviderBalancesApi,
  useGetRolesApi,
  useGetWalletApi,
  useGetWalletBalancesApi,
  useInviteAdminApi,
  useResendInviteApi,
  useUpdateAdminSettingsApi,
  useUpdateRoleApi,
} from "@/api/admin.api";
import { queryClient } from "@/lib/query/queryClient";
import toast from "react-hot-toast";

const useFetchAdminListService = (params: IPaginationParamsDto) => {
  const { data, isLoading, error } = useGetAdminListApi(params);

  return {
    adminList: data?.items,
    total: data?.total,
    page: data?.page,
    page_size: data?.page_size,
    adminListLoading: isLoading,
    adminListError: error,
  };
};

const useInviteAdminService = () => {
  const { mutateAsync, isPending, isError, error } = useInviteAdminApi();

  const inviteAdmin = (body: IInviteAdminDto, onSuccess: () => void) => {
    mutateAsync(body, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["admin", "list"] });
        onSuccess();
        toast.success("Admin invited successfully");
      },
      onError: (error) => {
        toast.error(error.response?.data?.detail || "Failed to invite admin");
      },
    });
  };

  return {
    inviteAdmin,
    inviteAdminLoading: isPending,
    inviteAdminError: error,
    inviteAdminIsError: isError,
  };
};

const useResendInviteService = () => {
  const { mutateAsync, isPending, isError, error } = useResendInviteApi();

  const resendInvite = (body: { email: string }) => {
    mutateAsync(body, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["admin", "list"] });
        toast.success("Invite resent successfully");
      },
      onError: () => {
        toast.error("Failed to resend invite");
      },
    });
  };

  return {
    resendInvite,
    resendInviteLoading: isPending,
    resendInviteError: error,
    resendInviteIsError: isError,
  };
};

const useFetchAdminSettingsService = () => {
  const { data, isLoading, error } = useGetAdminSettingsApi();

  return {
    adminSettings: data,
    adminSettingsLoading: isLoading,
    adminSettingsError: error,
  };
};

const useUpdateAdminSettingsService = () => {
  const { mutateAsync, isPending, isError, error } =
    useUpdateAdminSettingsApi();

  const updateAdminSettings = (body: IUpdateAdminSettingsDto) => {
    mutateAsync(body, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["admin", "settings"] });
        toast.success("Settings updated successfully");
      },
      onError: () => {
        toast.error("Failed to update settings");
      },
    });
  };

  return {
    updateAdminSettings,
    updateAdminSettingsLoading: isPending,
    updateAdminSettingsError: error,
    updateAdminSettingsIsError: isError,
  };
};

const useFetchAdminProfileService = () => {
  const { data, isLoading, error } = useGetAdminProfileApi();

  return {
    adminProfile: data,
    adminProfileLoading: isLoading,
    adminProfileError: error,
  };
};

const useFetchPermissionsService = () => {
  const { data, isLoading, error } = useGetPermissionsApi();

  return {
    permissions: data,
    permissionsLoading: isLoading,
    permissionsError: error,
  };
};

const useFetchRolesService = () => {
  const { data, isLoading, error } = useGetRolesApi();

  return {
    roles: data,
    rolesLoading: isLoading,
    rolesError: error,
  };
};

const useUpdateRoleService = () => {
  const { mutateAsync, isPending, isError, error } = useUpdateRoleApi();

  const updateRole = (roleId: string, body: IRoleDto) => {
    mutateAsync(
      { roleId, body },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["admin", "roles"] });
          toast.success("Role updated successfully");
        },
        onError: (error) => {
          toast.error(error.response?.data?.detail || "Failed to update role");
        },
      },
    );
  };

  return {
    updateRole,
    updateRoleLoading: isPending,
    updateRoleError: error,
    updateRoleIsError: isError,
  };
};

const useCreateRoleService = () => {
  const { mutateAsync, isPending, isError, error } = useCreateRoleApi();

  const createRole = (body: IRoleDto) => {
    mutateAsync(body, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["admin", "roles"] });
        toast.success("Role created successfully");
      },
      onError: (error) => {
        toast.error(error.response?.data?.detail || "Failed to create role");
      },
    });
  };

  return {
    createRole,
    createRoleLoading: isPending,
    createRoleError: error,
    createRoleIsError: isError,
  };
};

const useFetchProviderBalancesService = () => {
  const { data, isLoading, error } = useGetProviderBalancesApi();

  return {
    providerBalances: data,
    providerBalancesLoading: isLoading,
    providerBalancesError: error,
  };
};

const useFetchWalletBalancesService = () => {
  const { data, isLoading, error } = useGetWalletBalancesApi();

  return {
    walletBalances: data,
    walletBalancesLoading: isLoading,
    walletBalancesError: error,
  };
};

const useFetchWalletService = () => {
  const { data, isLoading, error } = useGetWalletApi();

  return {
    wallet: data,
    walletLoading: isLoading,
    walletError: error,
  };
};

export {
  useFetchAdminListService,
  useInviteAdminService,
  useResendInviteService,
  useFetchAdminSettingsService,
  useUpdateAdminSettingsService,
  useFetchAdminProfileService,
  useFetchPermissionsService,
  useFetchRolesService,
  useUpdateRoleService,
  useCreateRoleService,
  useFetchProviderBalancesService,
  useFetchWalletBalancesService,
  useFetchWalletService,
};
