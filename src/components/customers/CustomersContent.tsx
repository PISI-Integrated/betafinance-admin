"use client";
import { useEffect, useMemo, useState } from "react";
import TableWithPagination from "@/components/TableWithPagination";
import { CustomerStatus, customerTableHeader } from "@/lib/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import useCreateQueryString from "@/hooks/useCreateQueryString";
import { useFetchCustomersService } from "@/services/users.service";
import UserDetailsSidebar from "./sidebar/UserDetailSideBar";
import TableSkeleton from "../TableSkeleton";
import { formatDate } from "@/lib/utils";

const CustomersContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { createQueryParams } = useCreateQueryString();

  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || CustomerStatus.ACTIVE;

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const customerParams = useMemo<ICustomersParamsDto>(() => {
    const params: ICustomersParamsDto = {
      page,
      size,
    };

    if (activeTab === "pending_validation" || activeTab === "rejected") {
      params.kyc_status = activeTab as kycStatus;
    }

    return params;
  }, [activeTab, page, size]);

  const { allCustomers, isCustomersLoading } =
    useFetchCustomersService(customerParams);
  const totalPagesFromApi = Math.ceil(
    allCustomers?.total! / allCustomers?.page_size!,
  );

  const [selectedUser, setSelectedUser] = useState<
    ICustomersResponse["items"][0] | null
  >(null);

  const data =
    allCustomers?.items?.filter((user) =>
      activeTab === CustomerStatus.ACTIVE && !user.isSuspended
        ? user.kycStatus === "validated"
        : activeTab === CustomerStatus.PENDING
          ? user.kycStatus === "pending_validation"
          : activeTab === CustomerStatus.SUSPENDED
            ? user.isSuspended
            : user.kycStatus === "rejected",
    ) ?? [];

  const handleRowClick = (user: ICustomersResponse["items"][0]) => {
    setSelectedUser(user);
  };

  const handleCloseSidebar = () => {
    setSelectedUser(null);
  };

  const handleTabChange = (tab: string) => {
    setSelectedUser(null);
    router.replace(pathname + "?" + createQueryParams("tab", tab));
  };

  useEffect(() => {
    setPage(1);
  }, [activeTab]);

  const tableData: ICustomersResponse["items"] = data.map((item) => ({
    ...item,
    createdAt: formatDate(item.createdAt, true),
  }));

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
            activeTab === CustomerStatus.PENDING
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
          onClick={() => handleTabChange(CustomerStatus.PENDING)}
        >
          KYC Review
        </button>
        <button
          className={`pb-3 text-sm font-medium capitalize transition-colors ${
            activeTab === CustomerStatus.REJECTED
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
          onClick={() => handleTabChange(CustomerStatus.REJECTED)}
        >
          KYC Rejected
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
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 ">
        <div className={selectedUser ? "lg:col-span-2" : "lg:col-span-3"}>
          <Card className="overflow-hidden rounded-lg p-0 border-gray-200 bg-white">
            <CardContent className="p-0">
              {isCustomersLoading ? (
                <TableSkeleton
                  columnsCount={customerTableHeader.length}
                  rows={5}
                />
              ) : data.length === 0 ? (
                <div className="flex items-center justify-center py-12">
                  <p className="text-sm text-gray-500">No customers found</p>
                </div>
              ) : (
                <TableWithPagination
                  columns={customerTableHeader}
                  data={tableData ?? []}
                  onRowClick={handleRowClick}
                  currentPage={page}
                  itemsPerPage={size}
                  totalPages={totalPagesFromApi ?? 0}
                  onPageChange={setPage}
                />
              )}
            </CardContent>
          </Card>
        </div>

        {selectedUser && (
          <div className="lg:col-span-1 lg:max-h-[calc(100dvh+50px)] xl:max-h-dvh">
            <UserDetailsSidebar
              key={selectedUser?.id}
              userId={selectedUser?.id}
              onClose={handleCloseSidebar}
              isSuspended={selectedUser?.isSuspended}
              suspensionReason={selectedUser?.suspensionReason}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomersContent;
