const API_URL = 'http://localhost:8080/api';
import axios from 'axios';

export const  getAllCategories= async () => {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    return response.data;
  }

  const API_BASE_URL = 'http://localhost:8080/api';

