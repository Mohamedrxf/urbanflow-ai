import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface DistributionPieChartProps {
  slices: Array<{ name: string; value: number; color: string }>;
  tooltipLabel: string;
  height?: number;
}

export default function DistributionPieChart({
  slices,
  tooltipLabel,
  height = 250,
}: DistributionPieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={slices}
          cx="50%"
          cy="50%"
          outerRadius={70}
          dataKey="value"
          label={({ name, value }) => (value ? `${name}: ${value}` : null)}
        >
          {slices.map((slice) => (
            <Cell key={slice.name} fill={slice.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value}`, tooltipLabel]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
