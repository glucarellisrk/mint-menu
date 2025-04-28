import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import React from "react";

interface LoginProps {
  setIsAuthenticated: (auth: boolean) => void;
}

const Login = ({ setIsAuthenticated }: LoginProps) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Simulamos un pequeño delay antes de la navegación
    setTimeout(() => {
      if (username === "admin" && password === "password") {
        setIsAuthenticated(true);
        navigate("/admin");
      } else {
        alert("Usuario o contraseña incorrectos");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Acceso Admin</h2>

        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          disabled={loading}
        />

        <button
          type="submit"
          className="login-button"
          disabled={loading}
        >
          {loading
            ? <>
                <span className="spinner"></span>
                <span className="button-text">Ingresando...</span>
              </>
            : "Ingresar"}
        </button>
      </form>
    </div>
  );
};

export default Login;