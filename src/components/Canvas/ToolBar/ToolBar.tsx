import React, { useState } from 'react';

// Estilos
import './ToolBar.css';

// Componentes
import Color from '../Color/Color';
import Option from '../Option/Option';
import Account from '../Account/Account';

function ToolBar({canvasRef, setFunctions}:any) {
  const [isErasing, setIsErasing] = useState<boolean>(false);
  const [restore, setRestore] = useState<Array<10>>([]);
  const [index, setIndex] = useState(-1);

  const addChange = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    
    if (event.type !== 'mouseout') {
      let lastRestores = restore.slice(0, index+1);
  
      if (index + 1 > 10) lastRestores = restore.slice(1, index+1);
      else setIndex(index + 1);

      setRestore([...lastRestores, context.getImageData(0, 0, canvas.width, canvas.height)]);
    }
  }

  const clearCanvas = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    addChange(event);
  };

  const erase = (event: React.ChangeEvent<HTMLInputElement>) => { 
    setIsErasing(!isErasing); 
    let tool = event.target;
    (tool.classList.contains('selected')) ? tool.classList.remove('selected') : tool.classList.add('selected');
  };

  const undoLast = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if(index > 0) { 
      setIndex(index - 1);
      context.putImageData(restore[index-1], 0, 0);
    }
  }

  const undoNext = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    
    if (restore[index+1]) {
      context.putImageData(restore[index+1], 0, 0);
      setIndex(index+1);
    }
  }

  return (
    <div className='toolBar'>
      <img src="../img/logo.png" alt="Logo" />
      <h1>PainTogether</h1>
      <Option icon={<i className='bx bx-paint'></i>} description={'Pintar'} panel={Color} 
      panelProps={{canvasRef: canvasRef, setFunctions: setFunctions, isErasing: isErasing, addChange: addChange}} />
      <Option icon={<i className='bx bxs-low-vision'></i>} description={'Borrar Todo'} optionFunction={clearCanvas} />
      <Option icon={<i className='bx bxs-eraser'></i>} description={'Borrar'} optionFunction={erase} />
      <Option icon={<i className='bx bx-undo'></i>} description={'Deshacer'} optionFunction={undoLast} />
      <Option icon={<i className='bx bx-redo'></i>} description={'Rehacer'} optionFunction={undoNext} />
      <div className='account-option'><Option icon={<i className='bx bxs-user-circle'></i>} description={'Cuenta'} panel={Account} /></div>
    </div>
  );
}

export default ToolBar;