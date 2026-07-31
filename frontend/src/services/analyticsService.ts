import api from "./api";

export const getPredictions = () => api.get("/predictions");

export const getRouteRecommendations = () => api.get("/route-recommendations");

export const getFleetOptimization = () => api.get("/fleet-optimization");

export const getEmergencyPriority = () => api.get("/emergency-priority");
