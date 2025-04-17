import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaHeartBroken, FaBookOpen } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useRecipes } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoriteContext';

const RecipeCard = ({ recipe, viewType }) => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const { removeFavorite } = useFavorites();
  const { deleteRecipe, loading, error } = useRecipes();

  
  useEffect(() => {
    console.log("estamos en el componente de recipecard");
    }, []);

  const getActions = () => {
    switch (viewType) {
      case 'my-recipes':
        return (
          <div className="position-absolute top-0 end-0 p-2">
            <button
              onClick={() => handleEdit(recipe.id)}
              className="btn btn-sm btn-icon rounded-circle bg-white text-primary shadow-sm me-1"
              style={{ width: '32px', height: '32px' }}
              aria-label="Editar"
            >
              <FaEdit />
            </button>
            < button
              onClick={() => handleDelete(recipe.id, token)}
              className="btn btn-sm btn-icon rounded-circle bg-white text-danger shadow-sm"
              style={{ width: '32px', height: '32px' }}
              aria-label="Eliminar"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                <FaTrash />
              )}
            </button>
          </div >
        );
      case 'fav-recipes':
        return (
          <div className="position-absolute top-0 end-0 p-2">
            <button
              onClick={() => handleRemoveFavorite(recipe.id)}
              className="badge bg-danger"
              aria-label="Quitar de favoritos"
            >
              <FaHeartBroken /> Quitar
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  const handleEdit = (recipeId) => {
    console.log("vamos a editar la receta", recipeId);
    navigate(`/edit-recipe/${recipeId}`);
  };

  const handleDelete = async (recipeId, token) => {
    try {
      await deleteRecipe(recipeId, token);
      toast.success('Receta eliminada correctamente');
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Error al eliminar la receta';
      toast.error(errorMsg);
    }
  }

  const handleRemoveFavorite = async (recipeId) => {
    try {
      await removeFavorite(recipeId); // esta función está en tu contexto
      toast.success("Receta eliminada de favoritos 🗑️");
    } catch (err) {
      toast.error("Ocurrió un error al quitar de favoritos");
    }
  };


  return (
    <div className="col">
      <div
        className="card h-100 shadow-sm border-0 recipe-card"
        style={{ cursor: 'pointer' }}
      >
        <div className="ratio ratio-16x9 position-relative">
          <img
            src={recipe.image || 'https://blogs.oximesa.es/wp-content/uploads/2017/11/Postres-deliciosos-y-saludables.jpg'}
            alt={recipe.title}
            className="card-img-top object-fit-cover"
            style={{ objectFit: 'cover' }}
          />

          {getActions()}
        </div>
        

        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-bold text-primary">{recipe.title}</h5>
          <p className="card-text text-muted">
            {recipe.description.length > 100
              ? `${recipe.description.substring(0, 100)}...`
              : recipe.description}
          </p>

          {/* Categorías */}
          {recipe.categories && recipe.categories.length > 0 && (
            <div className="mb-2">
              {recipe.categories.map((cat, index) => (
                <span key={index} className="badge bg-secondary me-1">
                  {cat}
                </span>
              ))}
            </div>
          )}

          <div className="mt-auto">
            <button onClick={() => navigate(`/recipes/${recipe.id}`)}
              className="btn btn-outline-primary  w-100 py-2 d-flex align-items-center justify-content-center gap-2"
            > <FaBookOpen size={14} />
              Ver receta completa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;