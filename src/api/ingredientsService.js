import axios from 'axios';
const API_BASE_URL = 'http://localhost:8080/api';

export const  searchIngredients = async (search = '') => {
        try {
            const response = await axios.get(`${API_BASE_URL}/ingredients?name=${search}`);
            return response.data;
        } catch (error) {
            console.error("Error obteniendo los ingredientes:", error);
            throw error;
        }
    }
