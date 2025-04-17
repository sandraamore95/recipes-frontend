import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Favorites from '../pages/Favorites';
import MyRecipes from '../pages/MyRecipes';
import { AuthProvider, useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import DetailRecipe from '../pages/DetailRecipe';
import { RecipesProvider } from '../context/RecipeContext';
import CreateRecipe from '../pages/CreateRecipe';
import { ToastContainer } from 'react-toastify';
import { IngredientsProvider } from '../context/IngredientContext';
import EditRecipe from '../pages/EditRecipe';
import RecipeCatalog from '../pages/RecipesCatalog';
import Blog from '../pages/Blog';
import { FavoriteProvider } from '../context/FavoriteContext';

//las rutas protegidas que solo pueden acceder los usuarios autenticados
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <AuthProvider>
                <RecipesProvider>
                <FavoriteProvider>
                    <IngredientsProvider>
                        <Layout />
                    </IngredientsProvider>
                    </FavoriteProvider>
                </RecipesProvider>
                <ToastContainer
                    position="top-left"
                    autoClose={2000}
                    hideProgressBar={false}
                    draggable
                />
            </AuthProvider>
        ),
        children: [
            { index: true, element: <Home /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            {
                path: 'favorites',
                element: (
                    <ProtectedRoute>
                        <Favorites />
                    </ProtectedRoute>
                )
            },
            {
                path: 'recipes',
                element: (
                    <RecipeCatalog />
                )
            },
            {
                path: 'blog',
                element: (
                    <Blog />
                )
            },
            {
                path: 'my-recipes',
                element: (
                    <ProtectedRoute>
                        <MyRecipes />
                    </ProtectedRoute>
                )
            },
            {
                path: 'add-recipe',
                element: (
                    <ProtectedRoute>
                        <CreateRecipe />
                    </ProtectedRoute>
                )
            },
            {
                path: 'recipes/:id',
                element: <DetailRecipe />
            },
            {
                path: 'edit-recipe/:id',
                element: <ProtectedRoute>
                        <EditRecipe />
                    </ProtectedRoute>
            },
        ]
    }
]);
