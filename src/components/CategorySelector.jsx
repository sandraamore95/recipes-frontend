import React, { useEffect, useState } from "react";
import * as categoryService from '../api/categoriesService';

const CategorySelector = ({ selectedCategories, onChange }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        categoryService.getAllCategories()
            .then((data) => setCategories(data))
            .catch((error) =>
                console.error("Error al obtener categorías:", error)
            );
    }, []);

    const handleSelectedCategory = (categoryName) => {
        let updated;
        if (selectedCategories.includes(categoryName)) {
            updated = selectedCategories.filter((cat) => cat !== categoryName);
        } else {
            updated = [...selectedCategories, categoryName];
        }
        onChange(updated);
    };

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
