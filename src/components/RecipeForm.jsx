import React, { useState, useEffect } from "react";
import IngredientSelector from "./IngredientSelector";
import CategorySelector from "./CategorySelector";

const RecipeForm = ({ initialData = {}, onSubmit }) => {
    const [selectedIngredients, setSelectedIngredients] = useState(
        initialData.ingredients?.map(ing => ({
            id: ing.ingredientId,
            name: ing.name,
            unit: ing.unit_measure,
            quantity: ing.quantity,
            categories:ing.categories
        })) || []
    );

    const [formData, setFormData] = useState({
        title: initialData.title || "",
        description: initialData.description || "",
        preparation: initialData.preparation || "",
        categories: initialData.categories || []
    });

    const handleAddIngredient = (newIngredient) => {
        setSelectedIngredients((prev) => {
            const existing = prev.find(ing => ing.id === newIngredient.id);
            if (existing) {
                // Si ya existe, sumamos la cantidad
                return prev.map(ing =>
                    ing.id === newIngredient.id
                        ? { ...ing, quantity: parseFloat(ing.quantity) + parseFloat(newIngredient.quantity) }
                        : ing
                );
            } else {
                return [...prev, newIngredient];
            }
        });
        console.log();
    };

    // eliminamos de nuestra coleccion de ingredientes , el ingrediente seleccionado
    const handleRemoveIngredient = (ingredientId) => {
        setSelectedIngredients(prev =>
            prev.filter(ingredient => ingredient.id !== ingredientId)

        )
    };
    const handleIncrementQuantity = (ingredient) => {
        setSelectedIngredients(prev =>
            prev.map(item =>
                item.id === ingredient.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const handleDecrementQuantity = (ingredient) => {
        setSelectedIngredients(prev =>
            prev.map(item =>
                item.id === ingredient.id
                    ? { ...item, quantity: Math.max(1, item.quantity - 1) } // Asegura que no sea menor que 1
                    : item
            )
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newRecipe = {
            ...formData,
            ingredients: selectedIngredients.map(({ id, name, quantity }) => ({
                ingredientId: id,
                name: name,
                quantity
            }))
        };
        console.log("Final Recipe Object:", newRecipe);
        onSubmit(newRecipe);
    };

    useEffect(() => {
        console.log(initialData);
    }, []);

    return (
        <form onSubmit={handleSubmit} className="container mt-4">
            <div className="row">
                <div className="col-12 col-md-6">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Información General</h5>

                            {/* Imagen de la Receta */}
                            <div className="mb-3">
                                <img
                                    src={`https://imagenes.diariodenavarra.es/files/image_477_265/uploads/2021/06/09/60c1082d8e912.jpeg`}
                                    alt="Receta"
                                    className="img-fluid rounded shadow"
                                    style={{ maxHeight: '250px' }}
                                />
                            </div>


                            {/* Título */}
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="form-control"
                                    id="title"
                                    placeholder="Título"
                                    required
                                />
                                <label htmlFor="title">Título</label>
                            </div>

                            {/* Descripción */}
                            <div className="form-floating mb-3">
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="form-control"
                                    id="description"
                                    placeholder="Descripción"
                                    rows={3}
                                ></textarea>
                                <label htmlFor="description">Descripción</label>
                            </div>

                            {/* Categorías */}
                            <CategorySelector
                                selectedCategories={formData.categories}
                                onChange={(updatedCategories) =>
                                    setFormData({ ...formData, categories: updatedCategories })
                                }
                            />
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-6">
                    <div className="card mb-4">
                        <div className="card-body">
                            {/* Selector de Ingredientes */}
                            <IngredientSelector
                                onAddIngredient={handleAddIngredient}
                                selectedIngredients={selectedIngredients}
                            />

                            {/* Ingredientes seleccionados */}
                            <div className="mt-3">
                                <h5>Ingredientes Seleccionados:</h5>
                                {selectedIngredients.map((ingredient) => (
                                    <div
                                        key={ingredient.id}
                                        className="d-flex justify-content-between align-items-center p-2 bg-light rounded mb-2"
                                    >
                                        <div>
                                            {ingredient.name} - {ingredient.quantity}
                                            <span className="text-muted ms-2">({ingredient.unit})</span>
                                        </div>
                                        <div>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => handleDecrementQuantity(ingredient)}
                                            >
                                                -
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-success"
                                                onClick={() => handleIncrementQuantity(ingredient)}
                                            >
                                                +
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => handleRemoveIngredient(ingredient.id)}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Preparación</h5>
                            <div className="form-floating mb-3">
                                <textarea
                                    value={formData.preparation}
                                    onChange={(e) => setFormData({ ...formData, preparation: e.target.value })}
                                    className="form-control"
                                    id="preparation"
                                    placeholder="Preparación"
                                    rows={5}
                                    required
                                ></textarea>
                                <label htmlFor="preparation">Preparación</label>
                            </div>
                        </div>
                    </div>

                    {/* Botón de Enviar */}
                    <button type="submit" className="btn btn-primary">
                        {initialData.id ? 'Actualizar Receta' : 'Crear Receta'}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default RecipeForm;