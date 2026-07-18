import KpiCard from "../components/dashboard/KpiCard";
import FleetStatus from "../components/dashboard/FleetStatus";

export default function Dashboard() {
  const cards = [
    { title: "Fleet Status", value: "248", subtitle: "Active Vehicles" },
    { title: "Traffic Overview", value: "Moderate", subtitle: "City Traffic" },
    { title: "AI Predictions", value: "92%", subtitle: "Prediction Accuracy" },
    { title: "Active Alerts", value: "07", subtitle: "Critical Events" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((card) => (
          <KpiCard
            key={card.title}
            title={card.title}
            value={card.value}
            subtitle={card.subtitle}
          />
        ))}
      </div>
      <div className="mt-6">
        <FleetStatus active={248} idle={18} maintenance={6} />
      </div>
    </div>
  );
}