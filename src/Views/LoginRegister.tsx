import React from 'react';
import { useState } from 'react';

// Estilos
import './LoginRegister.css'

// Componentes
import Message from '../Components/LoginRegister/Message/Message';
import Form from '../Components/LoginRegister/Form/Form';

function LoginRegister() {
  const [change, setChange] = useState({});

  return (
    <>
    <div id="background"></div>
    <div className="general-container">
      <Message setChange={setChange}/>
      <Form change={change}/>      
    </div>
    </>
  );
}

export default LoginRegister;