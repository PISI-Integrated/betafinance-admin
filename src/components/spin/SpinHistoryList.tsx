"use client";
import TableWithPagination from "@/components/TableWithPagination";
import { ReactNode } from "react";
import { Column } from "@/types/types";
import TableSkeleton from "../TableSkeleton";
import { formatDate } from "@/lib/utils";

interface SpinHistoryListProps {
  data: ISpinHistoryResponse["items"];
  isLoading: boolean;
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

// Internal View Model
interface SpinHistoryTableRow {
  date: ReactNode;
  userId: ReactNode;
  reward: ReactNode;
  type: ReactNode;
  value: number;
}

const SpinHistoryList = ({
  data,
  isLoading,
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: SpinHistoryListProps) => {
  if (isLoading) {
    return <div className="p-4 text-center">Loading history...</div>;
  }

  if (!data || data.length === 0) {
    return <div className="p-4 text-center">No history found.</div>;
  }

  const columns: Column<SpinHistoryTableRow>[] = [
    { header: "Date", accessor: "date" },
    { header: "User ID", accessor: "userId" },
    { header: "Reward", accessor: "reward" },
    { header: "Type", accessor: "type" },
    { header: "Value", accessor: "value" },
  ];

  const tableData: SpinHistoryTableRow[] = data.map((item) => ({
    date: formatDate(item.created_at, true),
    userId: <span className="font-mono text-xs">{item.user_id}</span>,
    reward: <span className="font-medium">{item.reward_name}</span>,
    type: <span className="capitalize">{item.reward_type}</span>,
    value: item.reward_value,
  }));

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="rounded-md border bg-white">
      {
        isLoading ? (
          <TableSkeleton columnsCount={columns.length} rows={5} />
        ) : data.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-sm text-gray-500">No history found</p>
          </div>
        ) :
          <TableWithPagination
            columns={columns}
            data={tableData}
            currentPage={currentPage}
            totalPages={totalPages > 0 ? totalPages : 1}
            itemsPerPage={itemsPerPage}
            onPageChange={onPageChange}
          />}
    </div>
  );
};

export default SpinHistoryList;
