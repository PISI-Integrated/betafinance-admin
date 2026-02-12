import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "./ui/table";

interface TableSkeletonProps {
  columnsCount: number;
  rows?: number;
}

const TableSkeleton = ({ columnsCount, rows = 5 }: TableSkeletonProps) => {
  return (
    <Table>
      <TableHeader className="bg-[#F9FAFB]">
        <TableRow className="border-b border-gray-200">
          {Array.from({ length: columnsCount }).map((_, i) => (
            <TableHead key={i} />
          ))}
          <TableHead className="w-12" />
        </TableRow>
      </TableHeader>

      <TableBody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <TableRow
            key={rowIndex}
            className="border-b border-gray-100 animate-pulse"
          >
            {Array.from({ length: columnsCount }).map((_, colIndex) => (
              <TableCell key={colIndex} className="px-4 py-4">
                <div className="h-4 w-full rounded bg-gray-200" />
              </TableCell>
            ))}
            <TableCell className="px-4 py-4">
              <div className="h-4 w-4 rounded bg-gray-200 mx-auto" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableSkeleton;
