import { jwtDecode } from "jwt-decode";
import api from "./apiClient"; 

const AUTH_URL = "/auth";


// Login
export const login = async (username, password) => {
  try {
    const response = await api.post(`${AUTH_URL}/login`, {
      username,
      password,
    });

    if (!response.data.token) {
      return { success: false, message: "Credenciales inválidas" };
    }

    let decodedToken;
    try {
      decodedToken = jwtDecode(response.data.token);
    } catch (decodeError) {
      return { success: false, message: "Token inválido" };
    }

    return {
      success: true,
      data: {
        token: response.data.token,
        user: {
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
          roles: response.data.roles,
        },
        tokenData: {
          issuedAt: new Date(decodedToken.iat * 1000).toISOString(),
          expiration: new Date(decodedToken.exp * 1000).toISOString(),
          subject: decodedToken.sub,
        },
      },
    };
  } catch (error) {
    const errMsg = error.response?.data?.message || "Error al iniciar sesión";
    return { success: false, message: errMsg };
  }
};

// Register
export const register = async ({ username, email, password }) => {
  try {
    const response = await api.post(`${AUTH_URL}/register`, {
      username,
      email,
      password,
    });
    return { success: true, data: response.data };
  } catch (error) {
    const errMsg =
      error.response?.data?.message || "Error al registrar usuario";
    return { success: false, errMsg };
  }
};

// Forgot Password
export const forgotPassword = async (email) => {
  try {
    const response = await api.post(`${AUTH_URL}/forgot-password`, { email });
    return { success: true, data: response.data };
  } catch (error) {
    const errMsg = error.response?.data?.message;
    return { success: false, errMsg };
  }
};

// Reset Password
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await api.post(`${AUTH_URL}/reset-password`, {
      token,
      newPassword,
    });
    return { success: true, data: response.data };
  } catch (error) {
    const errMsg = error.response?.data?.message;
    return { success: false, errMsg };
  }
};

// Obtener usuario actual
export const getCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const tokenData = JSON.parse(localStorage.getItem("tokenData"));

  if (!user || !token || !tokenData) return null;

  // Validar expiración del token
  if (new Date(tokenData.expiration) < new Date()) {
    logout();
    return null;
  }

  return user;
};

// Obtener token
export const getAuthToken = () => {
  return localStorage.getItem("token") || null;
};

// Logout
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("tokenData");
};
