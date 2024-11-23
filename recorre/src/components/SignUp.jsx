import React, { useState } from 'react';
//import './style/SignUp.css';  // Importación de la hoja de estilos
import './styles/SignUp.css';


function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Registro exitoso');
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      setMessage('Error en la solicitud');
    }
  };
  
  return (
    <div className='container-login'>
    <div className='SignUp-container'>
      <h1 className='SignUp-header'>Registro</h1>
      <form onSubmit={handleSubmit} className='SignUp-form'>
        <input type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        placeholder="Usuario"
        className='SignUp-input' />
        <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Contraseña" 
        className='SignUp-input'/>
        <button type="submit" className='SignUp-button'>Registrarse</button>
      </form>
      {message && <p className="SignUp-message">{message}</p>}
    </div>
    </div>
  );
}

export default SignUp;