"use client";
import { useEffect, useState } from "react";
import TableWithPagination from "@/components/TableWithPagination";
import { adminData, AdminStatus } from "@/lib/constants";
import { AdminRow, Column } from "@/types/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import AdminDetailsSidebar from "./AdminDetailSidebar";
import useCreateQueryString from "@/hooks/useCreateQueryString";

const AdminContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { createQueryParams } = useCreateQueryString();
  const searchParams = useSearchParams();
  const activeStatus = searchParams.get("status") || AdminStatus.ACTIVE;

  const [selectedUser, setSelectedUser] = useState<AdminRow | null>(null);

  const columns = adminData.adminTableHead as Column<AdminRow>[];
  const data = adminData.adminTableBody.filter(
    (user) => user.status === activeStatus,
  );

  const handleRowClick = (user: AdminRow) => {
    setSelectedUser(user);
  };

  const handleCloseSidebar = () => {
    setSelectedUser(null);
  };

  const handleStatusChange = (status: string) => {
    setSelectedUser(null);
    router.replace(pathname + "?" + createQueryParams("status", status));
  };

  return (
    <div className="space-y-6">
      {/* Status Tabs */}
      <div className="flex gap-4 border-b border-gray-200">
        <button
          className={`pb-3 text-sm font-medium capitalize transition-colors ${activeStatus === AdminStatus.ACTIVE
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600 hover:text-gray-900"
            }`}
          onClick={() => handleStatusChange(AdminStatus.ACTIVE)}
        >
          Active
        </button>
        <button
          className={`pb-3 text-sm font-medium capitalize transition-colors ${activeStatus === AdminStatus.SUSPENDED
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600 hover:text-gray-900"
            }`}
          onClick={() => handleStatusChange(AdminStatus.SUSPENDED)}
        >
          Inactive
        </button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className={selectedUser ? "lg:col-span-2" : "lg:col-span-3"}>
          <Card className="overflow-hidden rounded-lg border-gray-200 bg-white">
            <CardContent className="p-0">
              <TableWithPagination
                columns={columns}
                data={data}
                onRowClick={handleRowClick} currentPage={0} totalPages={0} itemsPerPage={0} onPageChange={function (page: number): void {
                  throw new Error("Function not implemented.");
                }} />
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
    </div>
  );
};

export default AdminContent;
