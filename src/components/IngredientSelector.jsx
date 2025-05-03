import React, { useState, useEffect, useRef } from "react";
import { useDebounce } from "use-debounce";
import { useIngredients } from "../context/IngredientContext";

const IngredientSelector = ({ onAddIngredient, selectedIngredients }) => {
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

    // Efecto solo para debuggear
    useEffect(() => {
        console.log("Ingredientes actualizados:", ingredients);
    }, [ingredients]); // Se ejecuta cuando ingredients cambia

    const handleAdd = (ingredient) => {
        const alreadyAdded = selectedIngredients.some(i => i.id === ingredient.id);
        if (!alreadyAdded) {
            onAddIngredient({
                id: ingredient.id,
                name: ingredient.name,
                unit: ingredient.unit_measure || "unidades",
                quantity: 1,
                imageUrl: ingredient.imageUrl
            });
            setSearchTerm("");
        }
    };

    const getImageUrl = (imageUrl) => {
        if (!imageUrl) {
            return "/default-ingredient.png";
        }
        if (imageUrl.startsWith('/')) {
            return `http://localhost:8080${imageUrl}`;
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
                <div className="overflow-auto border rounded mt-2" style={{ maxHeight: '200px' }}>
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
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            objectFit: 'cover'
                                        }}
                                        onError={(e) => {
                                            e.target.src = "/default-ingredient.png";
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
                        {selectedIngredients.map((ingredient) => (
                            <div 
                                key={ingredient.id} 
                                className="list-group-item d-flex align-items-center"
                            >
                                <img
                                    src={getImageUrl(ingredient.imageUrl)}
                                    alt={ingredient.name}
                                    className="rounded me-3"
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        objectFit: 'cover'
                                    }}
                                    onError={(e) => {
                                        e.target.src = "/default-ingredient.png";
                                    }}
                                />
                                <div className="flex-grow-1">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span>{ingredient.name}</span>
                                        <span className="badge bg-primary rounded-pill">
                                            {ingredient.quantity} {ingredient.unit}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default IngredientSelector;
