import { createContext, useContext, useEffect, useState } from "react";
import * as favoriteService from "../api/favoriteService";
import { useAuth } from "./AuthContext";

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const { token, user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      getFavorites();
    }
  }, [user]);

  const getFavorites = async () => {
    try {
      setLoading(true);
      const result = await favoriteService.getUserFavorites();
      if(!result.success){
        setError("No se pudieron obtener los favoritos.");
      }
      const data=result.data;
      setFavorites(data.map((fav) => fav.recipe)); //extraigo las recetas de cada favorito
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error inesperado al obtener los favoritos.")
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = async (recipeId) => {
    try {
      const result = await favoriteService.addFavorite(recipeId);
      if (!result.success) {
        setError(result.errMsg); 
        return;
      }
      const newRecipe = result.data.recipe;
      setFavorites((prev) => [...prev, newRecipe]);
    } catch (err) {
      throw err;
    }
  };

  
  const removeFavorite = async (recipeId) => {
    try {
      const result = await favoriteService.removeFavorite(recipeId);
      if (!result.success) {
        setError(result.errMsg);
        return;
      }
      setFavorites((prev) => prev.filter((fav) => fav.id !== recipeId));
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const checkIfFavorite = async (recipeId) => {
    try {
      const response = await favoriteService.isFavorite(recipeId);
      return response;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        loading,
        error,
        getFavorites,
        addFavorite,
        removeFavorite,
        checkIfFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoriteContext);
