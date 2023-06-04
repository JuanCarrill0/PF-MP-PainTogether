import React, { useState, useEffect, RefObject } from 'react';

//Estilos
import './Color.css';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

interface ColorProps {
  setPanelDisplay(arg0: string): void;
  panelDisplay: undefined;
  canvasRef: RefObject<HTMLCanvasElement>;
  setFunctions: (functions: any) => void;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  isErasing: boolean;
  addChange: (event: React.MouseEvent<HTMLCanvasElement>) => void;
}

function Color(props:ColorProps) {
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [color, setColor] = useState<string>('black'); 
  const [colorWidth, setColorWidth] = useState<string>('2'); 

  const start = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = props.canvasRef.current;
    const context = canvas?.getContext('2d');

    setIsDrawing(true);
    if(context && canvas){
      context.beginPath();
      context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    }
    // Acceder al objeto socket dentro de la referencia
    const socket = props.socket;

    // Enviar el evento de dibujo al servidor
    if(socket){
      const data = {
        sid: socket.id,
        lineWidth: context?.lineWidth,
        x: event.clientX - canvas!.offsetLeft,
        y: event.clientY - canvas!.offsetTop,
        color: color,
        draw_type: 'start',
        isErasing : props.isErasing,
        isDrawing: isDrawing
      };
      socket.emit('draw_event', data);
    }

    event.preventDefault();
    event.stopPropagation();
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDrawing) {
      const canvas = props.canvasRef.current;
      const context = canvas?.getContext('2d');
      if(context && canvas){
        context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
        props.isErasing ? context.strokeStyle = 'white' : context.strokeStyle = color;
        context.lineWidth = parseInt(colorWidth);
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.stroke();
      }

      // Acceder al objeto socket dentro de la referencia
      const socket = props.socket;

      // Enviar el evento de dibujo al servidor
      if(socket){
        const data = {
          sid: socket.id,
          lineWidth: context?.lineWidth,
          x: event.clientX - canvas!.offsetLeft,
          y: event.clientY - canvas!.offsetTop,
          color: color,
          draw_type: 'draw',
          isErasing : props.isErasing,
          isDrawing: isDrawing
        };
        socket.emit('draw_event', data);
      }
    }

    event.preventDefault();
    event.stopPropagation();
  };

  const stop = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = props.canvasRef.current;
    const context = canvas?.getContext('2d');

    if (isDrawing) {
      if(context){
        context.stroke();
        setIsDrawing(false);

        // Acceder al objeto socket dentro de la referencia
        const socket = props.socket;

        // Enviar el evento de dibujo al servidor
        if(socket){
          const data = {
            sid: socket.id,
            color: color,
            lineWidht: parseInt(colorWidth),
            draw_type: 'stop',
            isDrawing : isDrawing
          };
          socket.emit('draw_event', data);
        }
        props.addChange(event);
      }
    }
    event.preventDefault();
    event.stopPropagation();
  };

  useEffect(() => {
    props.setFunctions({
      start: start,
      draw: draw,
      stop: stop,
    });


  }, [isDrawing, color, colorWidth, props.isErasing, props.canvasRef]);

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