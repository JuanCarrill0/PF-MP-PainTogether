import React from 'react';

//Estilos
import './Messages.css';

function Messages(props:any) {
  function register() {
    props.setChange({
      formsLeft: "-195px",
      registerDisplay: "block",
      loginDisplay: "none"
    });
  }

  function login() {
    props.setChange({
      formsLeft: "195px",
      registerDisplay: "none",
      loginDisplay: "block"
    });
  }

  return (
    <div className="messages-container">
      {/* CREAR NUEVA CUENTA */}
      <div className="register-container">
        <h2>Bienvenido a PainTogether</h2>
        <p>Si aún no tienes tu cuenta, puedes registrarte fácilmente para iniciar a pintar con tus amigos.</p>
        <button id="btn-register" onClick={register}>Crear cuenta</button>
      </div>
      {/* INICIAR SESIÓN CON CUENTA EXISTENTE */}
      <div className="login-container">
        <h2>Bienvenido a PainTogether</h2>
        <p>Si ya posees una cueta, puedes iniciar sesión e ingresar a tu directorio de proyectos.</p>
        <button id="btn-login" onClick={login}>Iniciar sesión</button>
      </div>
    </div>
  );
}

export default Messages;