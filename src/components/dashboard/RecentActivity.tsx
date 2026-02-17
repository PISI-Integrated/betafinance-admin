"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface RecentActivityProps {
  recentActivity: IRecentActivityResponse | undefined;
  isLoading: boolean;
}

export function RecentActivity({
  recentActivity,
  isLoading,
}: RecentActivityProps) {
  return (
    <Card className="overflow-hidden rounded-lg border-gray-200 bg-white shadow-none">
      <CardHeader className="border-b border-gray-200 pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Recent activities
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <ActivitySkeleton />
        ) : (
          <Table>
            <TableBody>
              {recentActivity?.activities?.map((activity) => (
                <TableRow key={activity.id} className="hover:bg-gray-50/50">
                  <TableCell className="w-[45%]">
                    <div className="flex items-center gap-x-3">
                      <Avatar className="h-9 w-9 border border-gray-100">
                        {activity.user.avatar && (
                          <AvatarImage
                            src={activity.user.avatar}
                            alt={activity.user.name}
                          />
                        )}
                        <AvatarFallback className="bg-blue-50 text-xs font-semibold text-blue-600">
                          {activity.user.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {activity.user.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {activity.action}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="w-[30%]">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400">
                        {activity.timestamp || "N/A"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="w-[25%] text-right">
                    <Badge
                      variant={
                        activity.status.toLowerCase() === "completed" ||
                        activity.status.toLowerCase() === "success"
                          ? "success"
                          : activity.status.toLowerCase() === "pending"
                            ? "pending"
                            : "secondary"
                      }
                      className="capitalize font-medium"
                    >
                      {activity.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              {(!recentActivity?.activities ||
                recentActivity.activities.length === 0) && (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="h-24 text-center text-sm text-gray-500"
                  >
                    No recent activities found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

function ActivitySkeleton() {
  return (
    <div className="p-4 space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex items-center gap-x-4">
          <Skeleton className="h-9 w-9 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      ))}
    </div>
  );
}
