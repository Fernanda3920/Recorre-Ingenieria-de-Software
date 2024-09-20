import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3002/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Inicio de sesión exitoso');
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setMessage('Error en la solicitud');
    }
  };
  
  return (
    <div>
      <h2>Inicio de sesión</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuario" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
        <button type="submit">Iniciar sesión</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
