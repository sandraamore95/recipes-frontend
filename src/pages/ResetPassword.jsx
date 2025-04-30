import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { resetPassword } = useAuth(); 
    
    const location = useLocation();
    const navigate = useNavigate();
    
    // Obtener el token desde la query string
    const token = new URLSearchParams(location.search).get('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        // Validaciones antes de intentar cambiar la contraseña
        if (password !== confirmPassword) {
          toast.error("Las contraseñas no coinciden");
          return;
        }
      
        if (password.length < 6) {
          toast.error("La contraseña debe tener al menos 6 caracteres");
          return;
        }
      
        setLoading(true);
        try {
          console.log(token); 
          await resetPassword(token, password);
          toast.success("Contraseña cambiada correctamente");
          navigate('/login'); 
        } catch (err) {
          toast.error(err.errMsg);
        } finally {
          setLoading(false);
        }
      };



    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Restablecer Contraseña</h2>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Nueva Contraseña
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        minLength="6"
                                        required
                                        disabled={loading}
                                    />
                                    <div className="form-text">
                                        Mínimo 6 caracteres, incluir números y símbolos
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">
                                        Confirmar Contraseña
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        minLength="8"
                                        required
                                        disabled={loading}
                                    />
                                </div>

                                <div className="d-grid gap-2">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                Procesando...
                                            </>
                                        ) : 'Cambiar Contraseña'}
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-link"
                                        onClick={() => navigate('/login')}
                                    >
                                        Volver al inicio de sesión
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
