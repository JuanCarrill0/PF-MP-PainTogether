import React from 'react';

// Estilos
import './Option.css';

function Option(props:any) {
  return (
    <div className="option">
      <span onClick={props.optionFunction}>{props.icon}</span>
      <p className="message-span">{props.description}</p>
    </div>
  );
}

export default Option;