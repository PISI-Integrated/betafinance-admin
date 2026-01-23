"use client";
import { useEffect, useState } from "react";
import TableWithPagination from "@/components/TableWithPagination";
import { customerData, CustomerStatus } from "@/lib/constants";
import UserDetailsSidebar from "@/components/UserDetailSideBar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import useCreateQueryString from "@/hooks/useCreateQueryString";

const CustomersContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { createQueryParams } = useCreateQueryString();

  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || CustomerStatus.ACTIVE;

  const [selectedUser, setSelectedUser] = useState<any>(null);

  const data = [
    ...customerData.customerTableBody.p2p,
    ...customerData.customerTableBody.betaLoans,
  ].filter((user) =>
    activeTab === CustomerStatus.ACTIVE
      ? user.status === "active"
      : user.status === "suspended",
  );

  const handleRowClick = (user: any) => {
    setSelectedUser(user);
  };

  const handleCloseSidebar = () => {
    setSelectedUser(null);
  };

  const handleTabChange = (tab: string) => {
    setSelectedUser(null);
    router.replace(pathname + "?" + createQueryParams("tab", tab));
  };

  return (
    <div className="space-y-6">
      {/* Status Tabs */}
      <div className="flex gap-4 border-b border-gray-200">
        <button
          className={`pb-3 text-sm font-medium capitalize transition-colors ${
            activeTab === CustomerStatus.ACTIVE
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
          onClick={() => handleTabChange(CustomerStatus.ACTIVE)}
        >
          Active
        </button>
        <button
          className={`pb-3 text-sm font-medium capitalize transition-colors ${
            activeTab === CustomerStatus.SUSPENDED
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
          onClick={() => handleTabChange(CustomerStatus.SUSPENDED)}
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
                columns={customerData.customerTableHead.p2p}
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

export default CustomersContent;
