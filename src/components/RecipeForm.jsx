import React, { useState, useEffect } from "react";
import IngredientSelector from "./IngredientSelector";
import CategorySelector from "./CategorySelector";
import "../styles/RecipeForm.css";

const RecipeForm = ({ initialData = {}, onSubmit }) => {
    const [selectedIngredients, setSelectedIngredients] = useState(
        initialData.ingredients?.map(ing => ({
            id: ing.ingredientId,
            name: ing.name,
            unit: ing.unit_measure,
            quantity: ing.quantity,
            imageUrl: ing.imageUrl
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
        <form onSubmit={handleSubmit} className="container mt-4 recipe-form">
            <div className="row g-4">
                {/* Columna Izquierda - Información General */}
                <div className="col-12 col-lg-8">
                    <div className="card">
                        <div className="card-body p-4">
                            <h4 className="card-title mb-4 text-primary fw-bold">Información General</h4>

                            {/* Imagen de la Receta */}
                            <div className="mb-4">
                                <label className="form-label fw-medium">Imagen de la Receta</label>
                                <div className="position-relative">
                                    <img
                                        src={`https://imagenes.diariodenavarra.es/files/image_477_265/uploads/2021/06/09/60c1082d8e912.jpeg`}
                                        alt="Receta"
                                        className="img-fluid rounded shadow-sm w-100 recipe-image"
                                    />
                                    <button 
                                        type="button" 
                                        className="btn btn-primary position-absolute bottom-0 end-0 m-3 btn-camera"
                                    >
                                        <i className="fas fa-camera"></i>
                                    </button>
                                </div>
                            </div>

                            {/* Título */}
                            <div className="form-floating mb-4">
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="form-control form-control-lg"
                                    id="title"
                                    placeholder="Título"
                                    required
                                />
                                <label htmlFor="title" className="text-muted">Título de la Receta</label>
                            </div>

                            {/* Descripción */}
                            <div className="mb-4">
                                <label htmlFor="description" className="form-label fw-medium">Descripción</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="form-control"
                                    id="description"
                                    placeholder="Describe tu receta..."
                                    rows={4}
                                    required
                                ></textarea>
                            </div>

                            {/* Categorías */}
                            <div className="mb-4">
                                <label className="form-label fw-medium">Categorías</label>
                                <CategorySelector
                                    selectedCategories={formData.categories}
                                    onChange={(updatedCategories) =>
                                        setFormData({ ...formData, categories: updatedCategories })
                                    }
                                />
                            </div>

                            {/* Preparación */}
                            <div className="mb-4">
                                <label htmlFor="preparation" className="form-label fw-medium">Preparación</label>
                                <textarea
                                    value={formData.preparation}
                                    onChange={(e) => setFormData({ ...formData, preparation: e.target.value })}
                                    className="form-control"
                                    id="preparation"
                                    placeholder="Describe los pasos de preparación..."
                                    rows={8}
                                    required
                                ></textarea>
                                <small className="text-muted">Separa cada paso con un salto de línea</small>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Columna Derecha - Ingredientes */}
                <div className="col-12 col-lg-4">
                    <div className="card sticky-sidebar">
                        <div className="card-body p-4">
                            <h4 className="card-title mb-4 text-primary fw-bold">Ingredientes</h4>
                            
                            {/* Selector de Ingredientes */}
                            <div className="mb-4">
                                <label className="form-label fw-medium">Añadir Ingredientes</label>
                                <IngredientSelector
                                    onAddIngredient={handleAddIngredient}
                                    selectedIngredients={selectedIngredients}
                                    onRemoveIngredient={handleRemoveIngredient}
                                    onIncrementQuantity={handleIncrementQuantity}
                                    onDecrementQuantity={handleDecrementQuantity}
                                />
                            </div>

                            {/* Botón de Enviar */}
                            <button 
                                type="submit" 
                                className="btn btn-primary btn-lg w-100 shadow-sm"
                            >
                                {initialData.id ? 'Actualizar Receta' : 'Crear Receta'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default RecipeForm;