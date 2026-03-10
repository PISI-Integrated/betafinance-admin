"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getUserInitials } from "@/lib/utils/formatters";
import Icon from "@/lib/constants/icons";
import Image from "next/image";

interface RankingSectionProps {
  topRankingLenders: ITopRankssResponse | undefined;
  isTopLendersLoading: boolean;
  topRankingCreditScores: ITopRankssResponse | undefined;
  isTopScoresLoading: boolean;
}

export function RankingSection({
  topRankingLenders,
  isTopLendersLoading,
  topRankingCreditScores,
  isTopScoresLoading,
}: RankingSectionProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Top Ranking Lenders */}
      <Card className="overflow-hidden rounded-lg border-gray-200 bg-white">
        <CardHeader className="border-b border-gray-200 pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Top ranking lenders
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isTopLendersLoading ? (
            <RankingSkeleton />
          ) : (
            <Table>
              <TableBody>
                {topRankingLenders?.slice(0, 5).map((item, rowIndex) => (
                  <TableRow key={item.user_id} className="w-full">
                    <TableCell>
                      <div className="flex items-center gap-x-2">
                        <span className="font-semibold text-gray-900">
                          {item.rank}
                        </span>
                        <Image
                          src={
                            rowIndex === 0
                              ? Icon.ArrowUp
                              : rowIndex === 2
                                ? Icon.ArrowDown
                                : Icon.Minus
                          }
                          alt="rank indicator"
                          width={16}
                          height={16}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="flex items-center gap-x-2">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-blue-100 text-sm font-semibold text-blue-600">
                          {getUserInitials(item.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="capitalize text-sm font-semibold text-gray-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {item.username}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {item.email || "-"}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-gray-900">
                      {item.total_loans || 0}
                      <span className="block text-xs text-gray-500">Loans</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Highest Credit Score Holders */}
      <Card className="overflow-hidden rounded-lg border-gray-200 bg-white">
        <CardHeader className="border-b border-gray-200 pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Highest credit score holders
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isTopScoresLoading ? (
            <RankingSkeleton />
          ) : (
            <Table>
              <TableBody>
                {topRankingCreditScores?.slice(0, 5).map((item, rowIndex) => (
                  <TableRow key={item.user_id} className="w-full">
                    <TableCell>
                      <div className="flex items-center gap-x-2">
                        <span className="font-semibold text-gray-900">
                          {item.rank}
                        </span>
                        <Image
                          src={
                            rowIndex === 0
                              ? Icon.Minus
                              : rowIndex === 1
                                ? Icon.ArrowDown
                                : Icon.ArrowUp
                          }
                          alt="rank indicator"
                          width={16}
                          height={16}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="flex items-center gap-x-2">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-blue-100 text-sm font-semibold text-blue-600">
                          {getUserInitials(item.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="capitalize text-sm font-semibold text-gray-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {item.username}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {item.email || "-"}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-gray-900">
                      {item.credit_score || 0}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function RankingSkeleton() {
  return (
    <div className="p-4 space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex items-center gap-x-4">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-4 w-20" />
        </div>
      ))}
    </div>
  );
}
