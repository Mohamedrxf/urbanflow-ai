import StatListCard from "./StatListCard";

interface FleetStatusProps {
  active: number;
  idle: number;
  maintenance: number;
}

export default function FleetStatus({ active, idle, maintenance }: FleetStatusProps) {
  return (
    <StatListCard
      title="Fleet Status"
      rows={[
        { label: "Active Vehicles", value: active },
        { label: "Idle Vehicles", value: idle },
        { label: "Maintenance", value: maintenance },
      ]}
    />
  );
}
