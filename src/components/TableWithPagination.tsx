import React, { useState } from "react";
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

interface TableWithPaginationProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
}

const TableWithPagination = <T,>({
  columns,
  data,
  onRowClick,
}: TableWithPaginationProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = 6; // Fixed as shown in design

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200 hover:bg-transparent">
              {columns.map((column, index) => (
                <TableHead
                  key={index}
                  className="h-12 px-4 text-left align-middle text-xs font-medium text-gray-600"
                >
                  {column.header}
                </TableHead>
              ))}
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((row, rowIndex) => (
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
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-gray-200 px-4 py-4">
        <p className="text-sm text-gray-500">Page {currentPage} of 6</p>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {[1, 2, 3, 4, 5, 6].map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "ghost"}
              size="icon"
              onClick={() => handlePageChange(page)}
              className={`h-8 w-8 ${
                page === currentPage
                  ? "bg-blue-50 text-gray-900 hover:bg-blue-100"
                  : "text-gray-600"
              }`}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="w-24"></div>
      </div>
    </div>
  );
};

export default TableWithPagination;
