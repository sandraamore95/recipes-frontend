import React from 'react';
import RecipeSearchAndList from '../components/RecipeSearchAndList';
import { useRecipes } from '../context/RecipeContext';
import { Spinner } from "react-bootstrap";
const RecipeCatalog = () => {
    const { recipes, loading, error } = useRecipes();
    
    
 
       if (loading || (recipes.length === 0)) {
              return (
                  <div className="d-flex justify-content-center my-5">
                      <Spinner animation="border" variant="primary" />
                  </div>
              );
          }
    
      return <RecipeSearchAndList recipes={recipes} />;
    };

export default RecipeCatalog;
