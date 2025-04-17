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
      const data = await favoriteService.getUserFavorites(token);
      setFavorites(data.map(fav => fav.recipe));
    } catch (err) {
      console.error(err);
      setError("No se pudieron obtener los favoritos.");
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = async (recipeId) => {
    try {
      const newFav = await favoriteService.addFavorite(recipeId, token);
      setFavorites((prev) => [...prev, newFav]);
    } catch (err) {
      console.error(err);
    }
  };

  const removeFavorite = async (recipeId) => {
    console.log("vamos a desmarcar favoritos");
    try {
      await favoriteService.removeFavorite(recipeId, token);
      setFavorites((prev) =>
        prev.filter((fav) => fav.recipe && fav.recipe.id !== recipeId)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const checkIfFavorite = async (recipeId) => {
    try {
      const response = await favoriteService.isFavorite(recipeId, token);
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
