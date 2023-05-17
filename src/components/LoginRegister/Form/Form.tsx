import React, { useState } from 'react';
import Swal from 'sweetalert2'

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
    const url = 'http://192.168.0.24:5000/auth/login';
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
        Swal.fire({
          title: 'Inicio de sesión exitoso',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok',
          allowOutsideClick: false // Evita cerrar la ventana al hacer clic fuera de ella
        }).then((result) => {
          window.location.reload(); // recarga la página
        });
        
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Credenciales Invalidas!',
        })
      }
    })
    .catch(error => console.error('Error:', error));
  }

  //Metodo De registro cuando se envie el formulario
  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://192.168.0.24:5000/auth/register', {
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
      Swal.fire({
        title: 'Registro Completado',
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
        allowOutsideClick: false // Evita cerrar la ventana al hacer clic fuera de ella
      }).then((result) => {
        window.location.reload(); // recarga la página
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo Salió Mal, Revisa los campos!',
      })
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
          <i className="bx bxs-user"/>
          <input type="text" placeholder="Usuario" onChange={(e) => setNombre(e.target.value)} required />
        </div>
        <div>
          <i className="bx bxs-lock"/>
          <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button>Iniciar sesión</button>
      </form>         
    </div>
  );
}

export default Form;