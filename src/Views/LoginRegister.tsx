import React from 'react';
import { useState } from 'react';

// Estilos
import './LoginRegister.css'

// Componentes
import Message from '../components/LoginRegister/Message/Message';
import Form from '../components/LoginRegister/Form/Form';

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