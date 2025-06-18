import React, { useState, useEffect, useRef } from "react";
import { useDebounce } from "use-debounce";
import { useIngredients } from "../context/IngredientContext";

const COUNTABLE_UNITS = ["UNIDADES", "TAZAS", "CUCHARADAS", "CUCHARADITAS"];

const IngredientSelector = ({
  onAddIngredient,
  selectedIngredients,
  onRemoveIngredient,
  onIncrementQuantity,
  onDecrementQuantity,
  onUpdateQuantity
}) => {
  const { ingredients, searchIngredients, loading } = useIngredients();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const lastSearchTerm = useRef("");

  useEffect(() => {
    if (debouncedSearchTerm !== lastSearchTerm.current) {
      searchIngredients(debouncedSearchTerm);
      lastSearchTerm.current = debouncedSearchTerm;
    }
  }, [debouncedSearchTerm]);

  const handleAdd = (ingredient) => {
    const alreadyAdded = selectedIngredients.some((i) => i.id === ingredient.id);
    if (!alreadyAdded) {
      onAddIngredient({
        id: ingredient.id,
        name: ingredient.name,
        unit: ingredient.unit_measure || "UNIDADES",
        quantity: 1,
        imageUrl: ingredient.imageUrl
      });
      setSearchTerm("");
    }
  };

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) {
      return "/default_ingredient.png";
    }
    if (imageUrl.startsWith("/")) {
      return `https://recetasyummy.duckdns.org${imageUrl}`;
    }
    return imageUrl;
  };

  return (
    <div className="mb-3">
      <label className="form-label">Ingredientes</label>
      <input
        type="text"
        placeholder="Buscar ingredientes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control"
      />

      {loading && <p className="text-muted">Buscando...</p>}

      {!loading && searchTerm && (
        <div className="overflow-auto border rounded mt-2" style={{ maxHeight: "200px" }}>
          {ingredients.length > 0 ? (
            ingredients.map((ingredient) => (
              <div
                key={ingredient.id}
                className="p-2 hover-bg-light d-flex align-items-center"
                onClick={() => handleAdd(ingredient)}
                style={{
                  cursor: "pointer",
                  transition: "background-color 0.2s"
                }}
              >
                <div className="d-flex align-items-center w-100">
                  <img
                    src={getImageUrl(ingredient.imageUrl)}
                    alt={ingredient.name}
                    className="rounded me-3"
                    style={{ width: "40px", height: "40px", objectFit: "cover" }}
                    onError={(e) => {
                      e.target.src = "/default_ingredient.png";
                    }}
                  />
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-medium">{ingredient.name}</span>
                      <span className="text-muted small">({ingredient.unit_measure})</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="p-2 text-muted">No se encontraron ingredientes</p>
          )}
        </div>
      )}

      {selectedIngredients.length > 0 && (
        <div className="mt-3">
          <h6>Ingredientes seleccionados:</h6>
          <div className="list-group">
            {selectedIngredients.map((ingredient) => {
              const isCountable = COUNTABLE_UNITS.includes(ingredient.unit?.toUpperCase());

              return (
                <div
                  key={ingredient.id}
                  className="list-group-item d-flex align-items-center justify-content-between"
                >
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={getImageUrl(ingredient.imageUrl)}
                      alt={ingredient.name}
                      className="rounded shadow-sm"
                      style={{ width: "40px", height: "40px", objectFit: "cover" }}
                      onError={(e) => {
                        e.target.src = "/default_ingredient.png";
                      }}
                    />
                    <div>
                      <h6 className="mb-0 fw-bold text-primary">{ingredient.name}</h6>
                      {isCountable ? (
                        <small className="text-muted">
                          {ingredient.quantity} {ingredient.unit.toLowerCase()}
                        </small>
                      ) : (
                        <div className="d-flex align-items-center gap-2">
                          <input
                            type="number"
                            min="1"
                            value={ingredient.quantity}
                            onChange={(e) =>
                              onUpdateQuantity(ingredient.id, parseInt(e.target.value))
                            }
                            className="form-control form-control-sm"
                            style={{ width: "80px" }}
                          />
                          <span className="text-muted small">{ingredient.unit.toLowerCase()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    {isCountable && (
                      <>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger btn-circle"
                          onClick={() => onDecrementQuantity(ingredient)}
                        >
                          -
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-success btn-circle"
                          onClick={() => onIncrementQuantity(ingredient)}
                        >
                          +
                        </button>
                      </>
                    )}
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onRemoveIngredient(ingredient.id)}
                    >
                      x
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default IngredientSelector;
