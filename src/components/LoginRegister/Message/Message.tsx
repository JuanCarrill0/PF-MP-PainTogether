import React from 'react';

//Estilos
import './Message.css';

function Messages(props:any) {
  function register() {
    let styles = {
      formsLeft: "",
      formsTop: "",
      registerDisplay: "",
      loginDisplay: ""
    }

    if(window.innerWidth > 900) styles.formsLeft = "195px";
    else if (window.innerWidth > 390) styles.formsTop = "-100px";
    else styles.formsTop = "-48px";

    styles.registerDisplay = "block";
    styles.loginDisplay = "none";

    props.setChange(styles);
  }

  function login() {
    let styles = {
      formsLeft: "",
      formsTop: "",
      registerDisplay: "",
      loginDisplay: ""
    }

    if (window.innerWidth > 900) styles.formsLeft = "-195px";
    else if (window.innerWidth > 390) styles.formsTop = "-485px";
    else styles.formsTop = "-355px";

    styles.registerDisplay = "none";
    styles.loginDisplay = "block";

    props.setChange(styles);
  }

  return (
    <div className="messages-container">
      {/* INICIAR SESIÓN CON CUENTA EXISTENTE */}
      <div className="login-container">
        <h2>Bienvenido a PainTogether</h2>
        <p>Si ya posees una cueta, puedes iniciar sesión e ingresar a tu directorio de proyectos.</p>
        <button id="btn-login" onClick={login}>Iniciar sesión</button>
      </div>
      {/* CREAR NUEVA CUENTA */}
      <div className="register-container">
        <h2>Bienvenido a PainTogether</h2>
        <p>Si aún no tienes tu cuenta, puedes registrarte fácilmente para iniciar a pintar con tus amigos.</p>
        <button id="btn-register" onClick={register}>Crear cuenta</button>
      </div>
    </div>
  );
}

export default Messages;