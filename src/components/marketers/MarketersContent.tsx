"use client";
import { useEffect, useState } from "react";
import TableWithPagination from "@/components/TableWithPagination";
import { MarketerTabStatus } from "@/lib/constants";
import MarketersDetailsSidebar from "./sidebar/MarketersDetailsSidebar";
import CreateMarketerModal from "./CreateMarketerModal";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { useFetchMarketersService } from "@/services/marketers.service";
import { MarketerRow } from "@/types/types";
import { formatCurrency, formatDate } from "@/lib/utils";

const MARKETERS_PER_PAGE = 10;

const marketerColumns = [
  { header: "Name", accessor: "name" as keyof MarketerRow },
  { header: "Prefix", accessor: "prefix" as keyof MarketerRow },
  { header: "Payout", accessor: "payout" as keyof MarketerRow },
  { header: "Postback URL", accessor: "postback_url" as keyof MarketerRow },
  { header: "Status", accessor: "is_active" as keyof MarketerRow },
  { header: "Created At", accessor: "created_at" as keyof MarketerRow },
];

const MarketersContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab =
    (searchParams.get("tab") as MarketerTabStatus) || MarketerTabStatus.ACTIVE;
  const initialPage = Number(searchParams.get("page")) || 1;

  const [activeTab, setActiveTab] = useState<MarketerTabStatus>(initialTab);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [selectedMarketerId, setSelectedMarketerId] = useState<string | null>(
    null,
  );
  const isAddModalOpen = searchParams.get("add-marketer");

  const { marketers, isMarketersLoading } = useFetchMarketersService({
    limit: MARKETERS_PER_PAGE,
    skip: (currentPage - 1) * MARKETERS_PER_PAGE,
    is_active: activeTab === MarketerTabStatus.ACTIVE,
  });

  const handleRowClick = (marketer: MarketerRow) => {
    setSelectedMarketerId(marketer.id);
  };

  const handleCloseSidebar = () => {
    setSelectedMarketerId(null);
  };

  const handleTabChange = (tab: MarketerTabStatus) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSelectedMarketerId(null);
    router.push(`/marketers?tab=${tab}&page=1`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`/marketers?tab=${activeTab}&page=${page}`);
  };

  useEffect(() => {
    const currentTab = searchParams.get("tab") as MarketerTabStatus;
    const currentPageParam = Number(searchParams.get("page")) || 1;

    if (currentTab && currentTab !== activeTab) {
      setActiveTab(currentTab);
    }
    if (currentPageParam !== currentPage) {
      setCurrentPage(currentPageParam);
    }
  }, [searchParams, activeTab, currentPage]);

  const totalPages = Math.ceil((marketers?.total || 0) / MARKETERS_PER_PAGE);

  const formattedData =
    marketers?.items.map((item) => ({
      ...item,
      payout: formatCurrency(Number(item.payout)),
      postback_url: item.postback_url || "N/A",
      is_active: (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
            item.is_active
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {item.is_active ? "Active" : "Inactive"}
        </span>
      ),
      created_at: formatDate(item.created_at),
    })) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        {/* Status Tabs */}
        <div className="flex gap-4 border-b border-gray-200 flex-1">
          <button
            className={`pb-3 text-sm font-medium capitalize transition-colors ${
              activeTab === MarketerTabStatus.ACTIVE
                ? "border-b-2 border-primary text-primary"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => handleTabChange(MarketerTabStatus.ACTIVE)}
          >
            Active
          </button>
          <button
            className={`pb-3 text-sm font-medium capitalize transition-colors ${
              activeTab === MarketerTabStatus.INACTIVE
                ? "border-b-2 border-primary text-primary"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => handleTabChange(MarketerTabStatus.INACTIVE)}
          >
            Inactive
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className={selectedMarketerId ? "lg:col-span-2" : "lg:col-span-3"}>
          <Card className="overflow-hidden rounded-lg border-gray-200 bg-white">
            <CardContent className="p-0">
              <TableWithPagination
                columns={marketerColumns as any}
                data={formattedData as any}
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={MARKETERS_PER_PAGE}
                onPageChange={handlePageChange}
                onRowClick={(row: any) => handleRowClick(row)}
                isLoading={isMarketersLoading}
              />
            </CardContent>
          </Card>
        </div>

        {selectedMarketerId && (
          <div className="lg:col-span-1">
            <MarketersDetailsSidebar
              marketerId={selectedMarketerId}
              onClose={handleCloseSidebar}
            />
          </div>
        )}
      </div>

      <CreateMarketerModal
        isOpen={Boolean(isAddModalOpen)}
        onClose={() => {
          const params = new URLSearchParams(searchParams.toString());
          params.delete("add-marketer");
          router.push(`/marketers?${params.toString()}`);
        }}
      />
    </div>
  );
};

export default MarketersContent;
