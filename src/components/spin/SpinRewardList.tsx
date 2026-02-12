
"use client";
import TableWithPagination from "@/components/TableWithPagination";
import { ReactNode } from "react";
import { Column } from "@/types/types";
import TableSkeleton from "../TableSkeleton";

interface SpinRewardListProps {
  data: SpinRewardItem[];
  isLoading: boolean;
  onEdit: (item: SpinRewardItem) => void;
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

// Internal View Model for Table
interface SpinRewardTableRow {
  original: SpinRewardItem;
  order: number;
  name: string;
  value: string | number;
  weight: number;
  type: ReactNode;
  status: ReactNode;
}

const SpinRewardList = ({
  data,
  isLoading,
  onEdit,
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: SpinRewardListProps) => {

  const columns: Column<SpinRewardTableRow>[] = [
    { header: "Order", accessor: "order" },
    { header: "Name", accessor: "name" },
    { header: "Value", accessor: "value" },
    { header: "Weight", accessor: "weight" },
    { header: "Type", accessor: "type" },
    { header: "Status", accessor: "status" },
  ];

  const tableData: SpinRewardTableRow[] = data.map((item, index) => ({
    original: item,
    order: (currentPage - 1) * itemsPerPage + index + 1,
    name: item.name,
    value: item.value,
    weight: item.weight,
    type: <span className="capitalize">{item.type}</span>,
    status: (
      <span
        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${item.is_active
          ? "bg-green-50 text-green-700"
          : "bg-red-50 text-red-700"
          }`}
      >
        {item.is_active ? "Active" : "Inactive"}
      </span>
    ),
  }));

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="rounded-md border bg-white">
      {
        isLoading ? (
          <TableSkeleton columnsCount={columns.length} rows={5} />
        ) : data.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-sm text-gray-500">No rewards found</p>
          </div>
        ) :
          <TableWithPagination
            columns={columns}
            data={tableData}
            onRowClick={(row) => onEdit(row.original)}
            currentPage={currentPage}
            totalPages={totalPages > 0 ? totalPages : 1}
            itemsPerPage={itemsPerPage}
            onPageChange={onPageChange}
          />}
    </div>
  );
};

export default SpinRewardList;
