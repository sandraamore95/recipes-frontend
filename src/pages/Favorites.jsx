import { useEffect } from "react";
import RecipeSearchAndList from "../components/RecipeSearchAndList";
import { useFavorites } from "../context/FavoriteContext";
import { Spinner } from "react-bootstrap";

function Favorites() {
  const { favorites, loading, error, getFavorites } = useFavorites();

  useEffect(() => {
    getFavorites();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-3">
        <Spinner animation="border" variant="primary" />
        <p className="ms-2">Cargando...</p>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

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
}
export default Favorites;
