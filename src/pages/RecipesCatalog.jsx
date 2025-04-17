import React from 'react';
import RecipeSearchAndList from '../components/RecipeSearchAndList';
import { useRecipes } from '../context/RecipeContext';

const RecipeCatalog = () => {
    const { recipes, loading, error } = useRecipes();

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return <RecipeSearchAndList recipes={recipes} />;
}
export default RecipeCatalog;
