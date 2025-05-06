import React, { createContext, useState, useEffect } from "react";
import * as recipeService from "../api/recipeService";

export const RecipesContext = createContext();

// Esto permite realizar la llamada a la API una sola vez y compartir los datos entre varios componentes
export const RecipesProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]); // Este estado se comparte por CATALOG/FAVORITOS/POPULARES/MISRECETAS
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Inicializamos el contexto, cargando todas las recetas
  useEffect(() => {
    fetchRecipes();
  }, []);

  // Obtener todas las recetas
  const fetchRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await recipeService.getAllRecipes(0, 20);
  
      if (!result.success) {
        throw new Error(result.errMsg);
      }
  
      const recipeList = result.data.content;
      console.log(result.data);
      setRecipes(recipeList);
  
      if (recipeList.length === 0) {
        setError("No se encontraron recetas.");
      }
  
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  // Obtener receta por Id
  const fetchRecipeById = async (id) => {
    const result = await recipeService.getRecipeById(id);
    if (!result.success) {
      throw result;
    }
    console.log(result.data);
    return result.data;
  };

  // Crear receta
  const addRecipe = async (recipeData,imageFile) => {
    setLoading(true);
    try {
      const result = await recipeService.createRecipe(recipeData);
      if (!result.success) {
        throw new Error(result.errMsg);
      }

      const recipeId = result.data.id;
      if (imageFile) {
        const uploadResult = await recipeService.uploadRecipeImage(recipeId, imageFile);
        if (!uploadResult.success) {
          throw new Error(uploadResult.errMsg || "Error al cargar la imagen");
        }
      }else{
        console.log("No se ha subido ninguna imagen");
      }
      await fetchRecipes(); // Recargar recetas
      return result.data;
    } catch (err) {
      throw err.message;
    } finally {
      setLoading(false);
    }
  };


  // Editar receta
  const updateRecipe = async (recipeId, recipeData,imageFile) => {
    setLoading(true);
    try {
      const result = await recipeService.updateRecipe(recipeId, recipeData);
      if (!result.success) {
        throw new Error(result.errMsg);
      }
      if (imageFile) {
        const uploadResult = await recipeService.uploadRecipeImage(recipeId, imageFile);
        if (!uploadResult.success) {
          throw new Error(uploadResult.errMsg || "Error al cargar la imagen");
        }
      }

      const updatedRecipe = result.data;
      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe.id === parseInt(recipeId) ? updatedRecipe : recipe
        )
      );
      await fetchRecipes(); 
      return updatedRecipe;
    } catch (err) {
      throw err.message;
    } finally {
      setLoading(false);
    }
  };

  // Eliminar receta
  const deleteRecipe = async (recipeId) => {
    setLoading(true);
    try {
      const result = await recipeService.deleteRecipe(recipeId);
      if (!result.success) {
        throw new Error(result.errMsg);
      }
      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== recipeId)
      );
      return result.data;
    } catch (er) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update imagen
  const uploadRecipeImage = async (recipeId,imageFile) => {
    setLoading(true);
    try {
      const result = await recipeService.uploadRecipeImage(recipeId, imageFile);
      if (!result.success) {
        throw new Error(result.errMsg);
      }
      const updatedRecipe = result.data;
      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe.id === parseInt(recipeId) ? updatedRecipe : recipe
        )
      );
      return updatedRecipe;
    } catch (err) {
      throw err.message;
    } finally {
      setLoading(false);
    }
  };


  const value = {
    recipes,
    loading,
    error,
    fetchRecipes,
    addRecipe,
    deleteRecipe,
    updateRecipe,
    fetchRecipeById,
    uploadRecipeImage
  };

  return (
    <RecipesContext.Provider value={value}>{children}</RecipesContext.Provider>
  );
};

// Hook para usar el contexto
export const useRecipes = () => {
  const context = React.useContext(RecipesContext);
  if (!context) {
    throw new Error("useRecipes debe ser usado dentro de un RecipeProvider");
  }
  return context;
};
