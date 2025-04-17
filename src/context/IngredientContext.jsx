import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const IngredientsContext = createContext();

export const IngredientsProvider = ({ children }) => {
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(false);
     const [error, setError] = useState(null);
    const [debouncedSearch, setDebouncedSearch] = useState('');

    const searchIngredients = async (search = '') => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/ingredients?name=${search}`);
            setIngredients(response.data);
        } catch (error) {
            setError("Error obteniendo los  ingredientes:", error)
            setIngredients([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        searchIngredients(debouncedSearch);
    }, [debouncedSearch]);

  
    const value = {
        ingredients,
        searchIngredients,
        loading,error
    };

    return (
        <IngredientsContext.Provider value={value}>
            {children}
        </IngredientsContext.Provider>
    );
};

export const useIngredients = () => {
    return useContext(IngredientsContext);
};
