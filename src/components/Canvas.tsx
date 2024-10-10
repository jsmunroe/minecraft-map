import { useCanvas } from "../hooks";

function onRender(context: CanvasRenderingContext2D) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    context.fillStyle = 'red';
    context.fillRect(10, 10, 100, 100);
}

function Canvas() {
    const canvasRef = useCanvas(onRender);
    
    return (
       <canvas ref={canvasRef} /> 
    )
}

export default Canvas;