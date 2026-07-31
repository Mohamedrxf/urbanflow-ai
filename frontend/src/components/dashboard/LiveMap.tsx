import { useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getCongestionMapColor, getSeverityMapColor } from "../../utils/levels";

interface LiveMapProps {
  vehicles: Array<{
    vehicle_id: string;
    latitude: number;
    longitude: number;
    status: string;
    driver_name?: string;
    vehicle_type?: string;
    speed?: number;
    created_at?: string;
  }>;
  routes: Array<{
    route_id: string;
    source_latitude?: number;
    source_longitude?: number;
    destination_latitude?: number;
    destination_longitude?: number;
  }>;
  traffic: Array<{
    traffic_id?: string | number;
    congestion_level?: string;
    latitude?: number;
    longitude?: number;
  }>;
  incidents: Array<{
    id?: string | number;
    incident_type?: string;
    severity?: string;
    road_name?: string;
    description?: string;
    latitude?: number;
    longitude?: number;
  }>;
  selectedVehicle: any | null;
  onSelectVehicle: (vehicle: any) => void;
}

const defaultCenter: [number, number] = [40.7128, -74.006];

function VehicleMarker({ vehicle, onClick }: { vehicle: LiveMapProps["vehicles"][number]; onClick?: () => void }) {
  const markerRef = useRef<L.Marker>(null);

  useEffect(() => {
    const marker = markerRef.current;
    if (!marker) return;

    const newPos: [number, number] = [vehicle.latitude, vehicle.longitude];
    const currentPos = marker.getLatLng();
    if (
      currentPos.lat !== newPos[0] ||
      currentPos.lng !== newPos[1]
    ) {
      marker.setLatLng(newPos);
    }
  }, [vehicle.latitude, vehicle.longitude]);

  if (typeof vehicle.latitude !== "number" || typeof vehicle.longitude !== "number") {
    return null;
  }

  return (
    <Marker position={[vehicle.latitude, vehicle.longitude]} ref={markerRef} eventHandlers={{ click: onClick }}>
      <Popup>
        <div className="text-sm">
          <p className="font-medium">Vehicle ID: {vehicle.vehicle_id}</p>
          <p className="text-gray-600">Status: {vehicle.status}</p>
        </div>
      </Popup>
    </Marker>
  );
}

function IncidentMarker({ incident }: { incident: LiveMapProps["incidents"][number] }) {
  const color = getSeverityMapColor(incident.severity);

  const position: [number, number] = [
    typeof incident.latitude === "number" ? incident.latitude : 40.7128,
    typeof incident.longitude === "number" ? incident.longitude : -74.006,
  ];

  return (
    <Marker position={position}>
      <Popup>
        <div className="text-sm">
          <p className="font-medium">Type: {incident.incident_type || "Unknown"}</p>
          <p className="font-medium" style={{ color }}>Severity: {incident.severity || "Unknown"}</p>
          <p className="text-gray-600">Road: {incident.road_name || "Unknown"}</p>
          <p className="text-gray-600">Description: {incident.description || "N/A"}</p>
        </div>
      </Popup>
    </Marker>
  );
}

export default function LiveMap({ vehicles, routes, traffic, incidents, selectedVehicle, onSelectVehicle }: LiveMapProps) {
  const markers = vehicles.filter(
    (v) => typeof v.latitude === "number" && typeof v.longitude === "number"
  );

  return (
    <div className="rounded-lg border border-gray-200 p-4 bg-white">
      <h3 className="text-sm font-medium text-gray-600 mb-3">Live Traffic Map</h3>
      <div className="min-h-[320px]">
        <MapContainer
          center={defaultCenter}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "320px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {routes.map((route) => {
            const start: [number, number] = [
              route.source_latitude ?? 40.7128,
              route.source_longitude ?? -74.006,
            ];
            const end: [number, number] = [
              route.destination_latitude ?? 40.7228,
              route.destination_longitude ?? -73.996,
            ];
            return (
              <Polyline
                key={route.route_id}
                positions={[start, end]}
                pathOptions={{ color: "blue", weight: 5, opacity: 0.7 }}
              />
            );
          })}
          {traffic.map((segment, index) => {
            const start: [number, number] = [
              segment.latitude ?? 40.7128 + index * 0.002,
              segment.longitude ?? -74.006 + index * 0.003,
            ];
            const end: [number, number] = [
              (segment.latitude ?? 40.7128) + 0.002 + index * 0.002,
              (segment.longitude ?? -74.006) + 0.003 + index * 0.003,
            ];
            const color = getCongestionMapColor(segment.congestion_level);
            return (
              <Polyline
                key={segment.traffic_id ?? index}
                positions={[start, end]}
                pathOptions={{ color, weight: 7, opacity: 0.8 }}
              />
            );
          })}
          {incidents.map((incident) => (
            <IncidentMarker key={incident.id ?? Math.random()} incident={incident} />
          ))}
          <style>{`.leaflet-marker-icon { transition: transform 0.5s ease; }`}</style>
          {markers.map((vehicle) => (
            <VehicleMarker key={vehicle.vehicle_id} vehicle={vehicle} onClick={() => onSelectVehicle(vehicle)} />
          ))}
        </MapContainer>
      </div>
      {selectedVehicle ? (
        <div className="mt-4 rounded-lg border border-gray-200 p-4 bg-white">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Vehicle Details</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-gray-500">Vehicle ID</p>
              <p className="font-medium">{selectedVehicle.vehicle_id}</p>
            </div>
            <div>
              <p className="text-gray-500">Driver Name</p>
              <p className="font-medium">{selectedVehicle.driver_name || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-500">Vehicle Type</p>
              <p className="font-medium">{selectedVehicle.vehicle_type || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-500">Status</p>
              <p className="font-medium">{selectedVehicle.status}</p>
            </div>
            <div>
              <p className="text-gray-500">Speed</p>
              <p className="font-medium">{typeof selectedVehicle.speed === "number" ? `${selectedVehicle.speed} km/h` : "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-500">Latitude</p>
              <p className="font-medium">{typeof selectedVehicle.latitude === "number" ? selectedVehicle.latitude : "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-500">Longitude</p>
              <p className="font-medium">{typeof selectedVehicle.longitude === "number" ? selectedVehicle.longitude : "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-500">Current Route</p>
              <p className="font-medium">N/A</p>
            </div>
            <div>
              <p className="text-gray-500">Last Updated</p>
              <p className="font-medium">{selectedVehicle.created_at || "N/A"}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-sm text-gray-500">Select a vehicle to view details.</p>
      )}
    </div>
  );
}
