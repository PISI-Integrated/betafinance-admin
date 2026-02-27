"use client";
import { useEffect, useState, ReactNode } from "react";
import TableWithPagination from "@/components/TableWithPagination";
import { adminData, AdminStatus } from "@/lib/constants";
import { AdminRow, Column } from "@/types/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import AdminDetailsSidebar from "./AdminDetailSidebar";
import useCreateQueryString from "@/hooks/useCreateQueryString";
import { useFetchAdminListService } from "@/services/admin.service";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { InviteAdminModal } from "./InviteAdminModal";
import { Plus } from "lucide-react";

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

  const { adminList, adminListLoading, adminListError, total } =
    useFetchAdminListService({
      page: currentPage,
      page_size: itemsPerPage,
    });

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
        : activeStatus) as AdminRow["status"],
      dateAdded: formatDate(admin.createdAt, true),
      dateJoined: formatDate(admin.createdAt, true),
      role: "Admin",
    };

    return {
      ...rawRow,
      name: <span>{rawRow.name}</span>,
      email: <span className="lowercase">{rawRow.email}</span>,
      status: (
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
            rawRow.status === "active"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {rawRow.status}
        </span>
      ),
      role: <span className="capitalize font-medium">{rawRow.role}</span>,
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-gray-200">
        {/* Status Tabs */}
        <div className="flex gap-4">
          <button
            className={`pb-3 text-sm font-medium capitalize transition-colors ${
              activeStatus === AdminStatus.ACTIVE
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => handleStatusChange(AdminStatus.ACTIVE)}
          >
            Active
          </button>
          <button
            className={`pb-3 text-sm font-medium capitalize transition-colors ${
              activeStatus === AdminStatus.SUSPENDED
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => handleStatusChange(AdminStatus.SUSPENDED)}
          >
            Inactive
          </button>
        </div>

        <Button onClick={() => setIsInviteModalOpen(true)} className="mb-2">
          <Plus className="mr-2 h-4 w-4" />
          Invite Admin
        </Button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className={selectedUser ? "lg:col-span-2" : "lg:col-span-3"}>
          <Card className="overflow-hidden rounded-lg border-gray-200 bg-white">
            <CardContent className="p-0">
              {adminListLoading ? (
                <div className="flex flex-col gap-4 p-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : adminListError ? (
                <div className="flex h-40 items-center justify-center text-red-500">
                  Failed to load administrators
                </div>
              ) : tableData.length === 0 ? (
                <div className="flex items-center justify-center py-12">
                  <p className="text-sm text-gray-500">
                    No administrators found
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
          <div className="lg:col-span-1">
            <AdminDetailsSidebar
              user={selectedUser}
              onClose={handleCloseSidebar}
            />
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
