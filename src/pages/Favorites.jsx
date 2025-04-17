import { useEffect } from "react";
import RecipeSearchAndList from "../components/RecipeSearchAndList";
import { useFavorites } from "../context/FavoriteContext";

function Favorites() {
  const { favorites, loading, error } = useFavorites();


    useEffect(() => {
      console.log("estamos en componnete de favoritos con : ");
       console.log(favorites); // favoritos es null 
    }, []);



  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container pt-5">
      {favorites.length > 0 ? (
        <RecipeSearchAndList recipes={favorites} viewType="fav-recipes" />
      ) : (
        <div className="text-center">
          <p className="lead">No tienes recetas favoritas en estos momentos</p>
        </div>
      )}
    </div>
  );
}export default Favorites;
