"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { loanData, LoanStatus, LoanTabs } from "@/lib/constants";
import TableWithPagination from "@/components/TableWithPagination";
import { useRouter, useSearchParams } from "next/navigation";
import { Column, LoanBetaRow, LoanP2PRow } from "@/types/types";

const LoansContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialTab = searchParams.get("tab") || LoanTabs.P2P;
  const initialStatus = searchParams.get("status") || LoanStatus.PENDING;

  const [activeTab, setActiveTab] = useState(initialTab);
  const [activeStatus, setActiveStatus] = useState(initialStatus);

  const columns =
    activeTab === LoanTabs.P2P
      ? (loanData.loanTableHead.p2p as Column<LoanP2PRow>[])
      : (loanData.loanTableHead.betaLoans as Column<LoanBetaRow>[]);

  const data =
    activeTab === LoanTabs.P2P
      ? loanData.loanTableBody.p2p
      : loanData.loanTableBody.betaLoans;

  const updateUrl = (tab: string, status: string) => {
    router.push(`/loans?tab=${tab}&status=${status}`);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    updateUrl(tab, activeStatus);
  };

  const handleStatusChange = (status: string) => {
    setActiveStatus(status);
    updateUrl(activeTab, status);
  };

  useEffect(() => {
    const currentTab = searchParams.get("tab");
    const currentStatus = searchParams.get("status");

    if (currentTab && currentTab !== activeTab) {
      setActiveTab(currentTab);
    }
    if (currentStatus && currentStatus !== activeStatus) {
      setActiveStatus(currentStatus);
    }
  }, [searchParams]);

  return (
    <div className="space-y-6">
      {/* Main Tabs */}
      <div className="flex gap-2">
        <Button
          variant="ghost"
          className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === LoanTabs.P2P
              ? "border-blue-600 bg-blue-50 text-blue-600"
              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          }`}
          onClick={() => handleTabChange(LoanTabs.P2P)}
        >
          P2P Market Place
        </Button>
        <Button
          variant="ghost"
          className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === LoanTabs.BETA_LOANS
              ? "border-blue-600 bg-blue-50 text-blue-600"
              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          }`}
          onClick={() => handleTabChange(LoanTabs.BETA_LOANS)}
        >
          Beta Loans
        </Button>
      </div>

      {/* KPI Card */}
      <Card className="rounded-lg border-gray-200 bg-white w-fit">
        <CardHeader className="pb-3">
          <CardDescription className="text-xs font-medium text-gray-500">
            {activeTab === LoanTabs.P2P
              ? "Total number of P2P Loans"
              : "Total number of Beta loans"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-gray-900">
            {activeTab === LoanTabs.P2P ? "₦98,725,653" : "₦17,354,900"}
          </p>
        </CardContent>
      </Card>

      {/* Status Tabs - Only show for P2P */}
      {activeTab === LoanTabs.P2P && (
        <div className="flex gap-4 border-b border-gray-200">
          <button
            className={`pb-3 text-sm font-medium transition-colors ${
              activeStatus === LoanStatus.PENDING
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => handleStatusChange(LoanStatus.PENDING)}
          >
            Pending
          </button>
          <button
            className={`pb-3 text-sm font-medium transition-colors ${
              activeStatus === LoanStatus.COMPLETED
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => handleStatusChange(LoanStatus.COMPLETED)}
          >
            Completed
          </button>
        </div>
      )}

      {/* Table */}
      <Card className="overflow-hidden rounded-lg border-gray-200 bg-white p-0">
        <TableWithPagination columns={columns} data={data} />
      </Card>
    </div>
  );
};

export default LoansContent;
