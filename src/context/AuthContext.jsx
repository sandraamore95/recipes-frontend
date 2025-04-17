import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as authLogin, register as authRegister, logout as authLogout, getCurrentUser } from '../api/authService';

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
        const storedToken = localStorage.getItem('token');

        if (currentUser && storedToken) {
          setUser(currentUser);
          setToken(storedToken);
        }
      } catch (err) {
        setError(err.message || 'Error en autentificacion');
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);


  // login
  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await authLogin(username, password);
      localStorage.setItem('token', userData.token);
      localStorage.setItem('user', JSON.stringify(userData.user));
      setToken(userData.token);
      setUser(userData.user);
      navigate('/');
      return true;
    } catch (err) {
      setError(err.message || 'Error Login');
      return false;
    } finally {
      setLoading(false);
    }
  };

  //register
  const register = async (username, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authRegister(username,email,  password);
      return response;
    } catch (err) {
      setError(err.message);
      throw err; 
    } finally {
      setLoading(false);
    }
  }

  // logout
  const logout = () => {
    authLogout();
    setUser(null);
    setToken(null);
    setError(null); // Limpia el error al hacer logout
    navigate('/login');
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
    isAuthenticated: !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
