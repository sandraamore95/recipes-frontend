export const Cooking = () => (
    <section className="my-5 position-relative overflow-hidden rounded-3" style={{background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'}}>
        <div className="row align-items-center">
            <div className="col-md-6 p-5">
                <h2>Reto de Cocina Semanal</h2>
                <p className="lead">¿Te atreves con nuestro desafío culinario de la semana?</p>
                <p>Cada semana seleccionamos un ingrediente especial y te retamos a crear algo increíble con él.</p>
                <div className="d-flex align-items-center mt-4">
                    <div className="me-4 text-center">
                        <div className="display-4">🥕</div>
                        <small>Ingrediente</small>
                    </div>
                    <div>
                        <h3 className="h4">Zanahorias multicolor</h3>
                        <button className="btn btn-outline-primary">Aceptar reto</button>
                    </div>
                </div>
            </div>
            <div className="col-md-6 d-none d-md-block">
                <img 
                    src="https://images.unsplash.com/photo-1447175008436-054170c2e979" 
                    className="img-fluid rounded-end" 
                    alt="Reto de cocina"
                    style={{height: '100%', objectFit: 'cover'}}
                />
            </div>
        </div>
    </section>
);