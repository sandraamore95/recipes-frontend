import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faUtensils,
  faBook,
  faShieldAlt,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import { 
  faFacebookF, 
  faInstagram, 
  faPinterestP 
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 ">
      <div className="container">
        <div className="row g-4">
          
          {/* Columna 1: Branding + Redes Sociales */}
          <div className="col-md-4">
            <div className="d-flex flex-column h-100">
              <h2 className="h4 mb-3 d-flex align-items-center">
                <FontAwesomeIcon icon={faUtensils} className="me-2 text-primary" />
                <span className="text-primary">Recetas</span>Deliciosas
              </h2>
              <p className="text-muted mb-4">
                Descubre, cocina y comparte las mejores recetas caseras
              </p>
              
              <div className="social-icons mb-4">
                <a href="#" className="text-white me-3" aria-label="Facebook">
                  <FontAwesomeIcon icon={faFacebookF} size="lg" />
                </a>
                <a href="#" className="text-white me-3" aria-label="Instagram">
                  <FontAwesomeIcon icon={faInstagram} size="lg" />
                </a>
                <a href="#" className="text-white" aria-label="Pinterest">
                  <FontAwesomeIcon icon={faPinterestP} size="lg" />
                </a>
              </div>
              
              <div className="mt-auto">
                <a 
                  href="mailto:info@recetasdeliciosas.com" 
                  className="btn btn-outline-light btn-sm"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                  Contacto
                </a>
              </div>
            </div>
          </div>

          {/* Columna 2: Navegación */}
          <div className="col-md-4">
            <h3 className="h5 mb-3 text-primary">Explorar</h3>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link to="/recipes" className="nav-link p-0 text-white">
                  <FontAwesomeIcon icon={faUtensils} className="me-2" />
                  Todas las recetas
                </Link>
              </li>
          
              <li className="nav-item mb-2">
                <Link to="/rapidas" className="nav-link p-0 text-white">
                  <FontAwesomeIcon icon={faUtensils} className="me-2" />
                  Recetas Populares
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/blog" className="nav-link p-0 text-white">
                  <FontAwesomeIcon icon={faBook} className="me-2" />
                  Blog culinario
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Legal + Info */}
          <div className="col-md-4">
            <h3 className="h5 mb-3 text-primary">Información</h3>
            <ul className="nav flex-column">
            
              <li className="nav-item mb-2">
                <Link to="/politica-privacidad" className="nav-link p-0 text-white">
                  <FontAwesomeIcon icon={faShieldAlt} className="me-2" />
                  Política de privacidad
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/terminos" className="nav-link p-0 text-white">
                  <FontAwesomeIcon icon={faShieldAlt} className="me-2" />
                  Términos de uso
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/faq" className="nav-link p-0 text-white">
                  <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
                  Preguntas frecuentes
                </Link>
              </li>
            
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="row mt-4">
          <div className="col-12 text-center text-muted">
            <p className="mb-0 small">
              &copy; {new Date().getFullYear()} RecetasDeliciosas.com - Todos los derechos reservados
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;