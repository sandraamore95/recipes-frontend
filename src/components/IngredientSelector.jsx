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
            console.log(debouncedSearchTerm);
            searchIngredients(debouncedSearchTerm); //http://localhost:8080/api/ingredients?name=${search}
            lastSearchTerm.current = debouncedSearchTerm;
        }
    }, [debouncedSearchTerm]); // cuando cambia el termino , se llama de nuevo al backend

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
                unit: ingredient.unit || "unidades",
                quantity: 1
            });
            setSearchTerm("");
        }
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
                                className="p-2 hover-bg-light d-flex justify-content-between align-items-center"
                                onClick={() => handleAdd(ingredient)}
                                style={{ cursor: "pointer" }}
                            >
                                <span>{ingredient.name}</span>
                                <span className="text-muted">({ingredient.unit})</span>
                            </div>
                        ))
                    ) : (
                        <p className="p-2 text-muted">No se encontraron ingredientes</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default IngredientSelector;
