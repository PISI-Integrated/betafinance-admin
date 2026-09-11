"use client";
import { useEffect, useMemo, useState } from "react";
import TableWithPagination from "@/components/TableWithPagination";
import { CustomerStatus, customerTableHeader } from "@/lib/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCreateQueryString from "@/hooks/useCreateQueryString";
import { useFetchCustomersService } from "@/services/users.service";
import UserDetailsSidebar from "./sidebar/UserDetailSideBar";
import TableSkeleton from "../TableSkeleton";
import { formatDate } from "@/lib/utils";
import toast from "react-hot-toast";
import { PAGE_SIZE } from "@/lib/constants/data";

const CustomersContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { createQueryParams } = useCreateQueryString();

  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || CustomerStatus.ACTIVE;

  const [page, setPage] = useState(1);

  const [region, setRegion] = useState<regionType>("all");

  const customerParams = useMemo<ICustomersParamsDto>(() => {
    const params: ICustomersParamsDto = {
      page,
      size: PAGE_SIZE,
    };

    if (region !== "all") {
      params.region = region;
    }

    if (activeTab === CustomerStatus.ACTIVE) {
      params.kyc_status = "validated";
    } else if (
      activeTab === CustomerStatus.PENDING ||
      activeTab === CustomerStatus.REJECTED
    ) {
      params.kyc_status = activeTab as kycStatus;
    }

    return params;
  }, [activeTab, page, region]);

  const { allCustomers, isCustomersLoading, customerError } =
    useFetchCustomersService(customerParams);
  const totalPagesFromApi = Math.ceil(
    allCustomers?.total! / allCustomers?.page_size!,
  );

  const [selectedUser, setSelectedUser] = useState<
    ICustomersResponse["items"][0] | null
  >(null);

  const data = useMemo(() => {
    return (
      allCustomers?.items?.filter((user) => {
        switch (activeTab) {
          case CustomerStatus.ACTIVE:
            return user.kycStatus === "validated" && !user.isSuspended;
          case CustomerStatus.PENDING:
            return user.kycStatus === "pending_validation";
          case CustomerStatus.SUSPENDED:
            return user.isSuspended;
          case CustomerStatus.REJECTED:
            return user.kycStatus === "rejected";
          default:
            return true;
        }
      }) ?? []
    );
  }, [allCustomers?.items, activeTab]);

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

  useEffect(() => {
    if (customerError) {
      toast.error(
        customerError?.response.data.detail || "Something went wrong",
      );
    }
  }, [customerError]);

  const tableData: ICustomersResponse["items"] = data.map((item) => ({
    ...item,
    createdAt: formatDate(item.createdAt, true),
  }));

  return (
    <div className="space-y-6">
      {/* Status Tabs and Filters */}
      <div className="flex items-center justify-between border-b border-gray-200">
        <div className="flex gap-4">
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

        <div className="mb-2">
          <Select
            value={region}
            onValueChange={(val) => setRegion(val as regionType)}
          >
            <SelectTrigger className="w-[180px] bg-[rgba(145,_158,_171,_0.08)] border-none">
              <SelectValue placeholder="All Regions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="NG">Nigeria</SelectItem>
              <SelectItem value="UG">Uganda</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
                  itemsPerPage={PAGE_SIZE}
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
