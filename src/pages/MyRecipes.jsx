import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RecipeSearchAndList from '../components/RecipeSearchAndList';
import { useRecipes } from '../context/RecipeContext';

function MyRecipes() {
  const { user } = useAuth();
  const { recipes, loading, error } = useRecipes();
  const [myRecipes, setmyRecipes] = useState([]);

  useEffect(() => {
    if (user && recipes.length > 0) {
      const filteredRecipes = recipes.filter(recipe => recipe.userId === user.id);
      setmyRecipes(filteredRecipes);
    }
  }, [user, recipes]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container pt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Link to="/add-recipe" className="btn btn-primary">
          + Crear Nueva Receta
        </Link>
      </div>

      {myRecipes.length > 0 ? (
        <RecipeSearchAndList recipes={myRecipes} viewType="my-recipes" />
      ) : (
        <div className="text-center">
          <p className="lead">No tienes recetas guardadas o creadas.</p>
        </div>
      )}
    </div>
  );
}

export default MyRecipes;
