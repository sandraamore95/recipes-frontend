import api from "./apiClient";
const RECIPES_URL = "/recipes";

// get all recetas
export const getAllRecipes = async (page = 0, size = 10) => {
  try {
     const response = await api.get(`${RECIPES_URL}?page=${page}&size=${size}`);
     console.log(response.data);
     return { success: true, data: response.data };
  } catch (error) {
    const errMsg =
    error.response?.data?.message || "Ha ocurrido un error al cargar las recetas";
    return { success: false, errMsg };
  }
};

// get receta by id
export const getRecipeById = async (id) => {
  try {
    const response = await api.get(`${RECIPES_URL}/${id}`);   
    return { success: true, data: response.data };
  } catch (error) {
    const errMsg =
    error.response?.data?.message || "Receta no encontrada";
    return { success: false, errMsg };
  }
};

// get receta by title
export const getRecipeByTitle = async (title) => {
  try {
    const response = await api.get(`${RECIPES_URL}/title/${title}`);
    return { success: true, data: response.data };
  } catch (error) {
    const errMsg =
    error.response?.data?.message || "Receta no encontrada con ese titulo";
  return { success: false, errMsg };
  }
};

// add receta - > autorizacion token
export const createRecipe = async (recipeData) => {
  try {
    const response = await api.post(RECIPES_URL, recipeData);
    return { success: true, data: response.data };
  } catch (error) {
    const errMsg =
      error.response?.data?.message || "Error al crear la  receta";
    return { success: false, errMsg };
  }
};

//update - > autorizacion token
export const updateRecipe = async (recipeId, recipeData) => {
  try {
    const response = await api.put(`${RECIPES_URL}/${recipeId}`, recipeData);
    return { success: true, data: response.data };
  } catch (error) {
    console.log(error);
    const errMsg =
      error.response?.data?.message || "Error al modificar receta";
    return { success: false, errMsg };
  }
};

//delete - > autorizacion token
export const deleteRecipe = async (id) => {
  try {
    const response = await api.delete(`${RECIPES_URL}/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.log(error);
    const errMsg = error.response?.data?.error || "Error al eliminar receta";
    return { success: false, errMsg };
  }
};
