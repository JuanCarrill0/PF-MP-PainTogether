import React from 'react';

//Estilos
import './Form.css';

function Form(props:any) {
  return (
    <div className="forms-containers" style={{left: props?.change?.formsLeft, top: props?.change?.formsTop}}>     
      {/* FORMULARIO DE REGISTRO */}
      <form className="register-form" style={{display: props?.change?.registerDisplay}}>
        <h2>Registrate en PainTogether</h2>
        <input type="text" placeholder="Nombre completo" required />
        <input type="email" placeholder="Correo electrónico" required />
        <input type="text" placeholder="Nombre de usuario" required />
        <input type="password" placeholder="Contraseña" required />
        <button>Registrarse</button>
      </form>
      {/* FORMULARIO DE INISIO DE SSESIÓN */}
      <form className="login-form" style={{display: props?.change?.loginDisplay}}>
        <h2>Inicia sesión en PainTogether</h2>
        <div>
          <i className="bx bxs-user" style={{color: '#7f5a83'}} />
          <input type="text" placeholder="Usuario" required />
        </div>
        <div>
          <i className="bx bxs-lock" style={{color: '#7f5a83'}} />
          <input type="password" placeholder="Contraseña" required />
        </div>
        <button>Iniciar sesión</button>
      </form>           
    </div>
  );
}

export default Form;