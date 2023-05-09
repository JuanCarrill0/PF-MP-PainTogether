import React, { useRef, useState } from 'react';

// Estilos
import './Canvas.css'

// Componentes
import ToolBar from '../Components/Canvas/ToolBar/ToolBar';

function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [functions, setFunctions] = useState({
    startDrawing: ()=>{},
    continueDrawing: ()=>{},
    stopDrawing: ()=>{},
    addHoverClass: ()=>{}
  });
  
  return (
    <main>
      <ToolBar canvasRef={canvasRef} setFunctions={setFunctions}/>
      <canvas
        ref={canvasRef}
        width={window.innerWidth-40} 
        height={window.innerHeight-120}
        onMouseDown={functions?.startDrawing}
        onMouseMove={functions?.continueDrawing}
        onMouseUp={functions?.stopDrawing}
        onMouseEnter={functions?.addHoverClass}
        className='canvas-container'
      />
    </main>
  );
}

export default Canvas;


