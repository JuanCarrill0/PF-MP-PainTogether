import React, { useState } from 'react';

// Estilos
import './ToolBar.css';

// Componentes
import Color from '../Color/Color';
import Option from '../Option/Option';

function ToolBar(props:any) {
  const [isErasing, setIsErasing] = useState<boolean>(false);
  const [restore, setRestore] = useState<Array<10>>([]);
  const [index, setIndex] = useState(-1);

  const addChange = () => {
    const canvas = props.canvasRef.current;
    const context = canvas?.getContext('2d');
    let lastRestores = restore.slice(0, index+1);

    if (index + 1 > 10) {
      lastRestores = restore.slice(1, index+1); 
    } 
    else if (index + 1 >= restore.length) {
      lastRestores = restore; 
      setIndex(index + 1);
    }
    else {
      setIndex(index + 1);
    }

    setRestore([...lastRestores, context.getImageData(0, 0, canvas.width, canvas.height)]);
  }

  const clearCanvas = () => {
    const canvas = props.canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);

    addChange();
  };

  const erase = (event: React.ChangeEvent<HTMLInputElement>) => { 
    setIsErasing(!isErasing); 
    let tool = event.target;
    (tool.classList.contains('selected')) ? tool.classList.remove('selected') : tool.classList.add('selected');
  };

  const undoLast = () => {
    const canvas = props.canvasRef.current;
    const context = canvas?.getContext('2d');

    console.log(restore);
    console.log(index);

    if (index > 0) {
      setIndex(index - 1);
      context.putImageData(restore[index-1], 0, 0);
    }
  }

  const undoNext = () => {
    const canvas = props.canvasRef.current;
    const context = canvas?.getContext('2d');

    if (restore[index + 1]) {
      setIndex(index + 1);
      context.putImageData(restore[index+1], 0, 0);
    }
  }

  return (
    <div className='toolBar'>
      <img src="../img/logo.png" alt="Logo" />
      <h1>PainTogether</h1>
      <Color canvasRef={props.canvasRef} setFunctions={props.setFunctions} isErasing={isErasing} addChange={addChange} />
      <Option icon={<i className='bx bxs-low-vision'></i>} description={'Borrar Todo'} optionFunction={clearCanvas} />
      <Option icon={<i className='bx bxs-eraser'></i>} description={'Borrar'} optionFunction={erase} />
      <Option icon={<i className='bx bx-undo'></i>} description={'Deshacer'} optionFunction={undoLast} />
      <Option icon={<i className='bx bx-redo'></i>} description={'Rehacer'} optionFunction={undoNext} />
    </div>
  );
}

export default ToolBar;