interface AlertPanelProps {
  totalAlerts: number;
  criticalAlerts: number;
  warningAlerts: number;
}

export default function AlertPanel({
  totalAlerts,
  criticalAlerts,
  warningAlerts,
}: AlertPanelProps) {
  return (
    <div className="rounded-lg border border-gray-200 p-4 bg-white">
      <h3 className="text-sm font-medium text-gray-600 mb-3">Alerts</h3>
      <div className="flex flex-col gap-2 text-sm text-gray-900">
        <div className="flex justify-between">
          <span>Total Alerts</span>
          <span>{totalAlerts}</span>
        </div>
        <div className="flex justify-between">
          <span>Critical Alerts</span>
          <span>{criticalAlerts}</span>
        </div>
        <div className="flex justify-between">
          <span>Warning Alerts</span>
          <span>{warningAlerts}</span>
        </div>
      </div>
    </div>
  );
}