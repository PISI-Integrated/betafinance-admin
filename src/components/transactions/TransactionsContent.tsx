"use client";
import { ReactNode, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import TableWithPagination from "@/components/TableWithPagination";
import { Column } from "@/types/types";
import useFetchAllTransactionsService from "@/services/transactions.service";
import { useFetchOverviewService } from "@/services/analytics.service";
import { cn, formatDate, formatEnumString } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import toast from "react-hot-toast";
import { useDebounce } from "@/hooks/useDebounce";
import { formatCurrency } from "@/lib/utils/formatters";

interface TransactionRow {
  reference: ReactNode;
  userName: string;
  userPhone: string;
  amount: ReactNode;
  type: ReactNode;
  status: ReactNode;
  createdAt: React.ReactNode;
  qoreIDFee?: React.ReactNode;
  productFee?: React.ReactNode;
  whTax?: React.ReactNode;
}

const TransactionsContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const activeTab = searchParams.get("tab") || "all";
  const typeFilter = searchParams.get("type") || "all_types";
  const statusFilter = searchParams.get("status") || "all_status";

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState<regionType>("all");
  const debouncedSearch = useDebounce(search, 1000);

  const updateQueryParam = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" || value === "all_types" || value === "all_status") {
      params.delete(name);
    } else {
      params.set(name, value);
    }
    setPage(1); // Reset page on filter change
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const transactionParams = useMemo(() => {
    const params: Partial<ITransactionParamsDto> = {
      page,
      size,
    };

    if (debouncedSearch) params.search = debouncedSearch;
    if (activeTab !== "all") params.status = activeTab;
    if (typeFilter !== "all_types") params.type = typeFilter;
    if (statusFilter !== "all_status") params.status = statusFilter;
    if (region !== "all") params.region = region;
    return params as ITransactionParamsDto;
  }, [
    page,
    size,
    debouncedSearch,
    activeTab,
    region,
    typeFilter,
    statusFilter,
  ]);

  const { transactionData, transactionLoading } =
    useFetchAllTransactionsService(transactionParams);

  const totalPagesFromApi = Math.ceil(
    (transactionData?.total ?? 0) / (transactionData?.page_size ?? size),
  );

  const { overviewData, isOverviewLoading } = useFetchOverviewService();

  const columns: Column<TransactionRow>[] = [
    { header: "TXN Ref", accessor: "reference" },
    { header: "Name", accessor: "userName" },
    { header: "Phone Number", accessor: "userPhone" },
    { header: "Type", accessor: "type" },
    { header: "Gross Paid", accessor: "amount" },
    { header: "Verification Status", accessor: "status" },
    { header: "Time", accessor: "createdAt" },
  ];

  const copyTransactionRef = (ref: string) => {
    navigator.clipboard.writeText(ref);
    toast.success("Transaction reference copied to clipboard");
  };

  const data = useMemo<TransactionRow[]>(() => {
    if (!transactionData?.items) return [];

    return transactionData.items.map((tx) => ({
      reference: (
        <div
          className="truncate max-w-[200px] cursor-pointer"
          onClick={() => copyTransactionRef(tx.reference)}
        >
          {tx.reference}
        </div>
      ),
      userName: tx.userName,
      userPhone: tx.userPhone,
      amount: (
        <span className="font-semibold text-gray-900">
          {formatCurrency(
            Number(tx.amount),
            tx.currency === "UGX" ? "UG" : "NG",
          )}
        </span>
      ),
      createdAt: (
        <div className="flex flex-col">
          <span className="text-sm text-gray-900">
            {formatDate(tx.createdAt, true).split(" at ")[0]}
          </span>
          <span className="text-xs text-gray-500">
            {formatDate(tx.createdAt, true).split(" at ")[1] || "09:30 AM"}
          </span>
        </div>
      ),
      status: (
        <Badge
          variant={
            tx.status === "completed"
              ? "success"
              : tx.status === "pending"
                ? "pending"
                : "destructive"
          }
          className="capitalize rounded-md px-3 py-1 font-medium"
        >
          {tx.status === "completed" && (
            <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-600" />
          )}
          {tx.status === "pending" && (
            <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-amber-600" />
          )}
          {tx.status === "failed" && (
            <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-destructive" />
          )}
          {tx.status === "completed" ? "Success" : formatEnumString(tx.status)}
        </Badge>
      ),
      type: (
        <Badge
          variant="secondary"
          className={cn(
            "border-none flex items-center gap-1 w-fit px-2 py-0.5",
            {
              "bg-[#FFF1F3] text-[#FF5A70]": tx.type === "debit",
              "bg-[#DCFCE7] text-[#016630]": tx.type === "credit",
            },
          )}
        >
          {tx.type === "debit" ? (
            <ArrowUpRight className="h-3 w-3" />
          ) : (
            <ArrowDownRight className="h-3 w-3" />
          )}
          {tx.type === "debit" ? "Debit" : "Credit"}
        </Badge>
      ),
    }));
  }, [transactionData]);

  const stats = [
    {
      title: "Total Transaction Volume",
      value: formatCurrency(
        overviewData?.total_transaction_volume ?? 0,
        region,
      ),
      footer: "Overall platform volume",
    },
    {
      title: "Total Revenue",
      value: formatCurrency(overviewData?.total_revenue ?? 0, region),
      footer: "Net platform revenue",
    },
    {
      title: "Total Credit Transactions",
      value: formatCurrency(
        overviewData?.total_credit_transactions ?? 0,
        region,
      ),
      footer: "Incoming transactions",
    },
    {
      title: "Total Debit Transactions",
      value: formatCurrency(
        overviewData?.total_debit_transactions ?? 0,
        region,
      ),
      footer: "Outgoing transactions",
    },
  ];

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-outfit">
            Transactions
          </h1>
          <p className="text-sm text-gray-500">
            Monitor and manage all platform transactions.
          </p>
        </div>
        {/* <Button className="bg-[#3366FF] hover:bg-[#2952CC] text-white px-6">
          Generate Report
        </Button> */}
      </div>

      {/* Stats Cards */}
      <div className="flex flex-col flex-wrap md:flex-row gap-4 w-full">
        {stats.map((stat, i) => (
          <Card
            key={i}
            className="border-gray-200 shadow-none min-w-[200px] flex-grow"
          >
            <CardHeader className="pb-2">
              <CardDescription className="text-xs font-semibold text-gray-900 h-8 line-clamp-2">
                {stat.title}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isOverviewLoading ? (
                <div className="h-8 w-24 animate-pulse rounded bg-gray-100" />
              ) : (
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
              )}
              <div className="text-[10px] text-gray-500 mt-1">
                {stat.footer}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-white border border-gray-200 p-4 rounded-xl flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#919EAB]" />
          <Input
            placeholder="Search by reference, phone, or customer..."
            className="bg-[rgba(145,_158,_171,_0.08)] pl-10 border-gray-200 py-4"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Select
          value={typeFilter}
          onValueChange={(val) => updateQueryParam("type", val)}
        >
          <SelectTrigger className="w-[180px] bg-[rgba(145,_158,_171,_0.08)]">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all_types">All Types</SelectItem>
            <SelectItem value="credit">Credit</SelectItem>
            <SelectItem value="debit">Debit</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={statusFilter}
          onValueChange={(val) => updateQueryParam("status", val)}
        >
          <SelectTrigger className="w-[200px] bg-[rgba(145,_158,_171,_0.08)]">
            <SelectValue placeholder="Filter By All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all_status">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={region}
          onValueChange={(val) => setRegion(val as regionType)}
        >
          <SelectTrigger className="w-[180px] bg-[rgba(145,_158,_171,_0.08)]">
            <SelectValue placeholder="All Regions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            <SelectItem value="NG">Nigeria</SelectItem>
            <SelectItem value="UG">Uganda</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabs and Table */}
      <Card className="border-gray-200 shadow-none overflow-hidden">
        <div className="flex items-center gap-8 px-6 pt-6 border-b border-gray-100 mb-4">
          {[
            { id: "all", label: "All" },
            {
              id: "completed",
              label: "Successful",
              color: "bg-[#E6F9F0] text-[#008A4B]",
            },
            {
              id: "pending",
              label: "Processing",
              color: "bg-[#FFF8E6] text-[#B28A00]",
            },
            {
              id: "failed",
              label: "Failed",
              color: "bg-[#FFF1F3] text-[#FF5A70]",
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => updateQueryParam("tab", tab.id)}
              className={`pb-4 text-sm font-medium transition-colors relative flex items-center gap-2 ${
                activeTab === tab.id
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    tab.color || "bg-[#F2F4F7] text-[#344054]"
                  }`}
                >
                  {transactionData?.total ?? 0}
                </span>
              )}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
              )}
            </button>
          ))}
        </div>

        <CardContent className="p-0">
          <TableWithPagination
            columns={columns}
            data={data}
            currentPage={page}
            totalPages={totalPagesFromApi}
            itemsPerPage={size}
            onPageChange={setPage}
            isLoading={transactionLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionsContent;
