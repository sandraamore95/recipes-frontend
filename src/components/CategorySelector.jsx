import React, { useEffect, useState } from "react";
import * as categoryService from '../api/categoriesService';

const CategorySelector = ({ selectedCategories, onChange }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

 
    useEffect(() => {
        setLoading(true);
        categoryService.getAllCategories()
            .then((result) => {
                setCategories(result.data);
                setError(null);
            })
            .catch((error) => {
                setError(error.message || "No se pudieron cargar las categorías");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

      const handleSelectedCategory = (categoryName) => {
        let updated;
        if (selectedCategories.includes(categoryName)) {
            updated = selectedCategories.filter(
                (cat) => cat !== categoryName
            );
        } else {
            updated = [...selectedCategories, categoryName];
        }
        onChange(updated);
    };

    if (loading) {
        return (
            <div className="mb-3">
                <label className="form-label">Categorías</label>
                <p className="text-muted">Cargando categorías...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mb-3">
                <label className="form-label">Categorías</label>
                <p className="text-danger">Error: {error}</p>
            </div>
        );
    }

    if (!categories.length) {
        return (
            <div className="mb-3">
                <label className="form-label">Categorías</label>
                <p className="text-muted">No hay categorías disponibles en este momento.</p>
            </div>
        );
    }

    return (
        <div className="mb-3">
            <label className="form-label">Categorías</label>
            <div className="d-flex flex-wrap gap-2">
                {categories.map((category) => (
                    <div key={category.id} className="form-check me-3">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id={`cat-${category.id}`}
                            value={category.name}
                            checked={selectedCategories.includes(category.name)}
                            onChange={() => handleSelectedCategory(category.name)}
                        />
                        <label
                            className="form-check-label"
                            htmlFor={`cat-${category.id}`}
                        >
                            {category.name}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategorySelector;
