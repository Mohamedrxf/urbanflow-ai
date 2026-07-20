import { useEffect, useState } from "react";
import KpiCard from "../components/dashboard/KpiCard";
import FleetStatus from "../components/dashboard/FleetStatus";
import TrafficOverview from "../components/dashboard/TrafficOverview";
import PredictionWidget from "../components/dashboard/PredictionWidget";
import AlertPanel from "../components/dashboard/AlertPanel";
import MapPlaceholder from "../components/dashboard/MapPlaceholder";
import { getVehicles } from "../services/vehicleService";
import { getTraffic } from "../services/trafficService";
import { getIncidents } from "../services/incidentService";
import { getRoutes } from "../services/routeService";
import { useWebSocket } from "../hooks/useWebSocket";

export default function Dashboard() {
  const { isConnected, lastMessage } = useWebSocket();
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [traffic, setTraffic] = useState<any[]>([]);
  const [incidents, setIncidents] = useState<any[]>([]);
  const [routes, setRoutes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (lastMessage) {
      console.log("WebSocket:", lastMessage);
      try {
        const data = JSON.parse(lastMessage);
        if (data.event === "vehicle_updated") {
          loadDashboardData();
        }
      } catch {
        // ignore non-JSON messages
      }
    }
  }, [lastMessage]);

  const loadDashboardData = async () => {
    try {
      const vehiclesResponse = await getVehicles();
      setVehicles(vehiclesResponse.data);

      const trafficResponse = await getTraffic();
      setTraffic(trafficResponse.data);

      const incidentsResponse = await getIncidents();
      setIncidents(incidentsResponse.data);

      const routesResponse = await getRoutes();
      setRoutes(routesResponse.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const totalVehicles = vehicles.length;

  const dashboardMetrics = {
    activeVehicles: vehicles.filter((v: any) => v.status === "active").length,
    idleVehicles: vehicles.filter((v: any) => v.status === "idle").length,
    maintenanceVehicles: vehicles.filter((v: any) => v.status === "maintenance").length,
    avgSpeed: traffic.length
      ? `${Math.round(traffic.reduce((sum: number, t: any) => sum + (t.average_speed || 0), 0) / traffic.length)} km/h`
      : "0 km/h",
    trafficIncidentCount: traffic.length,
    congestionLevel: traffic.length ? traffic[0].congestion_level : "Low",
    optimizedRoutes: routes.length,
    accuracy: routes.length
      ? `${Math.round((routes.filter((r: any) => r.optimized_time_min < r.estimated_time_min).length / routes.length) * 100)}%`
      : "0%",
    predictedDelay: routes.length
      ? `${Math.round(routes.reduce((sum: number, r: any) => sum + ((r.estimated_time_min || 0) - (r.optimized_time_min || 0)), 0) / routes.length)} min`
      : "0 min",
    totalAlerts: incidents.length,
    criticalAlerts: incidents.filter((i: any) => i.severity === "critical").length,
    warningAlerts: incidents.filter((i: any) => i.severity === "warning").length,
    vehicleCount: vehicles.length,
    routeCount: routes.length,
    incidentCount: incidents.length,
  };

  const cards = [
    { title: "Fleet Status", value: String(totalVehicles), subtitle: "Active Vehicles" },
    { title: "Traffic Overview", value: dashboardMetrics.congestionLevel, subtitle: "City Traffic" },
    { title: "AI Predictions", value: dashboardMetrics.accuracy, subtitle: "Prediction Accuracy" },
    { title: "Active Alerts", value: String(dashboardMetrics.totalAlerts), subtitle: "Total Alerts" },
  ];

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <span className="text-sm">{isConnected ? "🟢 Live" : "🔴 Offline"}</span>
      </div>
      {error && <p className="text-red-600">{error}</p>}
      {!error && loading && <p className="text-gray-600">Loading dashboard data...</p>}
      {!error && !loading && (
        <>
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
            <FleetStatus active={dashboardMetrics.activeVehicles} idle={dashboardMetrics.idleVehicles} maintenance={dashboardMetrics.maintenanceVehicles} />
          </div>
          <div className="mt-6">
            <TrafficOverview congestionLevel={dashboardMetrics.congestionLevel} avgSpeed={dashboardMetrics.avgSpeed} incidents={dashboardMetrics.trafficIncidentCount} />
          </div>
          <div className="mt-6">
            <PredictionWidget accuracy={dashboardMetrics.accuracy} predictedDelay={dashboardMetrics.predictedDelay} optimizedRoutes={dashboardMetrics.optimizedRoutes} />
          </div>
          <div className="mt-6">
            <AlertPanel totalAlerts={dashboardMetrics.totalAlerts} criticalAlerts={dashboardMetrics.criticalAlerts} warningAlerts={dashboardMetrics.warningAlerts} />
          </div>
          <div className="mt-6">
            <MapPlaceholder title="Live Traffic Map" />
          </div>
        </>
      )}
    </div>
  );
}