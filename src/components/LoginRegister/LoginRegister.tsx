import React from 'react';
import { useState } from 'react';

// Estilos
import './LoginRegister.css'

// Componentes
import Messages from './Messages/Messages';
import Form from './Form/Form';

function LoginRegister() {
  const [change, setChange] = useState({});

  return (
    <>
    <div id="background"></div>
    <div className="general-container">
      <Messages setChange={setChange}/>
      <Form change={change}/>      
    </div>
    </>
  );
}

export default LoginRegister;