import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RecipeSearchAndList from '../components/RecipeSearchAndList';
import { useRecipes } from '../context/RecipeContext';
import { Spinner } from 'react-bootstrap';

function MyRecipes() {
  const { user } = useAuth();
  const { recipes, loading} = useRecipes();
  const [myRecipes, setMyRecipes] = useState([]);

  useEffect(() => {
    if (user && recipes) {
      const filteredRecipes = recipes.filter(recipe => recipe.userId === user.id);
      setMyRecipes(filteredRecipes);
    }
  }, [user, recipes]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-3">
        <Spinner animation="border" variant="primary" />
        <p className="ms-2">Cargando...</p>
      </div>
    );
  }

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
          <p className="text-muted">¡Comienza creando tu primera receta!</p>
        </div>
      )}
    </div>
  );
}

export default MyRecipes;
