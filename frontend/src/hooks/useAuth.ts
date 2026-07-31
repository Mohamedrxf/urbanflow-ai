import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, register, getCurrentUser } from "../services/authService";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  full_name: string;
  hashed_password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

export const useAuth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setInitializing(false);
        return;
      }

      try {
        const response = await getCurrentUser();
        setUser(response.data);
      } catch {
        localStorage.removeItem("access_token");
      } finally {
        setInitializing(false);
      }
    };

    initAuth();
  }, []);

  const handleLogin = async (data: LoginRequest): Promise<AuthResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await login(data);
      localStorage.setItem("access_token", response.data.access_token);
      const userResponse = await getCurrentUser();
      setUser(userResponse.data);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (data: RegisterRequest): Promise<UserResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await register(data);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleGetCurrentUser = async (): Promise<UserResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await getCurrentUser();
      setUser(response.data);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch user");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    navigate("/login", { replace: true });
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem("access_token");
  };

  return {
    user,
    loading,
    error,
    initializing,
    handleLogin,
    handleRegister,
    handleGetCurrentUser,
    logout,
    isAuthenticated,
  };
};
