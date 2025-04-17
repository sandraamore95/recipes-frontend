import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRecipes } from '../context/RecipeContext';
import RecipeCard from './RecipeCard';
import { Spinner } from 'react-bootstrap';

const PopularRecipes = () => {
    const { recipes, loading, error } = useRecipes();

    // Ordenar recetas por popularidad y tomar las 4 primeras
    const popularRecipes = recipes
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 4);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
        ],
    };

    const imageStyles = {
        padding: '5px',
        borderTop: 'dotted rgb(146, 146, 146) 3px',
        borderBottom: 'dotted rgb(143, 182, 255) 3px',
    };

    if (loading) return <div className="d-flex justify-content-center"><Spinner animation="border" variant="primary" /></div>;
    if (error) return <div>Error: {error}</div>;


    if (popularRecipes.length === 0 && !loading && !error) {
        return (
            <section className="my-5">
                <h2 className="display-5 fw-bold mb-3">
                    Recetas <span className="text-primary">Destacadas</span>
                </h2>
                <p>No hay recetas destacadas disponibles.</p>
            </section>
        );
    }
    return (
        <section className="my-5">
            <h2 className="display-5 fw-bold mb-3">Recetas <span className="text-primary">Destacadas</span></h2>
            <Slider {...settings}>
                {popularRecipes.map((recipe) => (
                    <div key={recipe.id} className="recipe-slide">
                        <RecipeCard recipe={recipe} imageStyles={imageStyles} />
                    </div>
                ))}
            </Slider>
        </section>
    );
};

export default PopularRecipes;