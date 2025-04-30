import api from "./apiClient"; 

  
export const getAllCategories = async () => {
  try {
  const response = await api.get("/categories");
  return { success: true, data: response.data };
  } catch (error) {
    const errMsg = error.response?.data?.message || "Error al cargar las categorias";
    return { success: false, message: errMsg };
  }
  
};
