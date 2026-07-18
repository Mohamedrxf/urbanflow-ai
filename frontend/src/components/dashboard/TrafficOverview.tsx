interface TrafficOverviewProps {
  congestionLevel: string;
  avgSpeed: string;
  incidents: number;
}

export default function TrafficOverview({
  congestionLevel,
  avgSpeed,
  incidents,
}: TrafficOverviewProps) {
  return (
    <div className="rounded-lg border border-gray-200 p-4 bg-white">
      <h3 className="text-sm font-medium text-gray-600 mb-3">Traffic Overview</h3>
      <div className="flex flex-col gap-2 text-sm text-gray-900">
        <div className="flex justify-between">
          <span>Congestion Level</span>
          <span>{congestionLevel}</span>
        </div>
        <div className="flex justify-between">
          <span>Average Speed</span>
          <span>{avgSpeed}</span>
        </div>
        <div className="flex justify-between">
          <span>Incidents</span>
          <span>{incidents}</span>
        </div>
      </div>
    </div>
  );
}