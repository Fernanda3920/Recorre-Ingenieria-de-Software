import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Importación de useNavigate y Link
import './styles/Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();  // Inicialización de useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Valida la entrada de los datos
    if (!username || !password) {
      setMessage('Por favor, completa todos los campos');
      return;
    }

    setIsLoading(true);
    setMessage('');  // Limpiar mensaje previo 

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Inicio de sesión exitoso');
        navigate('/Map');  // Redirige a la ruta /map
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setMessage('Error en la solicitud');
    } finally {
      setIsLoading(false);
    } 
  };

  return (
    <div className='container-login'>
    <div className="login-container"> 
    <h1 className="title-recorrer">Recorre</h1>
    <p>¡Tu mejor elección para recorrer el mundo!</p>
          <h1 className="login-header">Inicio de sesión</h1> 
      <form onSubmit={handleSubmit} className="login-form"> 
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="Usuario" 
          className="login-input" // Clase CSS para estilo
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Contraseña" 
          className="login-input" // Clase CSS para estilo
        />
        <button type="submit" disabled={isLoading} className="login-button"> 
          {isLoading ? 'Cargando...' : 'Iniciar sesión'}
        </button>
      </form>
      {message && <p className="login-message">{message}</p>} 
      
      <p> <br></br>
        ¿No tienes una cuenta? <Link to="/signup" className="signup-link">Regístrate aquí</Link>
      </p>
    </div>
    </div>
  );
}

export default Login;
