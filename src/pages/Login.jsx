import React, { useState, useContext } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => { console.log(credentials);
      console.log("estamos qui");
        e.preventDefault();
        setError("");

        try {
            await login(credentials.username, credentials.password);
            navigate("/"); // Redirige a la home después del login
        } catch (err) {
            setError("Usuario o contraseña incorrectos");
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "500px" }}>
            <h2 className="mb-4 text-center">Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label>Usuario</label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-4">
                    <label>Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary w-100">
                    Entrar
                </button>
            </form>
        </div>
    );
};

export default Login;
