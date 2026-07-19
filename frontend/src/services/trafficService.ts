import api from "./api";

export const getTraffic = () => api.get("/traffic");

export const getTrafficById = (id: number) => api.get(`/traffic/${id}`);

export const createTraffic = (data: unknown) => api.post("/traffic", data);
