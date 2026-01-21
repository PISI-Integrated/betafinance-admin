"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import TableWithPagination from "@/components/TableWithPagination";
import UserDetailsSidebar from "@/components/UserDetailSideBar";
import { adminData, AdminStatus } from "@/lib/constants";
import { AdminRow, Column } from "@/types/types";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

const AdminContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialStatus = searchParams.get("status") || AdminStatus.ACTIVE;

  const [activeStatus, setActiveStatus] = useState(initialStatus);
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
    setActiveStatus(status);
    setSelectedUser(null);
    router.push(`/admin?status=${status}`);
  };

  useEffect(() => {
    const currentStatus = searchParams.get("status");
    if (currentStatus && currentStatus !== activeStatus) {
      setActiveStatus(currentStatus);
    }
  }, [searchParams, activeStatus]);

  return (
    <div className="space-y-6">
      {/* Status Tabs */}
      <div className="flex gap-4 border-b border-gray-200">
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
          Suspended
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
                onRowClick={handleRowClick}
              />
            </CardContent>
          </Card>
        </div>

        {selectedUser && (
          <div className="lg:col-span-1">
            <UserDetailsSidebar
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
