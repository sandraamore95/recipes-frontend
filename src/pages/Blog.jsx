import React, { useState } from 'react';
import { FaRegClock, FaUtensils, FaLeaf, FaBreadSlice } from 'react-icons/fa';

const Blog = () => {
    const [expandedPost, setExpandedPost] = useState(null);

    const blogPosts = [
        {
            id: 1,
            title: 'Pasta Cremosa con Champiñones',
            imageUrl: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=250&q=80',
            excerpt: 'Aprende a preparar una deliciosa pasta cremosa con champiñones...',
            fullContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            tags: ['Italiana', 'Rápida'],
            time: '30 min',
            icon: <FaUtensils className="text-primary" />
        },
        {
            id: 2,
            title: 'Hornear el Pan Perfecto',
            imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=250&q=80',
            excerpt: 'Descubre los secretos para hornear el pan perfecto en casa...',
            fullContent: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
            tags: ['Casero', 'Tradicional'],
            time: '2 horas',
            icon: <FaBreadSlice className="text-warning" />
        },
        {
            id: 3,
            title: 'Postres para una Cena Especial',
            imageUrl: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=250&q=80',
            excerpt: 'Sorprende a tus invitados con estos postres irresistibles...',
            fullContent: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
            tags: ['Postres', 'Fáciles'],
            time: '45 min',
            icon: <FaUtensils className="text-danger" />
        },
        {
            id: 4,
            title: 'Secretos de la Cocina Asiática',
            imageUrl: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=250&q=80',
            excerpt: 'Explora los sabores únicos de la cocina asiática...',
            fullContent: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
            tags: ['Asiática', 'Exótica'],
            time: '1 hora',
            icon: <FaUtensils className="text-success" />
        },
        {
            id: 5,
            title: 'Desayunos Saludables',
            imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=250&q=80',
            excerpt: 'Empieza el día con energía con estos desayunos saludables...',
            fullContent: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
            tags: ['Saludable', 'Energético'],
            time: '15 min',
            icon: <FaLeaf className="text-success" />
        },
        {
            id: 6,
            title: 'Cocina Vegana',
            imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=250&q=80',
            excerpt: 'Descubre el mundo de la cocina vegana...',
            fullContent: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.',
            tags: ['Vegana', 'Sostenible'],
            time: '40 min',
            icon: <FaLeaf className="text-primary" />
        },
    ];

    const toggleExpand = (id) => {
        setExpandedPost(expandedPost === id ? null : id);
    };

    return (
        <section className="blog py-5 bg-light">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="display-4 fw-bold">Inspiración Culinaria</h2>
                    <p className="lead text-muted">Descubre recetas, técnicas y secretos de cocina</p>
                </div>
                
                <div className="row g-4">
                    {blogPosts.map(post => (
                        <div key={post.id} className="col-lg-4 col-md-6">
                            <div className={`card h-100 border-0 shadow-sm overflow-hidden transition-all ${expandedPost === post.id ? 'expanded' : ''}`}>
                                <div className="ratio ratio-16x9">
                                    <img 
                                        src={post.imageUrl} 
                                        className="card-img-top object-cover" 
                                        alt={post.title}
                                        loading="lazy"
                                    />
                                </div>
                                
                                <div className="card-body">
                                    <div className="d-flex align-items-center mb-2">
                                        {post.icon}
                                        <span className="ms-2 text-muted small d-flex align-items-center">
                                            <FaRegClock className="me-1" />
                                            {post.time}
                                        </span>
                                        <div className="ms-auto">
                                            {post.tags.map(tag => (
                                                <span key={tag} className="badge bg-light text-dark me-1">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <h3 className="h5 card-title">{post.title}</h3>
                                    
                                    <p className="card-text">
                                        {expandedPost === post.id ? post.fullContent : post.excerpt}
                                    </p>
                                    
                                    <button 
                                        onClick={() => toggleExpand(post.id)}
                                        className="btn btn-link p-0 text-decoration-none"
                                    >
                                        {expandedPost === post.id ? 'Mostrar menos' : 'Leer más'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="text-center mt-5">
                    <button className="btn btn-outline-primary px-4 py-2">
                        Cargar más artículos
                    </button>
                </div>
            </div>
            
            <style jsx>{`
                .card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    border-radius: 0.75rem;
                }
                .card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                }
                .card.expanded {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                }
                .ratio {
                    border-radius: 0.75rem 0.75rem 0 0;
                    overflow: hidden;
                }
            `}</style>
        </section>
    );
};

export default Blog;