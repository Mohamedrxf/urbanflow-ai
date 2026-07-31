import { useEffect, useState } from "react";
import KpiCard from "../components/dashboard/KpiCard";
import FleetStatus from "../components/dashboard/FleetStatus";
import TrafficOverview from "../components/dashboard/TrafficOverview";
import PredictionWidget from "../components/dashboard/PredictionWidget";
import AlertPanel from "../components/dashboard/AlertPanel";
import LiveMap from "../components/dashboard/LiveMap";
import Badge from "../components/ui/Badge";
import Card from "../components/ui/Card";
import EmptyState from "../components/ui/EmptyState";
import ProgressBar from "../components/ui/ProgressBar";
import DistributionPieChart from "../components/charts/DistributionPieChart";
import TrendLineChart from "../components/charts/TrendLineChart";
import { getVehicles } from "../services/vehicleService";
import { getTraffic } from "../services/trafficService";
import { getIncidents } from "../services/incidentService";
import { getRoutes } from "../services/routeService";
import {
  getPredictions,
  getRouteRecommendations,
  getFleetOptimization,
  getEmergencyPriority,
} from "../services/analyticsService";
import { useWebSocket } from "../hooks/useWebSocket";
import {
  countByLevel,
  getCongestionBadgeClasses,
  getCongestionValue,
  getEmergencyPriorityBadgeClasses,
  getFleetEfficiencyBadgeClasses,
} from "../utils/levels";
import { buildTrendSeries, formatClockTime, formatMinutes } from "../utils/format";
import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";

const TREND_POINTS = 6;

const CONGESTION_LABELS: Record<number, string> = { 1: "LOW", 2: "MEDIUM", 3: "HIGH" };

const getRecommendations = (predictedCongestion: unknown) => {
  const value = String(predictedCongestion ?? "").toLowerCase();
  if (value === "high") {
    return [
      "Recommend rerouting vehicles",
      "Suggest avoiding the affected road",
      "Suggest increasing traffic signal priority",
    ];
  }
  if (value === "medium") {
    return ["Recommend monitoring traffic", "Suggest alternative routes if available"];
  }
  return ["Traffic flow is normal."];
};

const generatePredictionHistory = (predictionList: any[]) =>
  buildTrendSeries(TREND_POINTS, () =>
    Object.fromEntries(
      predictionList.map((prediction) => [
        prediction.road_id,
        getCongestionValue(prediction.predicted_congestion),
      ]),
    ),
  );

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

      const recommendationsResponse = await getRouteRecommendations();
      setRouteRecommendations(recommendationsResponse.data);

      const fleetResponse = await getFleetOptimization();
      setFleetOptimization(fleetResponse.data);

      const emergencyResponse = await getEmergencyPriority();
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
        <Badge className={isConnected ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
          {isConnected ? '🟢 Live' : '🔴 Offline'}
        </Badge>
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
              <EmptyState message="No AI predictions available." />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {predictions.map((prediction: any) => (
                  <Card key={prediction.road_id}>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">{prediction.road_id}</h4>
                    <div className="flex flex-col gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Current Congestion</span>
                        <Badge className={getCongestionBadgeClasses(prediction.current_congestion)}>
                          {prediction.current_congestion}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Predicted Congestion</span>
                        <Badge className={getCongestionBadgeClasses(prediction.predicted_congestion)}>
                          {prediction.predicted_congestion}
                        </Badge>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Confidence</span>
                          <span className="font-medium">{Math.round(prediction.confidence * 100)}%</span>
                        </div>
                        <ProgressBar percent={prediction.confidence * 100} />
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
                  </Card>
                ))}
              </div>
            )}
          </div>
          <div className="mt-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">📈 AI Prediction Trends</h3>
            {predictions.length === 0 ? (
              <EmptyState message="No prediction history available." />
            ) : (
              <Card>
                <TrendLineChart
                  height={300}
                  data={generatePredictionHistory(predictions)}
                  lines={predictions.map((prediction: any) => ({ dataKey: prediction.road_id }))}
                  yAxis={{
                    type: "number",
                    domain: [0, 3],
                    ticks: [1, 2, 3],
                    tickFormatter: (value: number) => CONGESTION_LABELS[value] ?? "",
                  }}
                  tooltipFormatter={(value: any) => [CONGESTION_LABELS[value] ?? value, "Congestion"]}
                />
              </Card>
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
              <Card className="mt-6">
                <h3 className="text-base font-semibold text-gray-900 mb-4">ETA Prediction</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Current ETA</p>
                    <p className="font-medium">{formatMinutes(currentETA)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Optimized ETA</p>
                    <p className="font-medium">{formatMinutes(optimizedETA)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Delay</p>
                    <p className="font-medium">{formatMinutes(delay)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Time Saved</p>
                    <p className="font-medium">{formatMinutes(timeSaved)}</p>
                  </div>
                </div>
              </Card>
            );
          })()}
          <div className="mt-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">🧭 Route Recommendations</h3>
            {!routeRecommendations ? (
              <EmptyState message="No route recommendations available." />
            ) : (
              <Card>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Best Route</p>
                    <p className="font-medium">{routeRecommendations.best_route?.route_id || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Estimated Time</p>
                    <p className="font-medium">{formatMinutes(routeRecommendations.estimated_time)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Optimized Time</p>
                    <p className="font-medium">{formatMinutes(routeRecommendations.optimized_time)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Time Saved</p>
                    <p className="font-medium">{formatMinutes(routeRecommendations.time_saved)}</p>
                  </div>
                </div>
                <div className="mt-3 text-sm">
                  <p className="text-gray-500">Recommendation</p>
                  <p className="font-medium">{routeRecommendations.recommendation || "N/A"}</p>
                </div>
              </Card>
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
                return <EmptyState message="No route analytics available." />;
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
                  <Card title="Time Saved Per Route">
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
                  </Card>
                </>
              );
            })()}
          </div>
          <div className="mt-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">🚦 Congestion Analytics</h3>
             {traffic.length === 0 ? (
               <EmptyState message="No congestion analytics available." />
             ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 mb-4">
                  <KpiCard title="Total Traffic Segments" value={String(traffic.length)} subtitle="Monitored roads" />
                  <KpiCard title="High Congestion Segments" value={String(countByLevel(traffic, "congestion_level", "high"))} subtitle="Severe traffic" />
                  <KpiCard title="Medium Congestion Segments" value={String(countByLevel(traffic, "congestion_level", "medium"))} subtitle="Moderate traffic" />
                  <KpiCard title="Low Congestion Segments" value={String(countByLevel(traffic, "congestion_level", "low"))} subtitle="Smooth traffic" />
                  <KpiCard title="Total Incidents" value={String(incidents.length)} subtitle="Reported incidents" />
                  <KpiCard title="High Severity Incidents" value={String(countByLevel(incidents, "severity", "high"))} subtitle="Critical incidents" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card title="Traffic Congestion Distribution">
                    <DistributionPieChart
                      tooltipLabel="Segments"
                      slices={[
                        { name: "HIGH", value: countByLevel(traffic, "congestion_level", "high"), color: "#ef4444" },
                        { name: "MEDIUM", value: countByLevel(traffic, "congestion_level", "medium"), color: "#f59e0b" },
                        { name: "LOW", value: countByLevel(traffic, "congestion_level", "low"), color: "#10b981" },
                      ]}
                    />
                  </Card>
                  <Card title="Incident Severity Distribution">
                    <DistributionPieChart
                      tooltipLabel="Incidents"
                      slices={[
                        { name: "HIGH", value: countByLevel(incidents, "severity", "high"), color: "#ef4444" },
                        { name: "MEDIUM", value: countByLevel(incidents, "severity", "medium"), color: "#f59e0b" },
                        { name: "LOW", value: countByLevel(incidents, "severity", "low"), color: "#10b981" },
                      ]}
                    />
                  </Card>
                </div>
              </>
            )}
          </div>
          <Card className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900">UrbanFlow AI Command Center</h2>
            <p className="text-sm text-gray-500 mt-1">Real-time fleet intelligence and smart traffic management dashboard</p>
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 mt-4">
              <KpiCard title="Total Vehicles" value={String(totalVehicles)} subtitle="Registered fleet" />
              <KpiCard title="Active Vehicles" value={String(dashboardMetrics.activeVehicles)} subtitle={`of ${totalVehicles} total`} />
              <KpiCard title="Emergency Vehicles" value={String(emergencyPriority ? emergencyPriority.emergency_vehicle_count ?? 0 : 0)} subtitle="Priority active" />
              <KpiCard title="Fleet Efficiency" value={String(fleetOptimization?.fleet_efficiency || "N/A")} subtitle={fleetOptimization?.fleet_efficiency ? "Performance level" : "No data"} />
              <KpiCard title="Current Traffic Status" value={String(dashboardMetrics.congestionLevel)} subtitle="City traffic" />
            </div>
          </Card>
          <div className="mt-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">📊 Fleet Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              <KpiCard
                title="Fleet Score"
                value={fleetOptimization?.fleet_score != null ? String(fleetOptimization.fleet_score) : "N/A"}
                subtitle={fleetOptimization?.fleet_score != null ? "out of 100" : "No data"}
              />
              <Card>
                <h3 className="text-sm font-medium text-gray-600">Fleet Efficiency</h3>
                <p className="text-2xl font-semibold text-gray-900 mt-2">
                  {fleetOptimization?.fleet_efficiency || "N/A"}
                </p>
                <p className="text-sm text-gray-500 mt-1">Performance level</p>
                {fleetOptimization?.fleet_efficiency && (
                  <Badge className={`mt-2 ${getFleetEfficiencyBadgeClasses(fleetOptimization.fleet_efficiency)}`}>
                    {fleetOptimization.fleet_efficiency}
                  </Badge>
                )}
              </Card>
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
                value={formatMinutes(fleetOptimization?.average_time_saved)}
                subtitle="Optimized routes"
              />
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">📈 Fleet Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card title="Fleet Score Trend">
                <TrendLineChart
                  data={buildTrendSeries(TREND_POINTS, (index) => {
                    const score = fleetOptimization?.fleet_score;
                    return { score: score != null ? Math.max(0, Math.min(100, score - 2 + index)) : 0 };
                  })}
                  lines={[{ dataKey: "score" }]}
                  yAxis={{ domain: [0, 100] }}
                  tooltipFormatter={(value: any) => [`${value} / 100`, "Fleet Score"]}
                />
              </Card>
              <Card title="Active Vehicles">
                <DistributionPieChart
                  tooltipLabel="Vehicles"
                  slices={[
                    { name: "Active", value: dashboardMetrics.activeVehicles, color: "#10b981" },
                    { name: "Inactive", value: dashboardMetrics.idleVehicles + dashboardMetrics.maintenanceVehicles, color: "#f59e0b" },
                    { name: "Maintenance", value: dashboardMetrics.maintenanceVehicles, color: "#ef4444" },
                  ]}
                />
              </Card>
              <Card title="Emergency Vehicles">
                <DistributionPieChart
                  tooltipLabel="Vehicles"
                  slices={[
                    { name: "Emergency Vehicles", value: emergencyPriority ? emergencyPriority.emergency_vehicle_count : 0, color: "#ef4444" },
                    { name: "Normal Vehicles", value: Math.max(0, totalVehicles - (emergencyPriority ? emergencyPriority.emergency_vehicle_count : 0)), color: "#2563eb" },
                  ]}
                />
              </Card>
              <Card title="Average Route Score">
                <TrendLineChart
                  data={buildTrendSeries(TREND_POINTS, (index) => {
                    const score = fleetOptimization?.average_route_score;
                    return { score: score != null ? Math.max(0, score - 1 + index * 0.5) : 0 };
                  })}
                  lines={[{ dataKey: "score", stroke: "#16a34a" }]}
                  yAxis={{ domain: [0, 100] }}
                  tooltipFormatter={(value: any) => [`${value}`, "Avg Route Score"]}
                />
              </Card>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">🚛 Fleet Optimization</h3>
             {!fleetOptimization ? (
               <EmptyState message="No fleet optimization data available." />
             ) : (
              <Card>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Fleet Score</p>
                    <p className="font-medium">{fleetOptimization.fleet_score != null ? `${fleetOptimization.fleet_score} / 100` : "N/A"}</p>
                    <ProgressBar percent={fleetOptimization.fleet_score || 0} className="mt-2" />
                  </div>
                  <div>
                    <p className="text-gray-500">Fleet Efficiency</p>
                    <Badge className={getFleetEfficiencyBadgeClasses(fleetOptimization.fleet_efficiency)}>
                      {fleetOptimization.fleet_efficiency || "N/A"}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-gray-500">Average Route Score</p>
                    <p className="font-medium">{fleetOptimization.average_route_score != null ? `${fleetOptimization.average_route_score}` : "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Average Time Saved</p>
                    <p className="font-medium">{formatMinutes(fleetOptimization.average_time_saved)}</p>
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
              </Card>
            )}
          </div>
          <div className="mt-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">🚑 Emergency Vehicle Priority</h3>
             {!emergencyPriority || emergencyPriority.emergency_vehicle_count === 0 ? (
               <EmptyState message="No emergency vehicles detected." />
             ) : (
              <Card>
                <div className="flex flex-col gap-4 text-sm">
                  {emergencyPriority.vehicles.map((item: any, idx: number) => (
                    <Card key={item.vehicle_id || idx} padding="sm">
                      <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{item.vehicle_id}</span>
                          <Badge className={getEmergencyPriorityBadgeClasses(item.priority_level)}>
                            {item.priority_level}
                          </Badge>
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Priority Score</span>
                            <span className="font-medium">{item.priority_score} / 100</span>
                          </div>
                          <ProgressBar percent={item.priority_score || 0} />
                        </div>
                        <div>
                          <span className="text-gray-500">Recommended Action</span>
                          <p className="font-medium">{item.recommended_action || "N/A"}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
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
                        <p className="text-xs text-gray-500">{formatClockTime(n.timestamp)}</p>
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
