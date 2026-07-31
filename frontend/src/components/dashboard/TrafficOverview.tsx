import StatListCard from "./StatListCard";

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
    <StatListCard
      title="Traffic Overview"
      rows={[
        { label: "Congestion Level", value: congestionLevel },
        { label: "Average Speed", value: avgSpeed },
        { label: "Incidents", value: incidents },
      ]}
    />
  );
}
