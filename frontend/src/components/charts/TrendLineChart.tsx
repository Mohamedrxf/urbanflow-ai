import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { ComponentProps } from "react";

interface TrendLineChartProps {
  data: Array<Record<string, unknown>>;
  lines: Array<{ dataKey: string; stroke?: string }>;
  yAxis?: ComponentProps<typeof YAxis>;
  tooltipFormatter?: ComponentProps<typeof Tooltip>["formatter"];
  height?: number;
}

export default function TrendLineChart({
  data,
  lines,
  yAxis,
  tooltipFormatter,
  height = 250,
}: TrendLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis {...yAxis} />
        <Tooltip formatter={tooltipFormatter} />
        <Legend />
        {lines.map((line) => (
          <Line
            key={line.dataKey}
            type="monotone"
            dataKey={line.dataKey}
            stroke={line.stroke ?? "#2563eb"}
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
