"use client";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Dot } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "1st", value: 120000 },
  { month: "2nd", value: 180000 },
  { month: "3rd", value: 190000 },
  { month: "4th", value: 180000 },
  { month: "5th", value: 150000 },
  { month: "6th", value: 100000 },
  { month: "7th", value: 80000 },
  { month: "8th", value: 70000 },
  { month: "9th", value: 75000 },
  { month: "10th", value: 80000 },
  { month: "11th", value: 90000 },
  { month: "12th", value: 85000 },
  { month: "13th", value: 70000 },
  { month: "14th", value: 50000 },
  { month: "15th", value: 80000 },
  { month: "16th", value: 120000 },
  { month: "17th", value: 150000 },
  { month: "18th", value: 220000 },
  { month: "19th", value: 240000 },
  { month: "20th", value: 230000 },
  { month: "21st", value: 210000 },
  { month: "22nd", value: 200000 },
  { month: "23rd", value: 280000 },
  { month: "24th", value: 284900, highlight: true },
  { month: "25th", value: 260000 },
  { month: "26th", value: 180000 },
  { month: "27th", value: 140000 },
  { month: "28th", value: 100000 },
  { month: "29th", value: 150000 },
  { month: "30th", value: 400000 },
];

const chartConfig = {
  value: {
    label: "Amount",
    color: "#3b82f6",
  },
} satisfies ChartConfig;

const CustomDot = (props: any) => {
  const { cx, cy, payload } = props;
  if (payload.highlight) {
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

export function Chart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="h-full w-full"
      style={{ height: 300 }}
    >
      <AreaChart
        data={chartData}
        margin={{
          top: 20,
          right: 20,
          left: 0,
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
          dataKey="month"
          tickLine={false}
          axisLine={{ stroke: "#e5e7eb" }}
          tick={{ fill: "#6b7280", fontSize: 12 }}
          tickFormatter={(value) => value.slice(0, -2)}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fill: "#6b7280", fontSize: 12 }}
          tickFormatter={(value) => `${value / 1000}k`}
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
