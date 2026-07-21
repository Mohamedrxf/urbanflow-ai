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
import api from "../services/api";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

  const getPredictions = () => api.get("/predictions");

  const getCongestionBadgeClasses = (level: any) => {
    const value = (level || "").toString().toLowerCase();
    if (value === "low") return "bg-green-100 text-green-800";
    if (value === "medium") return "bg-yellow-100 text-yellow-800";
    if (value === "high") return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
  };

  const getRecommendations = (predictedCongestion: any) => {
    const value = (predictedCongestion || "").toString().toLowerCase();
    if (value === "high") {
      return [
        "Recommend rerouting vehicles",
        "Suggest avoiding the affected road",
        "Suggest increasing traffic signal priority",
      ];
    }
    if (value === "medium") {
      return [
        "Recommend monitoring traffic",
        "Suggest alternative routes if available",
      ];
    }
    if (value === "low") {
      return ["Traffic flow is normal."];
    }
    return ["Traffic flow is normal."];
  };

  const getCongestionValue = (level: any) => {
    const value = (level || "").toString().toLowerCase();
    if (value === "low") return 1;
    if (value === "medium") return 2;
    if (value === "high") return 3;
    return 0;
  };

  const generatePredictionHistory = (predictionList: any[]) => {
    const now = new Date();
    const history: any[] = [];
    for (let i = 5; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 15 * 60 * 1000);
      const entry: any = { time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
      predictionList.forEach((prediction) => {
        entry[prediction.road_id] = getCongestionValue(prediction.predicted_congestion);
      });
      history.push(entry);
    }
    return history;
  };

export default function Dashboard() {
  const { isConnected, lastMessage } = useWebSocket();
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [traffic, setTraffic] = useState<any[]>([]);
  const [incidents, setIncidents] = useState<any[]>([]);
   const [routes, setRoutes] = useState<any[]>([]);
   const [predictions, setPredictions] = useState<any[]>([]);
   void predictions;
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
        } else if (data.event === "prediction_updated") {
          setPredictions((prev) => {
            const index = prev.findIndex((p: any) => p.road_id === data.road_id);
            if (index >= 0) {
              const updated = [...prev];
              updated[index] = { ...updated[index], ...data };
              return updated;
            }
            return [...prev, data];
          });
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

      const predictionsResponse = await getPredictions();
      setPredictions(predictionsResponse.data);
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
            <h3 className="text-sm font-medium text-gray-600 mb-3">🤖 AI Traffic Predictions</h3>
            {predictions.length === 0 ? (
              <p className="text-sm text-gray-500">No AI predictions available.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {predictions.map((prediction: any) => (
                  <div key={prediction.road_id} className="rounded-lg border border-gray-200 p-4 bg-white">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">{prediction.road_id}</h4>
                    <div className="flex flex-col gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Current Congestion</span>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getCongestionBadgeClasses(prediction.current_congestion)}`}>
                          {prediction.current_congestion}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Predicted Congestion</span>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getCongestionBadgeClasses(prediction.predicted_congestion)}`}>
                          {prediction.predicted_congestion}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Confidence</span>
                          <span className="font-medium">{Math.round(prediction.confidence * 100)}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div className="h-2 rounded-full bg-blue-500" style={{ width: `${prediction.confidence * 100}%` }}></div>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Prediction Window</span>
                        <span className="font-medium">{prediction.prediction_minutes} min</span>
                      </div>
                      <div className="rounded-lg border border-gray-200 p-3 bg-gray-50">
                        <p className="text-xs font-medium text-gray-700 mb-1">🤖 Recommendation</p>
                        <ul className="list-disc list-inside text-xs text-gray-600 space-y-0.5">
                          {getRecommendations(prediction.predicted_congestion).map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-600 mb-3">📈 AI Prediction Trends</h3>
            {predictions.length === 0 ? (
              <p className="text-sm text-gray-500">No prediction history available.</p>
            ) : (
              <div className="rounded-lg border border-gray-200 p-4 bg-white">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={generatePredictionHistory(predictions)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis type="number" domain={[0, 3]} ticks={[1, 2, 3]} tickFormatter={(value) => value === 1 ? "LOW" : value === 2 ? "MEDIUM" : value === 3 ? "HIGH" : ""} />
                    <Tooltip formatter={(value: any) => [value === 1 ? "LOW" : value === 2 ? "MEDIUM" : value === 3 ? "HIGH" : value, "Congestion"]} />
                    <Legend />
                    {predictions.map((prediction: any) => (
                      <Line key={prediction.road_id} type="monotone" dataKey={prediction.road_id} stroke="#2563eb" strokeWidth={2} dot={{ r: 4 }} />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
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
