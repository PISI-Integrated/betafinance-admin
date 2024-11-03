import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Column } from "@/types/types";

interface TableWithPaginationProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (user: T) => void;
}

const TableWithPagination = <T,>({
  columns,
  data,
  onRowClick,
}: TableWithPaginationProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Card className="overflow-x-auto p-0 bg-white">
      <Table className="min-w-full text-black">
        <TableHeader className="bg-gray-50">
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index} className="text-left px-4 py-2 text-xs">
                {column.header}
              </TableCell>
            ))}
            <TableCell className="text-center py-2 text-xs"></TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              onClick={() => onRowClick && onRowClick(row)}
              className="cursor-pointer hover:bg-gray-100"
            >
              {columns.map((column, index) => (
                <TableCell key={index} className="text-left px-4 py-2">
                  {row[column.accessor] as React.ReactNode}
                </TableCell>
              ))}
              <TableCell className="text-center">
                <Button
                  variant="ghost"
                  className="text-gray-500 hover:text-gray-700 border-[1px] border-gray-300 text-center rounded-md px-2 py-0"
                >
                  ...
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex flex-col md:flex-row items-center justify-between p-4 border-t-[1px] border-gray-300">
        <span className="text-sm text-gray-400">Page {currentPage} of 6</span>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            // (prev) => Math.max(prev - 1, 1))}
          >
            {"<"}
          </Button>
          {/* {Array.from({ length: totalPages }, (_, index) => index + 1) */}
          {[1, 2, 3, 4, 5, 6].map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "ghost"}
              className={`px-3 py-1 ${
                page === currentPage
                  ? "bg-primary-light text-black"
                  : "text-gray-400"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="ghost"
            onClick={
              () => setCurrentPage(Math.min(currentPage + 1, 6))
              // (prev) => Math.min(prev + 1, totalPages))
            }
          >
            {">"}
          </Button>
        </div>
        <div></div>
      </div>
    </Card>
  );
};

export default TableWithPagination;
