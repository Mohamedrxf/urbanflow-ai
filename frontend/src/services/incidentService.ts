import api from "./api";

export const getIncidents = () => api.get("/incidents");

export const getIncidentById = (id: number) => api.get(`/incidents/${id}`);

export const createIncident = (data: unknown) => api.post("/incidents", data);
