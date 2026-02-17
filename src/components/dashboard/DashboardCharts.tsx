"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Cell,
  Pie,
  PieChart,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { useFetchLoansCountService } from "@/services/loans.service";
import { useFetchMonthlyTrendService } from "@/services/analytics.service";

const barConfig = {
  users: {
    label: "New Users",
    color: "#3b82f6",
  },
  loans: {
    label: "Active Loans",
    color: "#10b981",
  },
  transactions: {
    label: "Transactions",
    color: "#f59e0b",
  },
} satisfies ChartConfig;

const pieConfig = {
  p2p: {
    label: "P2P Loans",
    color: "#3b82f6",
  },
  b2c: {
    label: "B2C Loans",
    color: "#10b981",
  },
  other: {
    label: "Other",
    color: "#f59e0b",
  },
} satisfies ChartConfig;

export function DashboardCharts() {
  const { loanCount: b2cCount, isLoanCountLoading: isB2CLoading } =
    useFetchLoansCountService({
      loan_type: "b2c",
    });

  const { loanCount: p2pCount, isLoanCountLoading: isP2PLoading } =
    useFetchLoansCountService({
      loan_type: "p2p",
    });

  const { monthlyTrend, isMonthlyTrendLoading } = useFetchMonthlyTrendService();

  const dynamicBarData = monthlyTrend?.trends || [];

  const dynamicPieData = [
    { type: "p2p", value: p2pCount?.count || 0, fill: "#3b82f6" },
    { type: "b2c", value: b2cCount?.count || 0, fill: "#10b981" },
  ];

  const isLoading = isB2CLoading || isP2PLoading || isMonthlyTrendLoading;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Bar Chart */}
      <Card className="rounded-lg border-gray-200 bg-white shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-gray-900 font-inter">
            Business Growth
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Monthly comparison of users, loans and transactions
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[350px] w-full pt-4">
          <ChartContainer config={barConfig} className="h-full w-full">
            <BarChart
              data={dynamicBarData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="name"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="users"
                fill="var(--color-users)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="loans"
                fill="var(--color-loans)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="transactions"
                fill="var(--color-transactions)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Pie Chart */}
      <Card className="rounded-lg border-gray-200 bg-white shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-gray-900 font-inter">
            Loan Distribution
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Breakdown of loan types by volume
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[350px] w-full pt-4">
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-gray-500">Loading distribution...</p>
            </div>
          ) : (
            <ChartContainer
              config={pieConfig}
              className="mx-auto aspect-square max-h-[300px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={dynamicPieData}
                  dataKey="value"
                  nameKey="type"
                  innerRadius={60}
                  strokeWidth={5}
                  outerRadius={100}
                  paddingAngle={5}
                >
                  {dynamicPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartLegend content={<ChartLegendContent nameKey="type" />} />
              </PieChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
