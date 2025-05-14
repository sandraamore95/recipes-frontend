import React, { useState, useEffect, useRef } from "react";
import IngredientSelector from "./IngredientSelector";
import CategorySelector from "./CategorySelector";
import "../styles/RecipeForm.css";
import { useRecipeImage } from "../hooks/useRecipeImage";

const RecipeForm = ({ initialData = {}, onSubmit }) => {

    const { src, handleError } = useRecipeImage(initialData?.imageUrl ?? null);
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(src);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef();

    // Obtenemos los ingredientes iniciales de la receta
    const [selectedIngredients, setSelectedIngredients] = useState(
        initialData.ingredients?.map(ing => ({
            id: ing.ingredientId,
            name: ing.name,
            unit: ing.unit_measure,
            quantity: ing.quantity,
            imageUrl: ing.imageUrl
        })) || []
    );

    // Inicializamos el estado del formulario con los datos iniciales
    const [formData, setFormData] = useState({
        title: initialData.title || "",
        description: initialData.description || "",
        preparation: initialData.preparation || "",
        imageUrl: initialData.imageUrl | "",
        categories: initialData.categories || []
    });



    const handleImageChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setImageFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const clickImage = () => {
        fileInputRef.current.click(); // simula el click en el input oculto
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const newRecipe = {
            ...formData,
            ingredients: selectedIngredients.map(({ id, name, quantity }) => ({
                ingredientId: id,
                name,
                quantity
            }))
        };

        onSubmit(newRecipe, imageFile);
    };



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

    useEffect(() => {
        console.log(initialData);
    }, []);

    return (
        <form onSubmit={handleSubmit} className="container-fluid px-0">
            {/* Sección de Imagen */}
            <div className="container mt-4">
                <div className="row">
                    <div className="col-12">
                        <div className="position-relative rounded-4 overflow-hidden" style={{ height: '400px' }}>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                            />

                            <img
                                src={previewUrl}
                                alt={formData.title}
                                className="w-100 h-100 object-fit-cover"
                                onError={handleError}
                            />

                            {/* Titulo en la imagen por defecto */}
                            {!initialData.imageUrl && (
                                <div
                                    className="position-absolute top-0 start-0 w-100 text-center text-white fw-bold"
                                    style={{
                                        background: "rgba(0, 0, 0, 0.5)",
                                        padding: "0.5rem",
                                        fontSize: "1.5rem"
                                    }}
                                >
                                    {formData.title}
                                </div>
                            )}

                            
                            <div className="position-absolute bottom-0 end-0 m-4">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={clickImage}
                                >
                                    Cambiar Imagen
                                </button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-4">
                <div className="row g-4">
                    {/* Columna Principal */}
                    <div className="col-lg-8">
                        {/* Título */}
                        <div className="mb-4">
                            <label htmlFor="title" className="form-label fw-medium text-primary">Título de la Receta</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="form-control form-control-lg border-0 border-bottom"
                                id="title"
                                placeholder="Escribe el título de tu receta..."
                                required
                                style={{ fontSize: '1.5rem', padding: '1rem 0.75rem' }}
                            />
                        </div>

                        {/* Descripción */}
                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-body p-4">
                                <h2 className="h4 mb-3 text-primary">Descripción</h2>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="form-control border-0"
                                    id="description"
                                    placeholder="Describe tu receta..."
                                    rows={4}
                                    required
                                ></textarea>
                            </div>
                        </div>

                        {/* Categorías */}
                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-body p-4">
                                <h2 className="h4 mb-3 text-primary">Categorías</h2>
                                <CategorySelector
                                    selectedCategories={formData.categories}
                                    onChange={(updatedCategories) =>
                                        setFormData({ ...formData, categories: updatedCategories })
                                    }
                                />
                            </div>
                        </div>

                        {/* Preparación */}
                        <div className="card border-0 shadow-sm">
                            <div className="card-body p-4">
                                <h2 className="h4 mb-3 text-primary">Preparación</h2>
                                <textarea
                                    value={formData.preparation}
                                    onChange={(e) => setFormData({ ...formData, preparation: e.target.value })}
                                    className="form-control border-0"
                                    id="preparation"
                                    placeholder="Describe los pasos de preparación..."
                                    rows={8}
                                    required
                                ></textarea>
                                <small className="text-muted">Separa cada paso con un salto de línea</small>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Ingredientes */}
                    <div className="col-lg-4">
                        <div className="card border-0 shadow-sm sticky-top" style={{ top: '2rem' }}>
                            <div className="card-body p-4">
                                <h2 className="h4 mb-4 text-primary">Ingredientes</h2>

                                {/* Selector de Ingredientes */}
                                <div className="mb-4">
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
                                    className="btn btn-primary btn-lg w-100 mt-4"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                            Procesando...
                                        </>
                                    ) : (
                                        initialData.id ? 'Actualizar Receta' : 'Crear Receta'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default RecipeForm;