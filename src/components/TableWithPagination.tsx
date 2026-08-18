import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { Column } from "@/types/types";
import { ChevronLeft, ChevronRight, MoreVertical } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

interface TableWithPaginationProps<T> extends PaginationProps {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  isLoading?: boolean;
}

const TableWithPagination = <T,>({
  columns,
  data,
  onRowClick,
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  isLoading,
}: TableWithPaginationProps<T>) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getPageNumbers = (current: number, total: number): (number | string)[] => {
    const maxVisiblePages = 7;
    if (total <= maxVisiblePages) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    if (current <= 4) {
      return [1, 2, 3, 4, 5, "...", total];
    }

    if (current >= total - 3) {
      return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
    }

    return [1, "...", current - 1, current, current + 1, "...", total];
  };

  return (
    <div className="w-full ">
      <div className="overflow-x-auto whitespace-pre">
        <Table>
          <TableHeader className="bg-[#F9FAFB]">
            <TableRow className="border-b border-gray-200 hover:bg-transparent">
              {columns.map((column, index) => (
                <TableHead
                  key={index}
                  className="text-left align-middle text-xs font-medium text-[#757575]"
                >
                  {column.header}
                </TableHead>
              ))}
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {columns.map((_, colIndex) => (
                    <TableCell key={colIndex} className="px-4 py-4">
                      <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
                    </TableCell>
                  ))}
                  <TableCell />
                </TableRow>
              ))
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="px-4 py-8 text-center text-sm text-gray-500"
                >
                  No data found
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  onClick={() => onRowClick?.(row)}
                  className="cursor-pointer border-b border-gray-100 transition-colors hover:bg-blue-50"
                >
                  {columns.map((column, colIndex) => (
                    <TableCell
                      key={colIndex}
                      className="px-4 py-4 text-sm text-gray-900"
                    >
                      {row[column.accessor] as React.ReactNode}
                    </TableCell>
                  ))}
                  <TableCell className="px-4 py-4 text-center">
                    <button className="inline-flex h-6 w-6 items-center justify-center rounded hover:bg-gray-100">
                      <MoreVertical className="h-4 w-4 text-gray-400" />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-gray-200 px-4 py-4">
        <p className="text-sm text-gray-500 text-center sm:text-left">
          Page {totalPages === 0 ? 0 : currentPage} of {totalPages}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="h-8 w-8 text-gray-600 disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {getPageNumbers(currentPage, totalPages).map((page, index) => {
            if (typeof page === "string") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="flex h-8 w-8 items-center justify-center text-xs text-gray-400 select-none"
                >
                  ...
                </span>
              );
            }

            return (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "ghost"}
                size="icon"
                onClick={() => handlePageChange(page)}
                className={`h-8 w-8 text-xs ${
                  page === currentPage
                    ? "bg-blue-50 text-gray-900 hover:bg-blue-100 font-semibold"
                    : "text-gray-600"
                }`}
              >
                {page}
              </Button>
            );
          })}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages || totalPages === 0}
            className="h-8 w-8 text-gray-600 disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="hidden sm:block sm:w-24"></div>
      </div>
    </div>
  );
};

export default TableWithPagination;
