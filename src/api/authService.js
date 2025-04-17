import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

// Login 
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.data.token) {
      throw new Error('No se recibió token en la respuesta');
    }

    const decodedToken = jwtDecode(response.data.token);

    const userData = {
      token: response.data.token,
      tokenType: response.data.type,
      user: {
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
        roles: response.data.roles
      },
      tokenData: {
        issuedAt: new Date(decodedToken.iat * 1000).toISOString(),
        expiration: new Date(decodedToken.exp * 1000).toISOString(),
        subject: decodedToken.sub
      }
    };

    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData.user));
    localStorage.setItem('tokenData', JSON.stringify(userData.tokenData));

    return userData;
  } catch (error) {
    console.error('Error en login:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error de autenticación');
  }
};

//register
export const register = async ({ username, email, password}) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      email,
      password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error en registro:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error al registrar el usuario');
  }
};

// Obtener usuario actual 
export const getCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const tokenData = JSON.parse(localStorage.getItem('tokenData'));

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
  const token = localStorage.getItem('token');
  return token ? token : null;
};

// Logout 
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('tokenData');
};
