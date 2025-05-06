import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner, Alert } from "react-bootstrap";
import { useRecipes } from "../context/RecipeContext";
import { useAuth } from "../context/AuthContext";
import {
  FaHeart,
  FaRegHeart,
  FaSignInAlt,
} from "react-icons/fa";
import { useFavorites } from "../context/FavoriteContext";

// detalle receta - muestra la receta que se le pasa por id
// useState - recipe
// useState - isfavorite (boolean)

const DetailRecipe = () => {
  const { id: recipeId } = useParams();
  const navigate = useNavigate();
  const { fetchRecipeById } = useRecipes();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [recipe, setRecipe] = useState(null);
  const myRecipe = user && recipe && user.id === recipe.userId;
  const { checkIfFavorite, addFavorite, removeFavorite } = useFavorites();
  const [isFavorite, setIsFavorite] = useState(false); // Estado para los favoritos


  useEffect(() => {
    const loadRecipe = async () => {
      setLoading(true);
      try {
        const data = await fetchRecipeById(recipeId);
        setRecipe(data);
      } catch (err) {
        setError(err.errMsg);
      } finally {
        setLoading(false);
      }
    };

    loadRecipe();
  }, [recipeId, fetchRecipeById]);

  // Verificar si la receta está en favoritos
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (recipeId && user) {
        const result = await checkIfFavorite(recipeId);
        setIsFavorite(result);
      }
    };
    checkFavoriteStatus();
  }, [recipeId, user, checkIfFavorite]);

  const toggleFavorite = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (isFavorite) {
      await removeFavorite(recipeId);
      setIsFavorite(false);
    } else {
      await addFavorite(recipeId);
      setIsFavorite(true);
    }
  };


  const getRecipeImageUrl = (imageUrl) => {
    if (!imageUrl) {
      return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80";
    }
    if (imageUrl.startsWith('/')) {
      return `http://localhost:8080${imageUrl}`;
    }
    return imageUrl;
  };



  if (loading)
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  if (error)
    return (
      <div className="container mt-4 ">
        <Alert variant="danger" className="text-center">
          {error}
          <div className="mt-2">
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => window.location.reload()}
            >
              Reintentar
            </button>
          </div>
        </Alert>
      </div>
    );

  if (!recipe) return null;

  return (
    <div className="container-fluid px-0">
      {/* Imagen Principal */}
      <div className="container mt-4">
        <div className="row">
          <div className="col-12">
            <div className="position-relative rounded-4 overflow-hidden" style={{ height: '400px' }}>
              <img
                src={getRecipeImageUrl(recipe.imageUrl)}
                alt={recipe.title}
                className="w-100 h-100 object-fit-cover"
                onError={(e) => {
                  e.target.src = "/recipe_default.jpg";
                }}
              />
              {!recipe.imageUrl && (
                <div className="position-absolute top-50 start-50 translate-middle text-white text-center bg-dark bg-opacity-50 p-3 rounded-4">
                  <h2 className="display-6">{recipe.title}</h2>
                </div>
              )}
              {/* Botones de acción */}
              <div className="position-absolute top-0 start-0 m-3 d-flex gap-2">
                {!myRecipe && (
                  <div className="d-flex gap-2">
                    {!user ? (
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => navigate("/login", {
                          state: { from: `/recipes/${recipe.id}` },
                        })}
                      >
                        <FaSignInAlt className="me-1" />
                        <span className="d-none d-sm-inline">Inicia sesión</span>
                      </button>
                    ) : (
                      <button
                        onClick={toggleFavorite}
                        className={`btn btn-sm ${isFavorite ? 'btn-danger' : 'btn-outline-primary'}`}
                      >
                        {isFavorite ? <FaHeart /> : <FaRegHeart />}
                        <span className="d-none d-sm-inline ms-1">
                          {isFavorite ? 'Eliminar' : 'Favorito'}
                        </span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="container py-4">
        <div className="row g-4">
          {/* Columna Principal */}
          <div className="col-lg-8">
            {/* Título y Categorías */}
            <div className="mb-4">
              <h1 className="display-5 fw-bold mb-3">{recipe.title}</h1>
              <div className="d-flex flex-wrap gap-2 mb-3">
                {recipe.categories?.map((cat, i) => (
                  <span key={i} className="badge bg-primary">
                    {cat}
                  </span>
                ))}
              </div>
              <div className="d-flex align-items-center gap-3 text-muted">
                {recipe.preparationTime && (
                  <span>
                    <i className="fas fa-clock me-2"></i>
                    {recipe.preparationTime} minutos
                  </span>
                )}
                {recipe.userId && (
                  <span>
                    <i className="fas fa-user me-2"></i>
                    Usuario #{recipe.userId}
                  </span>
                )}
              </div>
            </div>

            {/* Descripción */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body p-4">
                <h2 className="h4 mb-3 text-primary">Descripción</h2>
                <p className="lead mb-0">{recipe.description}</p>
              </div>
            </div>

            {/* Preparación */}
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h2 className="h4 mb-4 text-primary">Preparación</h2>
                <div className="preparation-steps">
                  {recipe.preparation
                    .split('\n')
                    .filter(step => step.trim() !== '')
                    .map((step, index) => (
                      <div key={index} className="d-flex mb-4">
                        <div className="flex-shrink-0">
                          <span className="badge bg-primary rounded-circle p-2 me-3">{index + 1}</span>
                        </div>
                        <p className="mb-0">{step}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Ingredientes */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm sticky-top" style={{ top: '2rem' }}>
              <div className="card-body p-4">
                <h2 className="h4 mb-4 text-primary">Ingredientes</h2>
                <div className="ingredients-list">
                  {recipe.ingredients?.map((ing, i) => (
                    <div key={i} className="d-flex align-items-center mb-3">
                      <img
                        src={ing.imageUrl ? `http://localhost:8080${ing.imageUrl}` : "/default_ingredient.png"}
                        alt={ing.name}
                        className="rounded-circle me-3"
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.src = "/default_ingredient.png";
                        }}
                      />
                      <div className="flex-grow-1">
                        <h3 className="h6 mb-0">{ing.name}</h3>
                        <div className="d-flex align-items-center">
                          <span className="badge bg-primary me-2">{ing.quantity}</span>
                          <small className="text-muted text-capitalize">
                            {ing.unit_measure === 'unit' ? 'unidad' :
                              ing.unit_measure === 'gram' ? 'gramos' :
                                ing.unit_measure === 'liter' ? 'litros' :
                                  ing.unit_measure === 'ml' ? 'mililitros' :
                                    ing.unit_measure === 'kg' ? 'kilogramos' :
                                      ing.unit_measure === 'tbsp' ? 'cucharadas' :
                                        ing.unit_measure === 'tsp' ? 'cucharaditas' :
                                          ing.unit_measure === 'cup' ? 'tazas' :
                                            ing.unit_measure === 'oz' ? 'onzas' :
                                              ing.unit_measure === 'lb' ? 'libras' :
                                                ing.unit_measure || "unidad"}
                          </small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Botón de Volver */}
                <div className="d-grid gap-2 mt-4">
                  <button
                    onClick={() => navigate(-1)}
                    className="btn btn-outline-primary"
                  >
                    <i className="fas fa-arrow-left me-2"></i>
                    Volver atrás
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getStatus = (status) => {
  switch (status) {
    case "APPROVED":
      return "bg-success";
    case "REJECTED":
      return "bg-danger";
    case "PENDING":
      return "bg-warning text-dark";
    default:
      return "bg-secondary";
  }
};

export default DetailRecipe;
