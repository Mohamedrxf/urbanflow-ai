import api from "./api";

export const login = (data: { username: string; password: string }) =>
  api.post("/auth/login", data);

export const register = (data: {
  username: string;
  email: string;
  full_name: string;
  hashed_password: string;
}) => api.post("/auth/register", data);

export const getCurrentUser = () => api.get("/auth/me");
