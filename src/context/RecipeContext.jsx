import React, { createContext, useState, useEffect } from 'react';
import * as recipeService from '../api/recipeService';

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
        try {
            setLoading(true);
            const data = await recipeService.getAllRecipes(0, 20);
            console.log(data.content);
            setRecipes(data.content);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    // Obtener receta por Id
 const fetchRecipeById = async (id) => {
    try {
        const data = await recipeService.getRecipeById(id);
        return data;
    } catch (err) {
        const errorMsg = err.response?.data?.message || err.message;
        throw new Error(errorMsg); // ← importante: no setea error global
    }
};
    // Crear receta
    const addRecipe = async (recipeData, token) => {
        setLoading(true);
        setError(null);
        try {
            const newRecipe = await recipeService.createRecipe(recipeData, token);
            await fetchRecipes(); // Recargar recetas
            return newRecipe;
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message;
            setError(errorMsg);
            throw new Error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    // Editar receta
    const updateRecipe = async (recipeId, recipeData, token) => {
        setLoading(true);
        setError(null);
        try {
            const updatedRecipe = await recipeService.updateRecipe(recipeId, recipeData, token);
            setRecipes(prevRecipes =>
                prevRecipes.map(recipe =>
                    recipe.id === parseInt(recipeId) ? updatedRecipe : recipe
                )
            );
            return updatedRecipe;
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message;
            setError(errorMsg);
            throw new Error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    // Eliminar receta
    const deleteRecipe = async (recipeId, token) => {
        setLoading(true);
        setError(null);
        try {
            await recipeService.deleteRecipe(recipeId, token);
            setRecipes(prevRecipes =>
                prevRecipes.filter(recipe => recipe.id !== recipeId)
            );
            console.log('Receta eliminada correctamente');
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message;
            setError(errorMsg);
            console.log('Error al eliminar la receta');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const value = { recipes, loading, error, fetchRecipes, addRecipe, deleteRecipe, updateRecipe ,  fetchRecipeById};

    return (
        <RecipesContext.Provider value={value}>
            {children}
        </RecipesContext.Provider>
    );
};

// Hook para usar el contexto
export const useRecipes = () => {
    const context = React.useContext(RecipesContext);
    if (!context) {
        throw new Error('useRecipes debe ser usado dentro de un RecipeProvider');
    }
    return context;
};
