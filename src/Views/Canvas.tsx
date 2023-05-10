import React, { useRef, useState } from 'react';

// Estilos
import './Canvas.css'

// Componentes
import ToolBar from '../components/Canvas/ToolBar/ToolBar';

function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [functions, setFunctions] = useState({
    start: ()=>{},
    draw: ()=>{},
    stop: ()=>{}
  });
  
  return (
    <main>
      <ToolBar canvasRef={canvasRef} setFunctions={setFunctions}/>
      <canvas
        ref={canvasRef}
        width={window.innerWidth-40} 
        height={window.innerHeight-120}
        onMouseDown={functions?.start}
        onTouchStart={functions?.start}
        onMouseMove={functions?.draw}
        onTouchMove={functions?.draw}
        onTouchEnd={functions?.stop}
        onMouseUp={functions?.stop}
        onMouseOut={functions?.stop}
        className='canvas-container'
      />
    </main>
  );
}

export default Canvas;


