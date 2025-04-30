// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { FaUser, FaHeart, FaUtensils, FaSignOutAlt } from 'react-icons/fa';
import { GiCookingPot } from 'react-icons/gi';
import '../styles/Navbar.css';

const Navbar = () => {
    const { user, logout, isAuthenticated, loading, error } = useAuth();
    const [scrolled, setScrolled] = useState(false);
    const [expanded, setExpanded] = useState(false);
    useEffect(() => {
        console.log(user);

    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeNavbar = () => {
        setExpanded(false);
    };

    return (
        <nav
            className={`navbar navbar-expand-lg navbar-dark fixed-top ${
                scrolled ? 'bg-dark shadow-sm' : 'bg-dark'
            } transition-all`}
        >
            <div className="container">
                {/* Logo */}
                <Link
                    className="navbar-brand fw-bold d-flex align-items-center"
                    to="/"
                    onClick={closeNavbar}
                >
                    <GiCookingPot className="me-2" size={24} />
                    StayHealthy
                </Link>

                {/* Movil */}
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => setExpanded(!expanded)}
                    aria-expanded={expanded}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Contenido del Navbar */}
                <div className={`collapse navbar-collapse ${expanded ? 'show' : ''}`}>
                    {/* Menú principal alineado a la izquierda */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/" onClick={closeNavbar}>
                                Inicio
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/recipes" onClick={closeNavbar}>
                                Todas las Recetas
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/blog" onClick={closeNavbar}>
                                Blog
                            </Link>
                        </li>
                    </ul>

                    {/* Menú usuario alineado a la derecha */}
                    <ul className="navbar-nav">
                        {loading ? (
                            <li className="nav-item">
                                 <Spinner animation="border" variant="light" size="sm" />
                            </li>
                        )
                         : !isAuthenticated ? (
                            <>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link d-flex align-items-center"
                                        to="/login"
                                        onClick={closeNavbar}
                                    >
                                        <FaUser className="me-1" /> Iniciar sesión
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="btn btn-primary ms-2"
                                        to="/register"
                                        onClick={closeNavbar}
                                    >
                                        Registrarse
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle d-flex align-items-center"
                                        href="#"
                                        id="userDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <span className="me-1">Hola, {user?.username}!</span>
                                    </a>
                                    <ul
                                        className="dropdown-menu dropdown-menu-end"
                                        aria-labelledby="userDropdown"
                                    >
                                        <li>
                                            <Link
                                                className="dropdown-item d-flex align-items-center"
                                                to="/favorites"
                                                onClick={closeNavbar}
                                            >
                                                <FaHeart className="me-2" /> Favoritos
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className="dropdown-item d-flex align-items-center"
                                                to="/my-recipes"
                                                onClick={closeNavbar}
                                            >
                                                <FaUtensils className="me-2" /> Mis Recetas
                                            </Link>
                                        </li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <button
                                                className="dropdown-item d-flex align-items-center"
                                                onClick={() => {
                                                    logout();
                                                    closeNavbar();
                                                }}
                                            >
                                                <FaSignOutAlt className="me-2" /> Cerrar sesión
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
