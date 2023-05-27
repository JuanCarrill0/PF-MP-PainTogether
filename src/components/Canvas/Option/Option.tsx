import React, { useState } from 'react';

// Estilos
import './Option.css';

function Option(props:any) {
  const [panelDisplay, setPanelDisplay] = useState<string>('none');
  const optionFunction = props.optionFunction ? props.optionFunction : () => {setPanelDisplay('block')};
  const getPanel = () => {
    if (!props.panel) return <></>

    const properties = {...props?.panelProps, panelDisplay: panelDisplay, setPanelDisplay: setPanelDisplay}
    return <props.panel {...properties}/>
  };

  return (
    <div className="option">
      <span onClick={optionFunction}>{props.icon}</span>
      <p className="message-span">{props.description}</p>
      {getPanel()}
    </div>
  );
}

export default Option;