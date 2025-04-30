import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  login as authLogin,
  register as authRegister,
  logout as authLogout,
  forgotPassword as authforgotPassword,
  resetPassword as authresetPassword,
  getCurrentUser,
} from "../api/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // verificar usuario
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const currentUser = getCurrentUser();
        const storedToken = localStorage.getItem("token");

        if (currentUser && storedToken) {
          setUser(currentUser);
          setToken(storedToken);
        }
      } catch (err) {
        setError(err.message || "Error en autentificacion");
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  const login = async (username, password) => {
    const result = await authLogin(username, password);

    if (!result.success) {
      throw new Error(result);
    }
    const { token, user, tokenData } = result.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("tokenData", JSON.stringify(tokenData));

    setToken(token);
    setUser(user);
    return result;
  };

  //register
  const register = async (credentials) => {
    const result = await authRegister(credentials);
    if (!result.success) {
      throw result;
    }
    return result.data;
  };

  // logout
  const logout = () => {
    authLogout();
    setUser(null);
    setToken(null);
    setError(null); // Limpia el error al hacer logout
    navigate("/login");
  };

  const forgotPassword = async (email) => {
    const result = await authforgotPassword(email);
    if (!result.success) {
      throw result;
    }
    return result.data;
  };

  const resetPassword = async (token, newPassword) => {
    const result =  await authresetPassword(token, newPassword);
    if (!result.success) {
      console.log(result);
      throw result;
    }
    return result.data;
  };

  // Valor del contexto
  const value = {
    user,
    token,
    loading,
    error,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
