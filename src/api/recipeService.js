const API_URL = 'http://localhost:8080/api/recipes';
import axios from 'axios';

// get all recetas
export const getAllRecipes = async (page = 0, size = 10) => {
  const response = await axios.get(`${API_URL}?page=${page}&size=${size}`);
  return response.data; 
};

// get receta by id
export const getRecipeById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// get receta by title
export const getRecipeByTitle = async (title) => {
  const response = await axios.get(`${API_URL}/title/${title}`);
  return response.data;
};

// add receta
export const createRecipe = async (recipeData, token) => {
  const response = await axios.post(API_URL, recipeData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};

//update
export const updateRecipe = async (recipeId, recipeData, token) => {
  const response = await axios.put(`${API_URL}/${recipeId}`, recipeData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};


//delete
export const deleteRecipe = async (id, token) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};