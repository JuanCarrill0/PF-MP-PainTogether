import React, { useState, useEffect } from 'react';

//Estilos
import './Color.css';

function Color(props:any) {
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [color, setColor] = useState<string>('black'); 
  const [colorWidth, setColorWidth] = useState<string>('2'); 
  const [displayColorsContainer, setDisplayColorContainer] = useState<string>('none');

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = props.canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!context) return;
    const { offsetX, offsetY } = event.nativeEvent;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);

    event.preventDefault();
  };

  const continueDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = props.canvasRef.current;
    const context = canvas?.getContext('2d');


    if (!context) return;

    if (props.isErasing) {
      // Borrar área de 3px alrededor del cursor
      if (canvas) {
        const { left, top } = canvas.getBoundingClientRect();
        const { clientX, clientY } = event;
        const x = clientX - left;
        const y = clientY - top;
        context.clearRect(x - 3, y - 3, 30, 30);
      }
    } else if (isDrawing) {
      // Dibujar trazo
      const { offsetX, offsetY } = event.nativeEvent;
      context.lineTo(offsetX, offsetY);
      context.strokeStyle = color;
      context.lineWidth = colorWidth;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.stroke();
    }

    event.preventDefault();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    props.addChange();
  };

  const addHoverClass = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!props.isErasing) {
      const canvas = props.canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext('2d');
      if (!context) return;
      const { left, top } = canvas.getBoundingClientRect();
      const { clientX, clientY } = event;
      const x = clientX - left;
      const y = clientY - top;

      context.beginPath();
      context.arc(x, y, 20, 0, 2 * Math.PI);
      context.fillStyle = 'white';
      context.fill();
    }
    event.preventDefault();
  };

  useEffect(() => {
    props.setFunctions({
      startDrawing: startDrawing,
      continueDrawing: continueDrawing,
      stopDrawing: stopDrawing,
      addHoverClass: addHoverClass
    });
  }, [isDrawing, props.isErasing]);

  return (
    <div className='paint'>
      <i className='bx bx-paint' onClick={() => setDisplayColorContainer('block')}></i>
      <p className="message-paint">Pintar</p>
      <div className="colors-container" style={{display: displayColorsContainer}} onMouseLeave={() => setDisplayColorContainer('none')}>
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
    </div>
  );
}

export default Color;