import { ChevronDown, Download } from "lucide-react";
import { Button } from "../ui/button";
import { DateRangePicker } from "../ui/date-range-picker";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useExportLoansService,
  useExportOverviewService,
  useExportTransactionsService,
  useExportUsersService,
} from "@/services/export.service";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const HeaderOps = ({ currentPath }: { currentPath: string }) => {
  const [format, setFormat] = useState<"pdf" | "csv">("pdf");

  // Pages with date filters and download button
  const hasDateFilters =
    currentPath === "/" ||
    currentPath === "/loans" ||
    currentPath === "/transactions" ||
    currentPath === "/marketers";

  // All pages except help, settings and marketers have download button
  const hasDownload =
    currentPath !== "/help" &&
    currentPath !== "/settings" &&
    currentPath !== "/marketers";

  const router = useRouter();

  const openCreateMarketerModal = () => {
    const params = new URLSearchParams(window.location.search);
    params.set("add-marketer", "true");
    router.push(`${currentPath}?${params.toString()}`);
  };

  const searchParams = useSearchParams();
  const start_date = searchParams.get("start_date") || undefined;
  const end_date = searchParams.get("end_date") || undefined;
  const tab = searchParams.get("tab") || undefined;
  const status = searchParams.get("status") || undefined;
  const type = searchParams.get("type") || undefined;

  const { exportOverview, isExportOverviewPending } =
    useExportOverviewService();
  const { exportLoans, isExportLoansPending } = useExportLoansService();
  const { exportUsers, isExportUsersPending } = useExportUsersService();
  const { exportTransactions, isExportTransactionsPending } =
    useExportTransactionsService();

  const isExportPending =
    isExportOverviewPending ||
    isExportLoansPending ||
    isExportUsersPending ||
    isExportTransactionsPending;

  const handleDownload = (selectedFormat?: "pdf" | "csv") => {
    const activeFormat = selectedFormat || format;
    const baseParams = {
      format: activeFormat,
      start_date,
      end_date,
    };

    if (currentPath === "/loans") {
      exportLoans({ ...baseParams, loan_type: tab as loanType });
    } else if (currentPath === "/customers") {
      exportUsers({ ...baseParams, kyc_status: tab as kycStatus });
    } else if (currentPath === "/transactions") {
      exportTransactions({
        ...baseParams,
        status: status as transactionStatus,
        type: type as transactionType,
      });
    } else {
      exportOverview(baseParams);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      {hasDateFilters && <DateRangePicker />}

      {hasDownload && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="bg-blue-100 text-blue-600 hover:bg-blue-200 px-3 md:px-4 flex items-center gap-2"
              disabled={isExportPending}
            >
              <Download className="h-4 w-4" />
              <span className="hidden md:inline">
                {isExportPending ? "Exporting..." : "Download"}
              </span>
              <ChevronDown className="h-3 w-3 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem
              onClick={() => {
                setFormat("pdf");
                handleDownload("pdf");
              }}
              className="cursor-pointer"
            >
              Export as PDF
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setFormat("csv");
                handleDownload("csv");
              }}
              className="cursor-pointer"
            >
              Export as CSV
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {currentPath === "/marketers" && (
        <Button
          onClick={openCreateMarketerModal}
          className="text-blue-600 text-sm font-normal bg-[#DEEBFF] px-3 md:px-4 shrink-0 hover:text-white"
        >
          <span className="md:hidden">+ Create</span>
          <span className="hidden md:inline">+ Create new marketer</span>
        </Button>
      )}
    </div>
  );
};

export default HeaderOps;
