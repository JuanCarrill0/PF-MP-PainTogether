import React, { useState, useEffect } from 'react';

//Estilos
import './Color.css';

function Color(props:any) {
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [color, setColor] = useState<string>('black'); 
  const [colorWidth, setColorWidth] = useState<string>('2'); 

  const start = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = props.canvasRef.current;
    const context = canvas?.getContext('2d');

    setIsDrawing(true);
    context.beginPath();
    context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    
    event.preventDefault();
  }

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = props.canvasRef.current;
    const context = canvas?.getContext('2d');

    if(isDrawing) {
      context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
      props.isErasing ? context.strokeStyle = 'white' : context.strokeStyle = color;
      context.lineWidth = colorWidth;
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.stroke();
    }

    event.preventDefault();
  }

  const stop = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = props.canvasRef.current;
    const context = canvas?.getContext('2d');

    if (isDrawing) {
      context.stroke();
      setIsDrawing(false);
      props.addChange(event);
    }

    event.preventDefault();
  }

  useEffect(() => {
    props.setFunctions({
      start: start,
      draw: draw,
      stop: stop
    });
  }, [isDrawing, props.isErasing]);

  return (
    <div className="colors-container" style={{display: props.panelDisplay}} onMouseLeave={() => props.setPanelDisplay('none')}>
      <div className="colors">
        <div style={{backgroundColor: 'black'}} onClick={() => setColor('black')}></div>
        <div style={{backgroundColor: 'white'}} onClick={() => setColor('white')}></div>
        <div style={{backgroundColor: 'red'}} onClick={() => setColor('red')}></div>
        <div style={{backgroundColor: 'blue'}} onClick={() => setColor('blue')}></div>
        <div style={{backgroundColor: 'yellow'}} onClick={() => setColor('yellow')}></div>
        <div style={{backgroundColor: 'green'}} onClick={() => setColor('green')}></div>
        <div style={{backgroundColor: 'orange'}} onClick={() => setColor('orange')}></div>
        <div style={{backgroundColor: 'purple'}} onClick={() => setColor('purple')}></div>
        
        <input type="range" min={1} max={100} value={colorWidth} className='pen-range' onInput={(event: React.ChangeEvent<HTMLInputElement>) => setColorWidth(event.target.value)} />
      </div>
      <div className="color-picker">
        <input type="color" onInput={(event: React.ChangeEvent<HTMLInputElement>) => setColor(event.target.value)} /> 
      </div>
    </div>
  );
}

export default Color;