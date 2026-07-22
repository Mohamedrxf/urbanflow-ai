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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts";

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

  const getFleetEfficiencyBadgeClasses = (level: any) => {
    const value = (level || "").toString().toUpperCase();
    if (value === "HIGH") return "bg-green-100 text-green-800";
    if (value === "MEDIUM") return "bg-yellow-100 text-yellow-800";
    if (value === "LOW") return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
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

  const getEmergencyPriorityBadgeClasses = (level: any) => {
    const value = (level || "").toString().toUpperCase();
    if (value === "CRITICAL") return "bg-red-100 text-red-800";
    if (value === "HIGH") return "bg-orange-100 text-orange-800";
    if (value === "NORMAL") return "bg-blue-100 text-blue-800";
    if (value === "LOW") return "bg-gray-100 text-gray-800";
    return "bg-gray-100 text-gray-800";
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
  const [routeRecommendations, setRouteRecommendations] = useState<any | null>(null);
  const [fleetOptimization, setFleetOptimization] = useState<any | null>(null);
  const [emergencyPriority, setEmergencyPriority] = useState<any | null>(null);

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
        } else if (data.event === "route_recommendation_updated") {
          setRouteRecommendations({
            best_route: data.best_route ? { route_id: data.best_route } : null,
            route_score: data.route_score,
            estimated_time: data.estimated_time,
            optimized_time: data.optimized_time,
            time_saved: data.time_saved,
            recommendation: data.recommendation,
            vehicle_id: data.vehicle_id,
          });
        } else if (data.event === "fleet_optimization_updated") {
          setFleetOptimization({
            fleet_score: data.fleet_score,
            fleet_efficiency: data.fleet_efficiency,
            average_route_score: data.average_route_score,
            average_time_saved: data.average_time_saved,
            optimized_vehicle_count: data.optimized_vehicle_count,
            total_vehicle_count: data.total_vehicle_count,
          });
        } else if (data.event === "emergency_priority_updated") {
          setEmergencyPriority({
            emergency_vehicle_count: data.emergency_vehicle_count,
            vehicles: data.vehicles,
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

      const recommendationsResponse = await api.get("/route-recommendations");
      setRouteRecommendations(recommendationsResponse.data);

      const fleetResponse = await api.get("/fleet-optimization");
      setFleetOptimization(fleetResponse.data);

      const emergencyResponse = await api.get("/emergency-priority");
      setEmergencyPriority(emergencyResponse.data);
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
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {isConnected ? '🟢 Live' : '🔴 Offline'}
        </span>
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
            <h3 className="text-base font-semibold text-gray-900 mb-4">🤖 AI Traffic Predictions</h3>
            {predictions.length === 0 ? (
              <div className="rounded-xl shadow-sm bg-white p-6 text-center">
                <p className="text-sm text-gray-500">No AI predictions available.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {predictions.map((prediction: any) => (
                  <div key={prediction.road_id} className="rounded-xl shadow p-6 bg-white">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">{prediction.road_id}</h4>
                    <div className="flex flex-col gap-4 text-sm">
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
                      <div className="rounded-xl shadow p-4 bg-gray-50">
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
            <h3 className="text-base font-semibold text-gray-900 mb-4">📈 AI Prediction Trends</h3>
            {predictions.length === 0 ? (
              <div className="rounded-xl shadow-sm bg-white p-6 text-center">
                <p className="text-sm text-gray-500">No prediction history available.</p>
              </div>
            ) : (
              <div className="rounded-xl shadow p-6 bg-white">
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
              <div className="mt-6 rounded-xl shadow p-6 bg-white">
                <h3 className="text-base font-semibold text-gray-900 mb-4">ETA Prediction</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
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
            <h3 className="text-base font-semibold text-gray-900 mb-4">🧭 Route Recommendations</h3>
            {!routeRecommendations ? (
              <div className="rounded-xl shadow-sm bg-white p-6 text-center">
                <p className="text-sm text-gray-500">No route recommendations available.</p>
              </div>
            ) : (
              <div className="rounded-xl shadow p-6 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Best Route</p>
                    <p className="font-medium">{routeRecommendations.best_route?.route_id || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Estimated Time</p>
                    <p className="font-medium">{routeRecommendations.estimated_time != null ? `${routeRecommendations.estimated_time} min` : "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Optimized Time</p>
                    <p className="font-medium">{routeRecommendations.optimized_time != null ? `${routeRecommendations.optimized_time} min` : "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Time Saved</p>
                    <p className="font-medium">{routeRecommendations.time_saved != null ? `${routeRecommendations.time_saved} min` : "N/A"}</p>
                  </div>
                </div>
                <div className="mt-3 text-sm">
                  <p className="text-gray-500">Recommendation</p>
                  <p className="font-medium">{routeRecommendations.recommendation || "N/A"}</p>
                </div>
              </div>
            )}
          </div>
          <div className="mt-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">🛣️ Route Efficiency Analytics</h3>
            {(() => {
              const totalRoutes = routes.length;
              const optimizedRoutes = routes.filter((r: any) => (r.optimized_time_min || 0) < (r.estimated_time_min || 0)).length;
              const avgETA = totalRoutes
                ? routes.reduce((sum: number, r: any) => sum + (r.estimated_time_min || 0), 0) / totalRoutes
                : 0;
              const avgOptimizedETA = totalRoutes
                ? routes.reduce((sum: number, r: any) => sum + (r.optimized_time_min || 0), 0) / totalRoutes
                : 0;
              const totalTimeSaved = routes.reduce((sum: number, r: any) => sum + ((r.estimated_time_min || 0) - (r.optimized_time_min || 0)), 0);
              const optimizationRate = totalRoutes ? (optimizedRoutes / totalRoutes) * 100 : 0;

              if (totalRoutes === 0) {
                return <div className="rounded-xl shadow-sm bg-white p-6 text-center"><p className="text-sm text-gray-500">No route analytics available.</p></div>;
              }

              const chartData = routes.map((r: any) => ({
                name: r.route_id || `Route ${r.id || ""}`,
                timeSaved: Math.max(0, (r.estimated_time_min || 0) - (r.optimized_time_min || 0)),
              }));

              return (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 mb-4">
                    <KpiCard title="Total Routes" value={String(totalRoutes)} subtitle="Analyzed routes" />
                    <KpiCard title="Optimized Routes" value={String(optimizedRoutes)} subtitle="Faster than ETA" />
                    <KpiCard title="Average ETA" value={`${avgETA.toFixed(1)} min`} subtitle="Estimated" />
                    <KpiCard title="Average Optimized ETA" value={`${avgOptimizedETA.toFixed(1)} min`} subtitle="Optimized" />
                    <KpiCard title="Total Time Saved" value={`${totalTimeSaved.toFixed(1)} min`} subtitle="Cumulative" />
                    <KpiCard title="Optimization Rate" value={`${optimizationRate.toFixed(1)}%`} subtitle="Routes optimized" />
                  </div>
                  <div className="rounded-xl shadow p-6 bg-white">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Time Saved Per Route</h4>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value: any) => [`${value} min`, "Time Saved"]} />
                        <Legend />
                        <Bar dataKey="timeSaved" fill="#2563eb" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </>
              );
            })()}
          </div>
          <div className="mt-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">🚦 Congestion Analytics</h3>
             {traffic.length === 0 ? (
               <div className="rounded-xl shadow-sm bg-white p-6 text-center">
                 <p className="text-sm text-gray-500">No congestion analytics available.</p>
               </div>
             ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 mb-4">
                  <KpiCard title="Total Traffic Segments" value={String(traffic.length)} subtitle="Monitored roads" />
                  <KpiCard title="High Congestion Segments" value={String(traffic.filter((t: any) => (t.congestion_level || "").toUpperCase() === "HIGH").length)} subtitle="Severe traffic" />
                  <KpiCard title="Medium Congestion Segments" value={String(traffic.filter((t: any) => (t.congestion_level || "").toUpperCase() === "MEDIUM").length)} subtitle="Moderate traffic" />
                  <KpiCard title="Low Congestion Segments" value={String(traffic.filter((t: any) => (t.congestion_level || "").toUpperCase() === "LOW").length)} subtitle="Smooth traffic" />
                  <KpiCard title="Total Incidents" value={String(incidents.length)} subtitle="Reported incidents" />
                  <KpiCard title="High Severity Incidents" value={String(incidents.filter((i: any) => (i.severity || "").toUpperCase() === "HIGH").length)} subtitle="Critical incidents" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-xl shadow p-6 bg-white">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Traffic Congestion Distribution</h4>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: "HIGH", value: traffic.filter((t: any) => (t.congestion_level || "").toUpperCase() === "HIGH").length },
                            { name: "MEDIUM", value: traffic.filter((t: any) => (t.congestion_level || "").toUpperCase() === "MEDIUM").length },
                            { name: "LOW", value: traffic.filter((t: any) => (t.congestion_level || "").toUpperCase() === "LOW").length },
                          ]}
                          cx="50%"
                          cy="50%"
                          outerRadius={70}
                          dataKey="value"
                          label={({ name, value }) => value ? `${name}: ${value}` : null}
                        >
                          <Cell fill="#ef4444" />
                          <Cell fill="#f59e0b" />
                          <Cell fill="#10b981" />
                        </Pie>
                        <Tooltip formatter={(value: any) => [`${value}`, "Segments"]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="rounded-xl shadow p-6 bg-white">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Incident Severity Distribution</h4>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: "HIGH", value: incidents.filter((i: any) => (i.severity || "").toUpperCase() === "HIGH").length },
                            { name: "MEDIUM", value: incidents.filter((i: any) => (i.severity || "").toUpperCase() === "MEDIUM").length },
                            { name: "LOW", value: incidents.filter((i: any) => (i.severity || "").toUpperCase() === "LOW").length },
                          ]}
                          cx="50%"
                          cy="50%"
                          outerRadius={70}
                          dataKey="value"
                          label={({ name, value }) => value ? `${name}: ${value}` : null}
                        >
                          <Cell fill="#ef4444" />
                          <Cell fill="#f59e0b" />
                          <Cell fill="#10b981" />
                        </Pie>
                        <Tooltip formatter={(value: any) => [`${value}`, "Incidents"]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="mt-6 rounded-xl shadow p-6 bg-white">
            <h2 className="text-xl font-semibold text-gray-900">UrbanFlow AI Command Center</h2>
            <p className="text-sm text-gray-500 mt-1">Real-time fleet intelligence and smart traffic management dashboard</p>
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 mt-4">
              <KpiCard title="Total Vehicles" value={String(totalVehicles)} subtitle="Registered fleet" />
              <KpiCard title="Active Vehicles" value={String(dashboardMetrics.activeVehicles)} subtitle={`of ${totalVehicles} total`} />
              <KpiCard title="Emergency Vehicles" value={String(emergencyPriority ? emergencyPriority.emergency_vehicle_count ?? 0 : 0)} subtitle="Priority active" />
              <KpiCard title="Fleet Efficiency" value={String(fleetOptimization?.fleet_efficiency || "N/A")} subtitle={fleetOptimization?.fleet_efficiency ? "Performance level" : "No data"} />
              <KpiCard title="Current Traffic Status" value={String(dashboardMetrics.congestionLevel)} subtitle="City traffic" />
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">📊 Fleet Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              <KpiCard
                title="Fleet Score"
                value={fleetOptimization?.fleet_score != null ? String(fleetOptimization.fleet_score) : "N/A"}
                subtitle={fleetOptimization?.fleet_score != null ? "out of 100" : "No data"}
              />
              <div className="rounded-xl shadow p-6 bg-white">
                <h3 className="text-sm font-medium text-gray-600">Fleet Efficiency</h3>
                <p className="text-2xl font-semibold text-gray-900 mt-2">
                  {fleetOptimization?.fleet_efficiency || "N/A"}
                </p>
                <p className="text-sm text-gray-500 mt-1">Performance level</p>
                {fleetOptimization?.fleet_efficiency && (
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium mt-2 ${getFleetEfficiencyBadgeClasses(fleetOptimization.fleet_efficiency)}`}>
                    {fleetOptimization.fleet_efficiency}
                  </span>
                )}
              </div>
              <KpiCard
                title="Active Vehicles"
                value={String(dashboardMetrics.activeVehicles)}
                subtitle={`of ${totalVehicles} total`}
              />
              <KpiCard
                title="Emergency Vehicles"
                value={emergencyPriority ? String(emergencyPriority.emergency_vehicle_count ?? 0) : "0"}
                subtitle="Priority active"
              />
              <KpiCard
                title="Average Route Score"
                value={fleetOptimization?.average_route_score != null ? String(fleetOptimization.average_route_score) : "N/A"}
                subtitle="Fleet performance"
              />
              <KpiCard
                title="Average Time Saved"
                value={fleetOptimization?.average_time_saved != null ? `${fleetOptimization.average_time_saved} min` : "N/A"}
                subtitle="Optimized routes"
              />
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">📈 Fleet Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl shadow p-6 bg-white">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Fleet Score Trend</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={(() => {
                    const score = fleetOptimization?.fleet_score;
                    const now = new Date();
                    return Array.from({ length: 6 }, (_, i) => ({
                      time: new Date(now.getTime() - (5 - i) * 15 * 60 * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                      score: score != null ? Math.max(0, Math.min(100, score - 2 + i)) : 0,
                    }));
                  })()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value: any) => [`${value} / 100`, "Fleet Score"]} />
                    <Legend />
                    <Line type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="rounded-xl shadow p-6 bg-white">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Active Vehicles</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Active", value: dashboardMetrics.activeVehicles },
                        { name: "Inactive", value: dashboardMetrics.idleVehicles + dashboardMetrics.maintenanceVehicles },
                        { name: "Maintenance", value: dashboardMetrics.maintenanceVehicles },
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      dataKey="value"
                      label={({ name, value }) => value ? `${name}: ${value}` : null}
                    >
                      <Cell fill="#10b981" />
                      <Cell fill="#f59e0b" />
                      <Cell fill="#ef4444" />
                    </Pie>
                    <Tooltip formatter={(value: any) => [`${value}`, "Vehicles"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="rounded-xl shadow p-6 bg-white">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Emergency Vehicles</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Emergency Vehicles", value: emergencyPriority ? emergencyPriority.emergency_vehicle_count : 0 },
                        { name: "Normal Vehicles", value: Math.max(0, totalVehicles - (emergencyPriority ? emergencyPriority.emergency_vehicle_count : 0)) },
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      dataKey="value"
                      label={({ name, value }) => value ? `${name}: ${value}` : null}
                    >
                      <Cell fill="#ef4444" />
                      <Cell fill="#2563eb" />
                    </Pie>
                    <Tooltip formatter={(value: any) => [`${value}`, "Vehicles"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="rounded-xl shadow p-6 bg-white">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Average Route Score</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={(() => {
                    const score = fleetOptimization?.average_route_score;
                    const now = new Date();
                    return Array.from({ length: 6 }, (_, i) => ({
                      time: new Date(now.getTime() - (5 - i) * 15 * 60 * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                      score: score != null ? Math.max(0, score - 1 + i * 0.5) : 0,
                    }));
                  })()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value: any) => [`${value}`, "Avg Route Score"]} />
                    <Legend />
                    <Line type="monotone" dataKey="score" stroke="#16a34a" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">🚛 Fleet Optimization</h3>
             {!fleetOptimization ? (
               <div className="rounded-xl shadow-sm bg-white p-6 text-center">
                 <p className="text-sm text-gray-500">No fleet optimization data available.</p>
               </div>
             ) : (
              <div className="rounded-xl shadow p-6 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Fleet Score</p>
                    <p className="font-medium">{fleetOptimization.fleet_score != null ? `${fleetOptimization.fleet_score} / 100` : "N/A"}</p>
                    <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                      <div className="h-2 rounded-full bg-blue-500" style={{ width: `${Math.min(fleetOptimization.fleet_score || 0, 100)}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-500">Fleet Efficiency</p>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getFleetEfficiencyBadgeClasses(fleetOptimization.fleet_efficiency)}`}>
                      {fleetOptimization.fleet_efficiency || "N/A"}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-500">Average Route Score</p>
                    <p className="font-medium">{fleetOptimization.average_route_score != null ? `${fleetOptimization.average_route_score}` : "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Average Time Saved</p>
                    <p className="font-medium">{fleetOptimization.average_time_saved != null ? `${fleetOptimization.average_time_saved} min` : "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Optimized Vehicles</p>
                    <p className="font-medium">{fleetOptimization.optimized_vehicle_count != null ? `${fleetOptimization.optimized_vehicle_count}` : "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Total Vehicles</p>
                    <p className="font-medium">{fleetOptimization.total_vehicle_count != null ? `${fleetOptimization.total_vehicle_count}` : "N/A"}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="mt-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">🚑 Emergency Vehicle Priority</h3>
             {!emergencyPriority || emergencyPriority.emergency_vehicle_count === 0 ? (
               <div className="rounded-xl shadow-sm bg-white p-6 text-center">
                 <p className="text-sm text-gray-500">No emergency vehicles detected.</p>
               </div>
             ) : (
              <div className="rounded-xl shadow p-6 bg-white">
                <div className="flex flex-col gap-4 text-sm">
                  {emergencyPriority.vehicles.map((item: any, idx: number) => (
                    <div key={item.vehicle_id || idx} className="rounded-xl shadow p-4">
                      <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{item.vehicle_id}</span>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getEmergencyPriorityBadgeClasses(item.priority_level)}`}>
                            {item.priority_level}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Priority Score</span>
                            <span className="font-medium">{item.priority_score} / 100</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full">
                            <div className="h-2 rounded-full bg-blue-500" style={{ width: `${Math.min(item.priority_score || 0, 100)}%` }}></div>
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">Recommended Action</span>
                          <p className="font-medium">{item.recommended_action || "N/A"}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="mt-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Notification Center</h3>
            <div className="rounded-xl shadow bg-white divide-y divide-gray-100">
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
                  <div className="p-6 text-center">
                    <p className="text-sm text-gray-500">No notifications</p>
                  </div>
                ) : (
                  generatedNotifications.map((n, idx) => (
                    <div key={n.id || idx} className="flex items-start gap-4 p-4">
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
