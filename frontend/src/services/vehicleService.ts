import api from "./api";

export const getVehicles = () => api.get("/vehicles");

export const getVehicle = (vehicleId: string) => api.get(`/vehicles/${vehicleId}`);

export const createVehicle = (data: unknown) => api.post("/vehicles", data);
