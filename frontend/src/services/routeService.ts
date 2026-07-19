import api from "./api";

export const getRoutes = () => api.get("/routes");

export const getRoute = (routeId: string) => api.get(`/routes/${routeId}`);

export const createRoute = (data: unknown) => api.post("/routes", data);
