import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import * as categoryService from '../api/categoriesService';

const RecipeSearchAndList = ({ recipes, viewType }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('TODAS');
    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 8;
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const data = await categoryService.getAllCategories();
                setCategories(['TODAS', ...data]);
            } catch (err) {
                setError(err.message || "Error obteniendo las categorias");
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        let filtered = recipes;

        if (selectedCategory !== 'TODAS') {
            filtered = filtered.filter(recipe =>
                recipe.categories.includes(selectedCategory)
            );
        }

        if (searchTerm) {
            filtered = filtered.filter(recipe =>
                recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredRecipes(filtered);
    }, [searchTerm, selectedCategory, recipes]);

    const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);
    const visibleRecipes = filteredRecipes.slice(
        (currentPage - 1) * recipesPerPage,
        currentPage * recipesPerPage
    );

    const getTitle = () => {
        switch (viewType) {
            case 'my-recipes':
                return 'Mis Recetas';
            case 'fav-recipes':
                return 'Mis Favoritas';
            default:
                return 'Todas las Recetas';
        }
    };

    return (
        <section className="my-5 container mt-5 pt-5">
            <h2 className="display-5 fw-bold mb-3">
                <span className="text-primary">{getTitle()}</span>
            </h2>

            {/* Filtro por categoría */}
            <select
                className="form-select my-3"
                value={selectedCategory}
                onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(1);
                }}
            >
                {categories.map(category => (
                    <option
                        key={typeof category === 'string' ? category : category.id}
                        value={typeof category === 'string' ? category : category.name}
                    >
                        {typeof category === 'string' ? category : category.name}
                    </option>
                ))}
            </select>

            {/* Buscador */}
            <input
                type="text"
                className="form-control my-3"
                placeholder="Buscar recetas..."
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                }}
            />

            {/* Listado de recetas */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                {visibleRecipes.length === 0 ? (
                    <p>No se encontraron recetas.</p>
                ) : (
                    visibleRecipes.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            viewType={viewType}
                        />
                    ))
                )}
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                    <button
                        className="btn btn-outline-primary mx-2"
                        onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        &laquo; Anterior
                    </button>
                    <span className="mx-2 align-self-center">
                        Página {currentPage} de {totalPages}
                    </span>
                    <button
                        className="btn btn-outline-primary mx-2"
                        onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Siguiente &raquo;
                    </button>
                </div>
            )}
        </section>
    );
};

export default RecipeSearchAndList;