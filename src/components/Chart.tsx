"use client";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartProps {
  data?: {
    label: number;
    total_collected: number;
  }[];
  isLoading?: boolean;
  period?: "day" | "week" | "month" | "year";
}

const chartConfig = {
  value: {
    label: "Amount",
    color: "#3b82f6",
  },
} satisfies ChartConfig;

const CustomDot = (props: any) => {
  const { cx, cy, payload } = props;
  if (payload.isLast) {
    return (
      <g>
        <circle
          cx={cx}
          cy={cy}
          r={6}
          fill="#3b82f6"
          stroke="#fff"
          strokeWidth={2}
        />
        <text
          x={cx}
          y={cy - 20}
          textAnchor="middle"
          fill="#000"
          fontSize={12}
          fontWeight={600}
        >
          ₦{(payload.value / 1000).toFixed(0)}K
        </text>
      </g>
    );
  }
  return null;
};

const getLabelSuffix = (period: string | undefined, label: number) => {
  if (period === "day") {
    const v = label % 10;
    const k = label % 100;
    if (v === 1 && k !== 11) return label + "st";
    if (v === 2 && k !== 12) return label + "nd";
    if (v === 3 && k !== 13) return label + "rd";
    return label + "th";
  }
  if (period === "month") {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[label - 1] || label.toString();
  }
  return label.toString();
};

export function Chart({
  data = [],
  isLoading = false,
  period = "month",
}: ChartProps) {
  const formattedData = data.map((item, index) => ({
    displayLabel: getLabelSuffix(period, item.label),
    value: item.total_collected,
    isLast: index === data.length - 1,
  }));

  if (isLoading) {
    return (
      <div className="flex h-[300px] w-full items-center justify-center">
        <p className="text-sm text-gray-500">Loading chart data...</p>
      </div>
    );
  }

  if (formattedData.length === 0) {
    return (
      <div className="flex h-[300px] w-full items-center justify-center">
        <p className="text-sm text-gray-500">
          No data available for this period.
        </p>
      </div>
    );
  }

  return (
    <ChartContainer
      config={chartConfig}
      className="h-full w-full"
      style={{ height: 300 }}
    >
      <AreaChart
        data={formattedData}
        margin={{
          top: 30,
          right: 30,
          left: 10,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#93c5fd" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#93c5fd" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#e5e7eb"
        />
        <XAxis
          dataKey="displayLabel"
          tickLine={false}
          axisLine={{ stroke: "#e5e7eb" }}
          tick={{ fill: "#6b7280", fontSize: 12 }}
          tickMargin={10}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fill: "#6b7280", fontSize: 12 }}
          tickFormatter={(value) =>
            `₦${value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}`
          }
        />
        <ChartTooltip
          content={<ChartTooltipContent />}
          cursor={{ stroke: "#3b82f6", strokeWidth: 1, strokeDasharray: "5 5" }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#3b82f6"
          strokeWidth={2}
          fill="url(#colorValue)"
          dot={<CustomDot />}
        />
      </AreaChart>
    </ChartContainer>
  );
}
