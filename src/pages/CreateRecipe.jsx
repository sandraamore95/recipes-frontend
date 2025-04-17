import RecipeForm from '../components/RecipeForm';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';

// crear receta vista : formulario (create/edit)
// llama al componente de RecipeForm y le pasa el metodo (submit) ademas de indicarle el prop de isediting=false
// se necesita el token para el backend 

function CreateRecipe() {
    const { user , token } = useAuth();
    const navigate = useNavigate();
    const { addRecipe, loading , error } = useRecipes();

    const handleAdd = async (newRecipe) => {
        console.log("Añadiendo receta de prueba...");
        try {
            const createdRecipe = await addRecipe(newRecipe, token);
            console.log('Receta creada con éxito:', createdRecipe);
            toast.success("¡Receta creada con éxito!",{
            })
            navigate("/"); 
            
        } catch (err) {
            const errorMessage = err.response?.data?.message 
                              || err.message 
                              || 'Error desconocido al crear receta';
            toast.error(errorMessage, {
            });
        }
    };

    
    return (
        <div className="container mt-4">
            <h2>Crear Nueva Receta 🥘</h2>
            {loading ? (
                <div className="d-flex justify-content-center mt-3">
                    <Spinner animation="border" variant="primary" /> 
                    <p className="ms-2">Cargando...</p>
                </div>
            ) : error ? (
                <p className="text-danger">Error: {error}</p>  
            ) : (
                <RecipeForm onSubmit={handleAdd} isEditing={false} />
            )}
        </div>
    );
}
export default CreateRecipe;