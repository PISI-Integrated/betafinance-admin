"use client";

import { Chart } from "@/components/Chart";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { overviewItems } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";
import {
  useFetchOverviewService,
  useFetchTopRankingCreditScoresService,
  useFetchTopRankingLendersService,
} from "@/services/analytics.service";

export default function Home() {
  const table = overviewItems.overviewTables;

  const { overviewData } = useFetchOverviewService();

  const { topRankingLenders } = useFetchTopRankingLendersService();
  const { topRankingCreditScores } = useFetchTopRankingCreditScoresService();

  return (
    <main className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 rounded border border-[#E5E7EB] bg-white md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {overviewItems.overviewHead.map((item, index) => (
          <Card
            key={index}
            className={cn(
              "border-y-0 border-l-0 rounded-none bg-white",
              "border-r-0",
              // For grid-cols-1: add border-b except last item
              "border-b-[#E5E7EB]",
              index !== overviewItems.overviewHead.length - 1 && "border-b",
              index === overviewItems.overviewHead.length - 1 && "border-b-0",
              // For md (2 cols): add right border except for every 2nd item, add border-b except last row
              "md:border-r-[#E5E7EB] md:border-r md:border-b-0",
              (index + 1) % 2 === 0 && "md:border-r-0",
              index < overviewItems.overviewHead.length - 2 &&
                "md:border-b-[#E5E7EB] md:border-b",
              // For lg (5 cols): add right border except last, remove border-b
              "lg:border-b-0 lg:border-r-[#E5E7EB] lg:border-r",
              index === overviewItems.overviewHead.length - 1 &&
                "border-0 md:border-0 lg:border-0",
            )}
          >
            <CardHeader className="pb-2">
              <CardDescription className="text-xs  text-[#95989E] truncate">
                {item.title}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              <p className="text-2xl font-bold text-gray-900 text-wrap break-words">
                {item.content}
              </p>
              {item.footer && (
                <p className="text-xs text-black">
                  {item.footer}{" "}
                  <span className="text-[#95989E]">in the last 30 days</span>
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Top Rankings and Credit Score */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {table.map((tableData, tableIndex) => (
          <Card
            key={tableIndex}
            className="overflow-hidden rounded-lg border-gray-200 bg-white"
          >
            <CardHeader className="border-b border-gray-200 pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900">
                {tableData.tableName}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableBody>
                  {tableData.rows.map((item, rowIndex) => (
                    <TableRow key={rowIndex} className="w-full">
                      <TableCell>
                        <div className="flex items-center gap-x-2">
                          <span className=" font-semibold text-gray-900">
                            {item.holder.id}
                          </span>
                          <Image
                            src={item.holder.icon}
                            alt={item.holder.name}
                            width={16}
                            height={16}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="flex items-center gap-x-2">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-blue-100 text-sm font-semibold text-blue-600">
                            {item.holder.initial}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {item.holder.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {item.holder.username}
                          </p>
                        </div>
                      </TableCell>
                      {item.email && (
                        <TableCell className="text-sm text-gray-500">
                          {item.email}
                        </TableCell>
                      )}
                      <TableCell className="text-right font-semibold text-gray-900">
                        {item.noOfLoan || item.score}
                        {item.noOfLoan && (
                          <span className="block text-xs text-gray-500">
                            Loans
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <Card className="overflow-hidden rounded-lg border-gray-200 bg-white">
        <CardHeader className="border-b border-gray-200 pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Loan collection summary
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 w-full h-[400px]">
          <Chart />
        </CardContent>
      </Card>
    </main>
  );
}
