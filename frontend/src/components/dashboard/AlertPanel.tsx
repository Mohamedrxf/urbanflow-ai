import StatListCard from "./StatListCard";

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
    <StatListCard
      title="Alerts"
      rows={[
        { label: "Total Alerts", value: totalAlerts },
        { label: "Critical Alerts", value: criticalAlerts },
        { label: "Warning Alerts", value: warningAlerts },
      ]}
    />
  );
}
