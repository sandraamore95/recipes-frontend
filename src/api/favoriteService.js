import api from "./apiClient";
const FAVORITE_URL = "/favorites";

// Obtener favoritos del usuario
export const getUserFavorites = async () => {
  try {
    const response = await api.get(FAVORITE_URL);
    console.log(response);
    return { success: true, data: response.data };
  } catch (error) {
    console.log(error);
    const errMsg =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Ha ocurrido un error al cargar los favoritos";
    return { success: false, errMsg };
  }
};

// Añadir una receta a favoritos
export const addFavorite = async (recipeId) => {
  try {
    const response = await api.post(`${FAVORITE_URL}/${recipeId}`);
    return { success: true, data: response.data };
  } catch (error) {
    const errMsg =
      error.response?.data?.message ||
      "No se pudo agregar la receta a favoritos";
    return { success: false, errMsg };
  }
};

// Eliminar una receta de favoritos
export const removeFavorite = async (recipeId) => {
  try {
    const response = await api.delete(`${FAVORITE_URL}/${recipeId}`);
    return { success: true, data: response.data };
  } catch (error) {
    const errMsg =
      error.response?.data?.message ||
      "No se pudo eliminar la receta de favoritos";
    return { success: false, errMsg };
  }

};

// Exist favorite
export const isFavorite = async (recipeId) => {
  const response = await api.get(`${FAVORITE_URL}/exists/${recipeId}`);
  return response.data.isFavorite;
};
