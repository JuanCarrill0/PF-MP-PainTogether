import React, { useEffect, useRef, useState } from 'react';
import { Socket, io } from 'socket.io-client';

// Estilos
import './Canvas.css';

// Componentes
import ToolBar from '../components/Canvas/ToolBar/ToolBar';

function Canvas() {
 
    // Inicializar el socket y establecer la conexión con el backend
  const socketRef = useRef<Socket | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [functions, setFunctions] = useState({
    start: () => {},
    draw: () => {},
    stop: () => {}
  });

  useEffect(() => {
    socketRef.current = io('http://192.168.0.17:5000'); // Establece la referencia al socket

    // Configurar manejadores de eventos para recibir eventos de dibujo desde el backend
    socketRef.current.on('draw_event', handleDrawEvent);
    socketRef.current.on("clear_canvas", handleClearCanvas);

    // Manejar el evento de conexión al montar el componente
    console.log('Conectado al servidor Socket.IO');

    // Limpia la conexión al desmontar el componente
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  // Función para manejar el evento 'clear_canvas' recibido del backend
  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (canvas && context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  };
  
// Función para manejar los eventos de dibujo recibidos desde el backend
const handleDrawEvent = (data: { x: any; y: any; color: any; draw_type: any }) => {
  const canvas = canvasRef.current;
  const context = canvas?.getContext('2d');

  if (!context) return;

  const { x, y, color, draw_type } = data;

  context.lineWidth = 2;
  context.strokeStyle = color;

  if (draw_type === 'draw') {
    context.lineTo(x, y);
    context.stroke();
  }

  if (draw_type === 'start') {
    context.beginPath();
    context.moveTo(x, y);
  } else if (draw_type === 'stop') {
    context.closePath();
  }
};

  return (
    <main>
      <ToolBar canvasRef={canvasRef} setFunctions={setFunctions} socket={socketRef.current} />
      <canvas
        ref={canvasRef}
        width={window.innerWidth - 40}
        height={window.innerHeight - 120}
        onMouseDown={functions?.start}
        onTouchStart={functions?.start}
        onMouseMove={functions?.draw}
        onTouchMove={functions?.draw}
        onTouchEnd={functions?.stop}
        onMouseUp={functions?.stop}
        onMouseOut={functions?.stop}
        className="canvas-container"
      />
    </main>
  );
}

export default Canvas;
