import { useEffect, useState } from "react";
import KpiCard from "../components/dashboard/KpiCard";
import FleetStatus from "../components/dashboard/FleetStatus";
import TrafficOverview from "../components/dashboard/TrafficOverview";
import PredictionWidget from "../components/dashboard/PredictionWidget";
import AlertPanel from "../components/dashboard/AlertPanel";
import LiveMap from "../components/dashboard/LiveMap";
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
  const [selectedVehicle, setSelectedVehicle] = useState<any | null>(null);

  useEffect(() => {
    if (lastMessage) {
      console.log("WebSocket:", lastMessage);
      try {
        const data = JSON.parse(lastMessage);
        if (data.event === "vehicle_location") {
          setVehicles((prev) =>
            prev.map((v) =>
              v.vehicle_id === data.vehicle_id
                ? { ...v, latitude: data.latitude, longitude: data.longitude }
                : v
            )
          );
        } else if (data.event === "vehicle_updated") {
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
            <LiveMap vehicles={vehicles} routes={routes} traffic={traffic} incidents={incidents} selectedVehicle={selectedVehicle} onSelectVehicle={setSelectedVehicle} />
          </div>
          {selectedVehicle && (() => {
            const selectedRoute = routes.find((r: any) => r.vehicle_id === selectedVehicle.vehicle_id);
            const currentETA = selectedRoute ? selectedRoute.estimated_time_min : null;
            const optimizedETA = selectedRoute ? selectedRoute.optimized_time_min : null;
            const delay = currentETA !== null && optimizedETA !== null ? currentETA - optimizedETA : null;
            const timeSaved = delay;

            return (
              <div className="mt-6 rounded-lg border border-gray-200 p-4 bg-white">
                <h3 className="text-sm font-medium text-gray-600 mb-3">ETA Prediction</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">Current ETA</p>
                    <p className="font-medium">{currentETA !== null ? `${currentETA} min` : "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Optimized ETA</p>
                    <p className="font-medium">{optimizedETA !== null ? `${optimizedETA} min` : "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Delay</p>
                    <p className="font-medium">{delay !== null ? `${delay} min` : "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Time Saved</p>
                    <p className="font-medium">{timeSaved !== null ? `${timeSaved} min` : "N/A"}</p>
                  </div>
                </div>
              </div>
            );
          })()}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-600 mb-3">Fleet Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              <div className="rounded-lg border border-gray-200 p-4 bg-white">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Fleet Status</h4>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex justify-between">
                    <span>Active</span>
                    <span className="font-medium">{dashboardMetrics.activeVehicles}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Idle</span>
                    <span className="font-medium">{dashboardMetrics.idleVehicles}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Maintenance</span>
                    <span className="font-medium">{dashboardMetrics.maintenanceVehicles}</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-gray-200 p-4 bg-white">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Vehicle Types</h4>
                <div className="flex flex-col gap-2 text-sm">
                  {["Truck", "Ambulance", "Van", "Bike"].map((type) => (
                    <div className="flex justify-between" key={type}>
                      <span>{type}</span>
                      <span className="font-medium">{vehicles.filter((v: any) => v.vehicle_type === type).length}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-gray-200 p-4 bg-white">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Traffic Distribution</h4>
                <div className="flex flex-col gap-2 text-sm">
                  {["Low", "Medium", "High"].map((level) => (
                    <div className="flex justify-between" key={level}>
                      <span>{level}</span>
                      <span className="font-medium">{traffic.filter((t: any) => t.congestion_level === level).length}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-gray-200 p-4 bg-white">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Incident Distribution</h4>
                <div className="flex flex-col gap-2 text-sm">
                  {["Low", "Medium", "High"].map((level) => (
                    <div className="flex justify-between" key={level}>
                      <span>{level}</span>
                      <span className="font-medium">{incidents.filter((i: any) => i.severity === level).length}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-600 mb-3">Notification Center</h3>
            <div className="rounded-lg border border-gray-200 bg-white divide-y divide-gray-100">
              {(() => {
                const generatedNotifications = [
                  ...traffic.filter((t: any) => (t.congestion_level || "").toLowerCase() === "high").map((t: any, idx: number) => ({
                    id: `traffic-${idx}`,
                    icon: "🚦",
                    message: `Heavy traffic detected on ${t.road_name || "unknown road"}`,
                    timestamp: t.timestamp ? new Date(t.timestamp) : new Date(),
                  })),
                  ...incidents.filter((i: any) => (i.severity || "").toLowerCase() === "high").map((i: any, idx: number) => ({
                    id: `incident-${idx}`,
                    icon: "🚨",
                    message: "Critical incident reported",
                    timestamp: i.reported_at ? new Date(i.reported_at) : new Date(),
                  })),
                  ...vehicles.filter((v: any) => v.status !== "active").map((v: any) => ({
                    id: `vehicle-offline-${v.vehicle_id}`,
                    icon: "⚫",
                    message: `Vehicle ${v.vehicle_id} is offline`,
                    timestamp: v.created_at ? new Date(v.created_at) : new Date(),
                  })),
                  ...vehicles.filter((v: any) => v.status === "active").map((v: any) => ({
                    id: `vehicle-active-${v.vehicle_id}`,
                    icon: "🟢",
                    message: `Vehicle ${v.vehicle_id} is active`,
                    timestamp: v.created_at ? new Date(v.created_at) : new Date(),
                  })),
                  ...routes.filter((r: any) => (r.optimized_time_min || 0) < (r.estimated_time_min || 0)).map((r: any) => ({
                    id: `route-${r.route_id}`,
                    icon: "🛣️",
                    message: "Route optimized",
                    timestamp: r.created_at ? new Date(r.created_at) : new Date(),
                  })),
                ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 10);

                const formatTime = (date: Date) => {
                  if (isNaN(date.getTime())) return "N/A";
                  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                };

                return generatedNotifications.length === 0 ? (
                  <p className="p-4 text-sm text-gray-500">No notifications</p>
                ) : (
                  generatedNotifications.map((n, idx) => (
                    <div key={n.id || idx} className="flex items-start gap-3 p-3">
                      <span className="text-lg leading-none mt-0.5">{n.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">{n.message}</p>
                        <p className="text-xs text-gray-500">{formatTime(n.timestamp)}</p>
                      </div>
                    </div>
                  ))
                );
              })()}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
