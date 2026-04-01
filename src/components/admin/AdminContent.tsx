"use client";
import { useState, ReactNode, useEffect } from "react";
import TableWithPagination from "@/components/TableWithPagination";
import { AdminStatus } from "@/lib/constants";
import { AdminRow, Column } from "@/types/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import AdminDetailsSidebar from "./AdminDetailSidebar";
import useCreateQueryString from "@/hooks/useCreateQueryString";
import {
  useFetchAdminListService,
  useResendInviteService,
} from "@/services/admin.service";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { InviteAdminModal } from "./InviteAdminModal";
import { Plus, ShieldCheck, UserCog } from "lucide-react";
import toast from "react-hot-toast";
import RoleManagement from "./RoleManagement";

interface AdminTableRow extends Omit<
  AdminRow,
  "name" | "email" | "status" | "role"
> {
  name: ReactNode;
  email: ReactNode;
  status: ReactNode;
  role: ReactNode;
  _raw: AdminRow;
}

const AdminContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { createQueryParams } = useCreateQueryString();
  const searchParams = useSearchParams();
  const activeStatus = searchParams.get("status") || AdminStatus.ACTIVE;
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const itemsPerPage = 10;

  const [selectedUser, setSelectedUser] = useState<AdminRow | null>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isCreateRoleModalOpen, setIsCreateRoleModalOpen] = useState(false);

  const { adminList, adminListLoading, adminListError, total } =
    useFetchAdminListService({
      page: currentPage,
      page_size: itemsPerPage,
    });

  const { resendInvite, resendInviteLoading } = useResendInviteService();

  const handleResendInvite = (email: string) => {
    resendInvite({ email });
  };

  const filteredAdminList = adminList?.filter((admin) => {
    if (activeStatus === AdminStatus.ACTIVE) {
      return !admin.isSuspended;
    } else if (activeStatus === AdminStatus.SUSPENDED) {
      return admin.isSuspended;
    }
    return true;
  });

  const columns: Column<AdminTableRow>[] = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "role" },
    { header: "Date Added", accessor: "dateAdded" },
    { header: "Status", accessor: "status" },
  ];

  const tableData: AdminTableRow[] = (filteredAdminList || []).map((admin) => {
    const rawRow: AdminRow = {
      id: admin.id,
      name: admin.name || "N/A",
      email: admin.email || "N/A",
      phoneNumber: admin.phone || "N/A",
      username: admin.email?.split("@")[0] || "N/A",
      status: (admin.isSuspended
        ? "suspended"
        : admin.status || "active") as AdminRow["status"],
      dateAdded: formatDate(admin.createdAt, true),
      dateJoined: formatDate(admin.createdAt, true),
      role: "Admin",
    };

    return {
      ...rawRow,
      name: <span>{rawRow.name}</span>,
      email: <span className="lowercase">{rawRow.email}</span>,
      status: (
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
              rawRow.status === "active" || rawRow.status === "validated"
                ? "bg-emerald-50 text-emerald-700"
                : rawRow.status === "pending_validation"
                  ? "bg-amber-50 text-amber-700"
                  : "bg-rose-50 text-rose-700"
            }`}
          >
            {rawRow.status === "pending_validation"
              ? "Pending"
              : rawRow.status === "validated" || rawRow.status === "active"
                ? "Active"
                : rawRow.status === "not_started"
                  ? "Not Started"
                  : rawRow.status?.replace("_", " ")}
          </span>
          {rawRow.status === "pending_validation" && (
            <button
              disabled={resendInviteLoading}
              onClick={(e) => {
                e.stopPropagation();
                handleResendInvite(rawRow.email);
              }}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline disabled:opacity-50 transition-colors"
            >
              Resend Invite
            </button>
          )}
        </div>
      ),
      role: (
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-blue-500/70" />
          <span className="capitalize font-semibold text-gray-700">
            {rawRow.role}
          </span>
        </div>
      ),
      _raw: rawRow,
    };
  });

  const totalPages = Math.ceil((total || 0) / itemsPerPage);

  const handleRowClick = (row: AdminTableRow) => {
    setSelectedUser(row._raw);
  };

  const handleCloseSidebar = () => {
    setSelectedUser(null);
  };

  const handleStatusChange = (status: string) => {
    setSelectedUser(null);
    const newQueryString = createQueryParams("status", status);
    const params = new URLSearchParams(newQueryString);
    params.set("page", "1");
    router.replace(pathname + "?" + params.toString());
  };

  const handlePageChange = (page: number) => {
    router.replace(pathname + "?" + createQueryParams("page", page.toString()));
  };

  useEffect(() => {
    if (adminListError) {
      toast.error(
        adminListError?.response.data.detail || "Something went wrong",
      );
    }
  }, [adminListError]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-gray-200 gap-4">
          <div className="flex gap-8 overflow-x-auto pb-px">
            <button
              className={`pb-4 text-sm  tracking-wider transition-all duration-300 relative whitespace-nowrap ${
                activeStatus === AdminStatus.ACTIVE
                  ? "text-blue-600"
                  : "text-gray-400 hover:text-gray-600"
              }`}
              onClick={() => handleStatusChange(AdminStatus.ACTIVE)}
            >
              Active Admins
              {activeStatus === AdminStatus.ACTIVE && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full" />
              )}
            </button>
            <button
              className={`pb-4 text-sm  tracking-wider transition-all duration-300 relative whitespace-nowrap ${
                activeStatus === AdminStatus.SUSPENDED
                  ? "text-blue-600"
                  : "text-gray-400 hover:text-gray-600"
              }`}
              onClick={() => handleStatusChange(AdminStatus.SUSPENDED)}
            >
              Inactive Admins
              {activeStatus === AdminStatus.SUSPENDED && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full" />
              )}
            </button>
            <button
              className={`pb-4 text-sm  tracking-wider transition-all duration-300 relative whitespace-nowrap ${
                activeStatus === AdminStatus.ROLES
                  ? "text-blue-600"
                  : "text-gray-400 hover:text-gray-600"
              }`}
              onClick={() => handleStatusChange(AdminStatus.ROLES)}
            >
              Role Management
              {activeStatus === AdminStatus.ROLES && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-4 mb-3 self-end lg:self-auto">
            <Button
              onClick={() =>
                activeStatus === AdminStatus.ROLES
                  ? setIsCreateRoleModalOpen(true)
                  : setIsInviteModalOpen(true)
              }
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 h-10 shadow-md transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shrink-0"
            >
              <Plus className="h-5 w-5" />
              {activeStatus === AdminStatus.ROLES
                ? "Create Role"
                : "Invite Admin"}
            </Button>
          </div>
        </div>

        {activeStatus === AdminStatus.ROLES ? (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <RoleManagement
              isCreateModalOpen={isCreateRoleModalOpen}
              onOpenChange={setIsCreateRoleModalOpen}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 animate-in slide-in-from-bottom-2 duration-400">
            <div className={selectedUser ? "lg:col-span-3" : "lg:col-span-4"}>
              <Card className="overflow-hidden rounded-2xl border-none bg-white/80 backdrop-blur-sm ring-1 ring-gray-200/50">
                <CardContent className="p-0">
                  {adminListLoading ? (
                    <div className="flex flex-col gap-6 p-8">
                      <Skeleton className="h-12 w-full rounded-xl" />
                      <Skeleton className="h-12 w-full rounded-xl" />
                      <Skeleton className="h-12 w-full rounded-xl" />
                    </div>
                  ) : adminListError ? (
                    <div className="flex h-64 flex-col items-center justify-center text-gray-400 gap-3">
                      <ShieldCheck className="h-12 w-12 opacity-20" />
                      <span className="font-medium">
                        Failed to load administrators
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.location.reload()}
                      >
                        Retry
                      </Button>
                    </div>
                  ) : tableData.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                      <div className="bg-gray-100 p-4 rounded-full">
                        <UserCog className="h-10 w-10 text-gray-400" />
                      </div>
                      <p className="text-gray-500 font-medium tracking-tight">
                        No administrators found matching your criteria
                      </p>
                    </div>
                  ) : (
                    <TableWithPagination
                      columns={columns}
                      data={tableData}
                      onRowClick={handleRowClick}
                      currentPage={currentPage}
                      totalPages={totalPages || 1}
                      itemsPerPage={itemsPerPage}
                      onPageChange={handlePageChange}
                    />
                  )}
                </CardContent>
              </Card>
            </div>

            {selectedUser && (
              <div className="lg:col-span-1 animate-in slide-in-from-right-4 duration-300">
                <AdminDetailsSidebar
                  user={selectedUser}
                  onClose={handleCloseSidebar}
                />
              </div>
            )}
          </div>
        )}
      </div>

      <InviteAdminModal
        open={isInviteModalOpen}
        onOpenChange={setIsInviteModalOpen}
      />
    </div>
  );
};

export default AdminContent;
