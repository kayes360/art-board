import React, { useRef, useState } from "react";
import "./App.css";

function App() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [mode, setMode] = useState("");  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!mode) return;

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    // Handle pen and eraser mode for single clicks
    if (mode === "pen") {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, ctx.lineWidth / 2, 0, Math.PI * 2); // Draw a dot
      ctx.fill();
      ctx.closePath();
    } else if (mode === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = 20;
      ctx.beginPath();
      ctx.arc(x, y, ctx.lineWidth / 2, 0, Math.PI * 2); // Erase a small area
      ctx.fill();
      ctx.closePath();
    }

    // Start drawing or erasing on mouse move
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    if (mode === "eraser") {
      setMousePosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    }
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const handleMouseUp = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.closePath();
    setIsDrawing(false);
  };

   

  return (
    <div className="App">
      <div className="toolbar">
      <button
          onClick={() => setMode("pen")}
          className={mode === "pen" ? "selected" : ""}
        >
          🖊️ Pen
        </button>
        <button
          onClick={() => setMode("eraser")}
          className={mode === "eraser" ? "selected" : ""}
        >
          🧹 Erase
        </button>
      </div>
      
      <canvas
        ref={canvasRef}
        className="artboard" 
        width={window.innerWidth}
        height={window.innerHeight - 50}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      ></canvas>

{mode === "eraser" && (
        <div
          className="eraser-indicator"
          style={{
            left: mousePosition.x + "px",
            top: mousePosition.y + "px",
          }}
        ></div>
      )}
      
    </div>
  );
}

export default App;

 
 