// Model type definitions for UrbanFlow AI

export interface TrafficData {
    id: string;
    location: {
        latitude: number;
        longitude: number;
        address?: string;
    };
    timestamp: string;
    trafficVolume: number;
    averageSpeed: number;
    congestionLevel: 'low' | 'medium' | 'high' | 'severe';
    incidents?: TrafficIncident[];
}

export interface TrafficIncident {
    id: string;
    type: 'accident' | 'construction' | 'road_closure' | 'weather' | 'other';
    severity: 'minor' | 'moderate' | 'major';
    description: string;
    startTime: string;
    endTime?: string;
    location: {
        latitude: number;
        longitude: number;
    };
}

export interface DeliveryRoute {
    id: string;
    name: string;
    origin: {
        latitude: number;
        longitude: number;
        address: string;
    };
    destination: {
        latitude: number;
        longitude: number;
        address: string;
    };
    waypoints?: Array<{
        latitude: number;
        longitude: number;
    }>;
    estimatedDuration: number;
    distance: number;
    trafficConditions: 'clear' | 'moderate' | 'heavy' | 'severe';
    alternativeRoutes?: DeliveryRoute[];
}

export interface FleetVehicle {
    id: string;
    licensePlate: string;
    type: 'truck' | 'van' | 'motorcycle' | 'car';
    capacity: number;
    currentLoad: number;
    status: 'available' | 'in_transit' | 'maintenance' | 'offline';
    currentLocation?: {
        latitude: number;
        longitude: number;
        lastUpdated: string;
    };
    driverId?: string;
}

export interface Driver {
    id: string;
    name: string;
    email: string;
    phone: string;
    licenseNumber: string;
    status: 'active' | 'on_break' | 'off_duty';
    vehicleId?: string;
    currentRouteId?: string;
}

export interface PredictionResult {
    id: string;
    type: 'traffic' | 'eta' | 'route_optimization';
    timestamp: string;
    confidence: number;
    data: Record<string, unknown>;
    modelVersion: string;
}