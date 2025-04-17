import React from 'react';
import '../styles/HeroSection.css';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const navigate = useNavigate();
 const handleScrollToRecipes = () => {
    navigate(`/recipes`)
     
    };
    return (
        <section className="section-hero container-lg mt-2 pt-2">
            <div className="row align-items-center g-4 text-center">
                {/* Contenido de texto (izquierda) */}
                <div className="col-md-6">
                    <p className="hero-span">Sabor y Salud en Cada Bocado</p>
                    <h1 className="hero-title">Descubre Recetas Deliciosas y Nutritivas</h1>
                    <p className="hero-subtitle">
                        Explora nuestra amplia colección de recetas, desde platos clásicos hasta creaciones innovadoras,
                        perfectas para cada ocasión y estilo de vida.
                    </p>
                    <div className="hero-buttons d-grid  d-md-inline-flex">
                        <button onClick={handleScrollToRecipes} className="btn px-4 fw-semibold rounded text-white bg-dark">
                            Explorar Recetas
                        </button>

                    </div>
                </div>

                {/* Imagen (derecha) */}
                <div className="col-md-6 d-none d-md-block">
                    <img
                        src="https://velarte.com/wp-content/uploads/2021/10/Blog-1.jpg"
                        alt="Plato de comida apetitoso"
                        className="img-fluid rounded"
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
