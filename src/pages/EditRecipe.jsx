import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext";
import RecipeForm from "../components/RecipeForm";
import { Alert, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const EditRecipe = () => {
    const { id: recipeId } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true); // loading local
    const [error, setError] = useState(null);     // error local
    const { fetchRecipeById, updateRecipe } = useRecipes();
    const navigate = useNavigate();

    useEffect(() => {
        const loadRecipe = async () => {
            try {
                setLoading(true);
                const data = await fetchRecipeById(parseInt(recipeId));
                setRecipe(data);
                setError(null);
            } catch (err) {
                toast.error(err);
                setError(err.message || "Error al cargar la receta");
            } finally {
                setLoading(false);
            }
        };

        loadRecipe();
    }, [recipeId]);

    const handleUpdate = async (updatedRecipe,imageFile) => {
        try {
            await updateRecipe(recipeId, updatedRecipe, imageFile);
            toast.success("Receta actualizada con éxito!");
            navigate(`/recipes/${recipeId}`);
        } catch (err) {
            toast.error(err);
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center mt-3">
                <Spinner animation="border" variant="primary" />
                <p className="ms-2">Cargando receta...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-4">
                <Alert variant="danger" className="text-center">
                    {error}
                </Alert>
            </div>
        );
    }

    if (!recipe) {
        return <div className="text-center mt-4">Receta no encontrada.</div>;
    }

    return (
        <div className="container mt-4">
            <h2>Editar Receta</h2>
            <RecipeForm initialData={recipe} onSubmit={handleUpdate} isEditing={true} />
        </div>
    );
};

export default EditRecipe;