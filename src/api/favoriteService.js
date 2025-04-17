const API_URL = 'http://localhost:8080/api/favorites';
import axios from 'axios';



// Obtener favoritos del usuario
export const getUserFavorites = async (token) => {
    const response = await axios.get(API_URL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(response);
    return response.data;
  };
  
  // Añadir una receta a favoritos
  export const addFavorite = async (recipeId, token) => {
    const response = await axios.post(`${API_URL}/${recipeId}`, null, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  };
  
  // Eliminar una receta de favoritos
  export const removeFavorite = async (recipeId, token) => {
    const response = await axios.delete(`${API_URL}/${recipeId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  };
  
  // Exist favorite
  export const isFavorite = async (recipeId, token) => {
    const response = await axios.get(`${API_URL}/exists/${recipeId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data.isFavorite; 
  };