interface FleetStatusProps {
  active: number;
  idle: number;
  maintenance: number;
}

export default function FleetStatus({ active, idle, maintenance }: FleetStatusProps) {
  return (
    <div className="rounded-lg border border-gray-200 p-4 bg-white">
      <h3 className="text-sm font-medium text-gray-600 mb-3">Fleet Status</h3>
      <div className="flex flex-col gap-2 text-sm text-gray-900">
        <div className="flex justify-between">
          <span>Active Vehicles</span>
          <span>{active}</span>
        </div>
        <div className="flex justify-between">
          <span>Idle Vehicles</span>
          <span>{idle}</span>
        </div>
        <div className="flex justify-between">
          <span>Maintenance</span>
          <span>{maintenance}</span>
        </div>
      </div>
    </div>
  );
}