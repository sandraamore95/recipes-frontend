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
    <div className="container my-4">
      <div className="card shadow-lg overflow-hidden">
        <div className="row g-0">
          {/* Sección de imagen */}
          <div className="col-lg-5">
            <div className="position-relative h-100">
              <img
                src={
                  recipe.image ||
                  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
                }
                alt={recipe.title}
                className="img-fluid h-100 w-100 object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80";
                }}
              />

              {/* Iconos de acciones diferentes segun autentificacion  */}
              <div className="position-absolute top-0 start-0 m-3 d-flex gap-2">
                {/* Mostrar favoritos SOLO si no es el dueño */}
                {!myRecipe && (
                  <div className="d-flex gap-2">
                    {/* Usuario no autenticado */}
                    {!user && (
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() =>
                          navigate("/login", {
                            state: { from: `/recipes/${recipe.id}` },
                          })
                        }
                        title="Inicia sesión para interactuar"
                      >
                        <FaSignInAlt className="me-1" />
                        <span className="d-none d-sm-inline">
                          Inicia sesión
                        </span>
                      </button>
                    )}

                    {/* Mostrar icono de favorito basado en isFavorite */}
                    {isFavorite ? (
                      <button
                        onClick={toggleFavorite}
                        className="btn btn-sm btn-outline-danger"
                      >
                        <FaHeart className="me-1" />
                        <span className="d-none d-sm-inline">
                          Eliminar de favoritos
                        </span>
                      </button>
                    ) : (
                      <button
                        onClick={toggleFavorite}
                        className="btn btn-sm btn-outline-primary"
                      >
                        <FaRegHeart className="me-1" />
                        <span className="d-none d-sm-inline">
                          Agregar a favoritos
                        </span>
                      </button>
                    )}
                  </div>
                )}
              </div>
              <div className="position-absolute top-0 end-0 m-2">
                <span className={`badge ${getStatus(recipe.status)}`}>
                  {recipe.status}
                </span>
              </div>
            </div>
          </div>

          {/* Sección de contenido */}
          <div className="col-lg-7">
            <div className="card-body p-4">
              <h1 className="card-title fw-bold mb-3 text-primary">
                {recipe.title}
              </h1>

              <div className="mb-4">
                <h5 className="text-muted mb-2">Descripción</h5>
                <p className="card-text">{recipe.description}</p>
              </div>

              <div className="mb-4">
                <h5 className="text-muted mb-2">Preparación</h5>
                <div className="bg-light p-3 rounded">
                  {recipe.preparation.split("\n").map((step, i) => (
                    <p key={i} className="mb-2">
                      <strong className="text-primary">Paso {i + 1}:</strong>{" "}
                      {step}
                    </p>
                  ))}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <h5 className="text-muted mb-2">Categorías</h5>
                  <div className="d-flex flex-wrap gap-2">
                    {recipe.categories?.length > 0 ? (
                      recipe.categories.map((cat, i) => (
                        <span key={i} className="badge bg-secondary">
                          {cat}
                        </span>
                      ))
                    ) : (
                      <span className="text-muted">Sin categorías</span>
                    )}
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <h5 className="text-muted mb-2">Tiempo de preparación</h5>
                  <p>
                    {recipe.preparationTime
                      ? `${recipe.preparationTime} minutos`
                      : "No especificado"}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <h5 className="text-muted mb-2">Ingredientes</h5>
                <ul className="list-group">
                {recipe.ingredients?.length > 0 ? (
                    recipe.ingredients.map((ing, i) => (
                      <li
                        key={i}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={ing.imageUrl ? `http://localhost:8080${ing.imageUrl}` : "https://via.placeholder.com/40"}
                            alt={ing.name || `Ingrediente ${i + 1}`}
                            className="rounded"
                            style={{ width: "40px", height: "40px", objectFit: "cover" }}
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/40";
                            }}
                          />
                          <span>{ing.name || `Ingrediente ${i + 1}`}</span>
                        </div>
                        <span className="badge bg-primary rounded-pill">
                          {ing.quantity}
                        </span>
                      </li>
                    ))
                  ) : (
                    <li className="list-group-item text-muted">
                      No hay ingredientes
                    </li>
                  )}
                </ul>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-4">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => navigate(-1)}
                >
                  ← Volver atrás
                </button>

                <div className="d-flex gap-2">
                  {recipe.userId && (
                    <span className="text-muted align-self-center">
                      Creado por: Usuario #{recipe.userId}
                    </span>
                  )}
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
