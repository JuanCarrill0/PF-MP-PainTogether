import React, { useState } from 'react';

//Estilos
import './Form.css';

function Form(props:any) {
  //Declaración de las variables para el formulario
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setPassword] = useState('');

  //Metodo De inicio de sesióncuando se envie el formulario

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = 'http://127.0.0.1:5000/auth/login';
    const data = { nombre, contrasena };

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.access_token) {
        // Aquí puedes guardar el token en el almacenamiento local (local storage)
        localStorage.setItem('access_token', data.access_token);
        console.log('Inicio de sesión exitoso');
      } else {
        console.log('Credenciales inválidas');
      }
    })
    .catch(error => console.error('Error:', error));
  }

  //Metodo De registro cuando se envie el formulario
  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre,
          email,
          contrasena
        })
      });

      const data = await response.json();
      localStorage.setItem('access_token', data.access_token);
      // hacer algo más después de registrar al usuario
      console.log("Usuario Registrado")
    } catch (error) {
      console.error(error);
      // manejar errores de registro
    }
  }
  return (
    <div className="forms-containers" style={{left: props?.change?.formsLeft, top: props?.change?.formsTop}}>     
      {/* FORMULARIO DE REGISTRO */}
      <form className="register-form" onSubmit={handleRegisterSubmit} style={{display: props?.change?.registerDisplay}}>
        <h2>Registrate en PainTogether</h2>
        <input type="text" placeholder="Nombre de Usuario" onChange={(e) => setNombre(e.target.value)} required />
        <input type="email" placeholder="Correo electrónico" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} required />
        <button>Registrarse</button>
      </form>
      {/* FORMULARIO DE INICIO DE SSESIÓN */}
      <form className="login-form" onSubmit={handleSubmit} style={{display: props?.change?.loginDisplay}}>
        <h2>Inicia sesión en PainTogether</h2>
        <div>
          <i className="bx bxs-user" style={{color: '#7f5a83'}} />
          <input type="text" placeholder="Usuario" onChange={(e) => setNombre(e.target.value)} required />
        </div>
        <div>
          <i className="bx bxs-lock" style={{color: '#7f5a83'}} />
          <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button>Iniciar sesión</button>
      </form>           
    </div>
  );
}

export default Form;