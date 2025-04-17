import React from 'react';

const ChefPicks = () => {
  return (
    <section className="container py-5 my-lg-5">
    <div className="text-center mb-5">
        <h2 className="display-5 fw-bold mb-3">Recomendaciones <span className="text-primary">del Chef</span></h2>
        <p className="lead text-muted mx-auto" style={{maxWidth: "600px"}}>
            Herramientas esenciales seleccionadas por chefs profesionales para elevar tu experiencia culinaria
        </p>
    </div>

    <div className="row g-4">
        {/* Tarjeta 1 */}
        <div className="col-md-4">
            <div className="card h-100 border-0 shadow-lg hover-shadow transition-all">
                <div className="card-img-top bg-gradient-primary" style={{height: "200px", background: "url('https://cuchilleriamoreno.com/wp-content/uploads/2021/10/wp-16348337947864853915649676353225.jpg') center/cover"}}>
                    <span className="badge bg-white text-dark position-absolute top-0 end-0 m-3">TOP VENTAS</span>
                </div>
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <h3 className="h5 mb-0">Cuchillo de Chef Shun Premier</h3>
                        <span className="text-warning">
                            <i className="fas fa-star"></i> 4.9
                        </span>
                    </div>
                    <p className="text-muted mb-4">Hoja de acero VG-MAX de 20cm con mango de pakkawood. Perfecto balance y filo duradero.</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <span className="h5 text-primary mb-0">$189.99</span>
                        <button className="btn btn-sm btn-outline-primary">
                            Ver detalles <i className="fas fa-arrow-right ms-2"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* Tarjeta 2 */}
        <div className="col-md-4">
            <div className="card h-100 border-0 shadow-lg hover-shadow transition-all">
                <div className="card-img-top" style={{height: "200px", background: "url('https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FzdCUyMGlyb24lMjBwYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60') center/cover"}}>
                    <span className="badge bg-danger position-absolute top-0 end-0 m-3">-15%</span>
                </div>
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <h3 className="h5 mb-0">Sartén Lodge Hierro Fundido</h3>
                        <span className="text-warning">
                            <i className="fas fa-star"></i> 4.7
                        </span>
                    </div>
                    <p className="text-muted mb-4">25cm pre-sazonada. Distribución uniforme de calor, ideal para horno y estufa.</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <span className="text-decoration-line-through text-muted me-2">$59.99</span>
                            <span className="h5 text-primary mb-0">$50.99</span>
                        </div>
                        <button className="btn btn-sm btn-outline-primary">
                            Añadir al carrito <i className="fas fa-shopping-cart ms-2"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* Tarjeta 3 */}
        <div className="col-md-4">
            <div className="card h-100 border-0 shadow-lg hover-shadow transition-all">
                <div className="card-img-top" style={{height: "200px", background: "url('https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3V0dGluZyUyMGJvYXJkfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60') center/cover"}}></div>
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <h3 className="h5 mb-0">Tabla de Cortar Boos Block</h3>
                        <span className="text-warning">
                            <i className="fas fa-star"></i> 4.8
                        </span>
                    </div>
                    <p className="text-muted mb-4">Madera de arce de 45x30cm con pie antideslizante. Superficie gentil con los cuchillos.</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <span className="h5 text-primary mb-0">$89.99</span>
                        <button className="btn btn-sm btn-primary">
                            Comprar ahora <i className="fas fa-bolt ms-2"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div className="text-center mt-5">
        <button className="btn btn-lg btn-outline-primary px-4">
            Ver todas las recomendaciones <i className="fas fa-chevron-right ms-2"></i>
        </button>
    </div>
</section>
  );
};

export default ChefPicks;
