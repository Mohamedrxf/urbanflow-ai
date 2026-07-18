interface KpiCardProps {
  title: string;
  value: string;
  subtitle: string;
}

export default function KpiCard({ title, value, subtitle }: KpiCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 p-4 bg-white">
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <p className="text-2xl font-semibold text-gray-900 mt-2">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}