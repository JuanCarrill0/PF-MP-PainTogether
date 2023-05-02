import React, { useRef, useState } from 'react';

function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [color, setColor] = useState<string>('black');
  const [isErasing, setIsErasing] = useState<boolean>(false);
  const [strokes, setStrokes] = useState<Array<Array<number>>>([]);

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!context) return;
    const { offsetX, offsetY } = event.nativeEvent;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const continueDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!context) return;

    if (isErasing) {
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
      context.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const addHoverClass = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isErasing) {
      const canvas = canvasRef.current;
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
  };

  const removeHoverClass = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const borrar = () => {
    if(isErasing){
      setIsErasing(false);
    }else{
      setIsErasing(true);
    }
  };
  
  return (
    <div>
      <canvas
        ref={canvasRef}
        width={500} // Tamaño suficiente para dibujar
        height={500}
        onMouseDown={startDrawing}
        onMouseMove={continueDrawing}
        onMouseUp={stopDrawing}
        onMouseEnter={addHoverClass}
        style={{ border: '1px solid black' }}
      />
      <div>
        <button onClick={() => setColor('red')}>Rojo</button>
        <button onClick={() => setColor('blue')}>Azul</button>
        <button onClick={() => setColor('green')}>Verde</button>
        <button onClick={() => setColor('black')}>Negro</button>
        <button onClick={() => clearCanvas()}>Borrar Todo</button>
        <button onClick={() => borrar()}>Borrar</button>
      </div>
    </div>
  );
}

export default Canvas;


