"use client";
import { useGetAdminListApi, useInviteAdminApi } from "@/api/admin.api";
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
      onError: () => {
        toast.error("A user with that email or phone already exists.");
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

export { useFetchAdminListService, useInviteAdminService };
