"use client";
import { useEffect, useMemo, useState } from "react";
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
import LoanDetailsSidebar from "../LoanDetailsSidebar";
import { useFetchAllLoansService } from "@/services/loans.service";
import { formatCurrency } from "@/lib/utils/formatters";

const LoansContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialTab = searchParams.get("tab") || LoanTabs.BETA_LOANS;
  // Default status: "all" for both Beta Loans and P2P
  const defaultStatus = "all";
  const initialStatus = searchParams.get("status") || defaultStatus;

  const [activeTab, setActiveTab] = useState(initialTab);
  const [activeStatus, setActiveStatus] = useState(initialStatus);

  // Map LoanTabs to API LoanType
  const loanType = activeTab === LoanTabs.P2P ? "p2p" : "b2c";

  // Prepare params for API call
  // For Beta Loans "all" tab, don't pass loan_status
  const loanParams = useMemo<ILoansParamsDto>(() => {
    const params: ILoansParamsDto = {
      loan_type: loanType as loanType,
    };

    // Only add loan_status if it's not "all" (for Beta Loans)
    if (activeStatus !== "all") {
      params.loan_status = activeStatus as loanStatus;
    }

    return params;
  }, [loanType, activeStatus]);

  const { allLoans, isLoansLoading } = useFetchAllLoansService(loanParams);

  const columns =
    activeTab === LoanTabs.P2P
      ? (loanData.loanTableHead.p2p as Column<LoanP2PRow>[])
      : (loanData.loanTableHead.betaLoans as Column<LoanBetaRow>[]);

  // Transform API data to table row format
  const data = useMemo(() => {
    const loansResponse = allLoans as ILoansResponse | undefined;
    if (!loansResponse?.items || !Array.isArray(loansResponse.items)) return [];

    return loansResponse.items.map((loan: ILoansResponse["items"][0]) => {
      const baseRow = {
        id: loan.id,
        amount: formatCurrency(loan.amount),
        borrower: loan.borrower,
        loanPeriod: `${loan.termdays} days`,
      };

      if (activeTab === LoanTabs.P2P) {
        return {
          ...baseRow,
          type: loan.loantype,
          interest: `${loan.interestrate}%`,
          lender: loan.lender || "N/A",
        } as LoanP2PRow;
      }

      return baseRow as LoanBetaRow;
    });
  }, [allLoans, activeTab]);

  const updateUrl = (tab: string, status: string) => {
    router.push(`/loans?tab=${tab}&status=${status}`);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Reset status when switching tabs: "all" for both tabs
    const defaultStatusForTab = "all";
    setActiveStatus(defaultStatusForTab);
    updateUrl(tab, defaultStatusForTab);
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
      // Set default status when tab changes: "all" for both tabs
      const defaultStatusForTab = "all";
      if (!currentStatus) {
        setActiveStatus(defaultStatusForTab);
      }
    }
    if (currentStatus && currentStatus !== activeStatus) {
      setActiveStatus(currentStatus);
    }
  }, [searchParams, activeTab, activeStatus]);

  const [selectedLoan, setSelectedLoan] = useState<any>(null);

  const handleRowClick = (loan: any) => {
    setSelectedLoan(loan);
  };

  const handleCloseSidebar = () => {
    setSelectedLoan(null);
  };

  return (
    <div className="space-y-6">
      {/* Main Tabs */}
      <div className="flex gap-2">
        <Button
          variant="ghost"
          className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${activeTab === LoanTabs.BETA_LOANS
            ? "border-blue-600 bg-blue-50 text-blue-600"
            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          onClick={() => handleTabChange(LoanTabs.BETA_LOANS)}
        >
          Beta Loans
        </Button>
        <Button
          variant="ghost"
          className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${activeTab === LoanTabs.P2P
            ? "border-blue-600 bg-blue-50 text-blue-600"
            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          onClick={() => handleTabChange(LoanTabs.P2P)}
        >
          P2P Market Place
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

      {/* Status Tabs */}
      <div className="flex gap-4 border-b border-gray-200">
        {activeTab === LoanTabs.BETA_LOANS ? (
          <>
            <button
              className={`pb-3 text-sm font-medium transition-colors ${activeStatus === "all"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
                }`}
              onClick={() => handleStatusChange("all")}
            >
              All
            </button>
            <button
              className={`pb-3 text-sm font-medium transition-colors ${activeStatus === "pending"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
                }`}
              onClick={() => handleStatusChange("pending")}
            >
              Pending
            </button>
            <button
              className={`pb-3 text-sm font-medium transition-colors ${activeStatus === "funded"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
                }`}
              onClick={() => handleStatusChange("funded")}
            >
              Funded
            </button>
            <button
              className={`pb-3 text-sm font-medium transition-colors ${activeStatus === "repaid"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
                }`}
              onClick={() => handleStatusChange("repaid")}
            >
              Repaid
            </button>
          </>
        ) : (
          <>
            <button
              className={`pb-3 text-sm font-medium transition-colors ${activeStatus === "all"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
                }`}
              onClick={() => handleStatusChange("all")}
            >
              All
            </button>
            <button
              className={`pb-3 text-sm font-medium transition-colors ${activeStatus === "pending"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
                }`}
              onClick={() => handleStatusChange("pending")}
            >
              Pending
            </button>
            <button
              className={`pb-3 text-sm font-medium transition-colors ${activeStatus === "repaid"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
                }`}
              // For P2P, \"Completed\" tab maps to \"repaid\" status
              onClick={() => handleStatusChange("repaid")}
            >
              Completed
            </button>
          </>
        )}
      </div>

      {/* Table */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className={selectedLoan ? "lg:col-span-2" : "lg:col-span-3"}>
          <Card className="overflow-hidden rounded-lg border-gray-200 bg-white">
            <CardContent className="p-0">
              {isLoansLoading ? (
                <div className="flex items-center justify-center py-12">
                  <p className="text-sm text-gray-500">Loading loans...</p>
                </div>
              ) : data.length === 0 ? (
                <div className="flex items-center justify-center py-12">
                  <p className="text-sm text-gray-500">No loans found</p>
                </div>
              ) : (
                <TableWithPagination
                  columns={columns}
                  data={data}
                  onRowClick={handleRowClick}
                />
              )}
            </CardContent>
          </Card>
        </div>

        {selectedLoan && (
          <div className="lg:col-span-1">
            <LoanDetailsSidebar
              loan={selectedLoan}
              onClose={handleCloseSidebar}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LoansContent;
