interface StatListCardProps {
  title: string;
  rows: Array<{ label: string; value: string | number }>;
}

export default function StatListCard({ title, rows }: StatListCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 p-4 bg-white">
      <h3 className="text-sm font-medium text-gray-600 mb-3">{title}</h3>
      <div className="flex flex-col gap-2 text-sm text-gray-900">
        {rows.map((row) => (
          <div key={row.label} className="flex justify-between">
            <span>{row.label}</span>
            <span>{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
