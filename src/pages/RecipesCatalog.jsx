import React from 'react';
import RecipeSearchAndList from '../components/RecipeSearchAndList';
import { useRecipes } from '../context/RecipeContext';
import { Spinner } from "react-bootstrap";
const RecipeCatalog = () => {
    const { recipes, loading, error } = useRecipes();
    
    
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
    
      return <RecipeSearchAndList recipes={recipes} />;
    };

export default RecipeCatalog;
