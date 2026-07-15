"use client";
import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { loanData, LoanTabs } from "@/lib/constants";
import TableWithPagination from "@/components/TableWithPagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Column, LoanBetaRow, LoanP2PRow } from "@/types/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LoanDetailsSidebar from "../LoanDetailsSidebar";
import {
  useFetchAllLoansService,
  useFetchTotalLoansAmountService,
} from "@/services/loans.service";
import { formatCurrency } from "@/lib/utils/formatters";
import TableSkeleton from "../TableSkeleton";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const LoansContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read directly from URL params
  const activeTab = searchParams.get("tab") || LoanTabs.BETA_LOANS;
  const activeStatus = searchParams.get("status") || "all";

  const loanType = activeTab === LoanTabs.P2P ? "p2p" : "b2c";

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const [region, setRegion] = useState<regionType>("all");

  const loanParams = useMemo<ILoansParamsDto>(() => {
    const params: ILoansParamsDto = {
      loan_type: loanType as loanType,
      page,
      size,
    };

    if (activeStatus !== "all") {
      params.loan_status = activeStatus as loanStatus;
    }

    if (region !== "all") {
      params.region = region;
    }

    return params;
  }, [loanType, activeStatus, page, size, region]);

  const { allLoans, isLoansLoading, loanError } =
    useFetchAllLoansService(loanParams);
  const totalPagesFromApi = Math.ceil(allLoans?.total! / allLoans?.page_size!);

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
        amount: formatCurrency(loan.amount, region),
        borrower: loan.borrower,
        loanPeriod: `${loan.termdays} days`,
        date: formatDate(loan.createdat, true),
        status: (
          <Badge
            variant={
              loan.status === "repaid"
                ? "success"
                : loan.status === "pending"
                  ? "pending"
                  : "outline"
            }
            className="capitalize"
          >
            {loan.status}
          </Badge>
        ),
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

  const handleTabChange = (tab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    params.set("status", "all");
    router.replace(pathname + "?" + params.toString());
    setSelectedLoan(null);
  };

  const handleStatusChange = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("status", status);
    router.replace(pathname + "?" + params.toString());
  };

  const [selectedLoan, setSelectedLoan] = useState<any>(null);

  const handleRowClick = (loan: any) => {
    setSelectedLoan(loan);
  };

  const handleCloseSidebar = () => {
    setSelectedLoan(null);
  };

  useEffect(() => {
    setPage(1);
  }, [activeTab]);

  const { totalLoansAmount, isTotalLoansAmountLoading } =
    useFetchTotalLoansAmountService({
      loan_type: loanType as loanType,
      loan_status: "repaid",
      region: region !== "all" ? region : undefined,
    });

  useEffect(() => {
    if (loanError) {
      toast.error(loanError?.response.data.detail || "Something went wrong");
    }
  }, [loanError]);

  return (
    <div className="space-y-6">
      {/* Main Tabs */}
      <div className="flex gap-2">
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
      </div>

      {/* KPI Card */}
      <Card className="rounded-lg border-gray-200 bg-white w-fit">
        <CardHeader className="pb-3">
          <CardDescription className="text-xs font-medium text-gray-500">
            {activeTab === LoanTabs.P2P
              ? "Total amount of P2P Loans"
              : "Total amount of Beta loans"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isTotalLoansAmountLoading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(totalLoansAmount?.amount!, region)}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Status Tabs and Filters */}
      <div className="flex items-center justify-between border-b border-gray-200">
        <div className="flex gap-4">
          {activeTab === LoanTabs.BETA_LOANS ? (
            <>
              <button
                className={`pb-3 text-sm font-medium transition-colors ${
                  activeStatus === "all"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => handleStatusChange("all")}
              >
                All
              </button>
              <button
                className={`pb-3 text-sm font-medium transition-colors ${
                  activeStatus === "funded"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => handleStatusChange("funded")}
              >
                Active
              </button>
              <button
                className={`pb-3 text-sm font-medium transition-colors ${
                  activeStatus === "repaid"
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
                className={`pb-3 text-sm font-medium transition-colors ${
                  activeStatus === "all"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => handleStatusChange("all")}
              >
                All
              </button>
              <button
                className={`pb-3 text-sm font-medium transition-colors ${
                  activeStatus === "funded"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => handleStatusChange("funded")}
              >
                Active
              </button>
              <button
                className={`pb-3 text-sm font-medium transition-colors ${
                  activeStatus === "pending"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => handleStatusChange("pending")}
              >
                Pending
              </button>
              <button
                className={`pb-3 text-sm font-medium transition-colors ${
                  activeStatus === "repaid"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                // For P2P, "Completed" tab maps to "repaid" status
                onClick={() => handleStatusChange("repaid")}
              >
                Completed
              </button>
            </>
          )}
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

      {/* Table */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className={selectedLoan ? "lg:col-span-2" : "lg:col-span-3"}>
          <Card className="overflow-hidden rounded-lg p-0 border-gray-200 bg-white">
            <CardContent className="p-0">
              {isLoansLoading ? (
                <TableSkeleton columnsCount={columns.length} rows={5} />
              ) : data.length === 0 ? (
                <div className="flex items-center justify-center py-12">
                  <p className="text-sm text-gray-500">No loans found</p>
                </div>
              ) : (
                <TableWithPagination
                  columns={columns}
                  data={data}
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
