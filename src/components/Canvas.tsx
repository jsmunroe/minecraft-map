import { useCanvas } from "../hooks";

type CanvasProps = {
    onRender?: (context: CanvasRenderingContext2D, elapsed: number) => void,
    onPointerDown?: (event: React.PointerEvent) => void,
}

function Canvas({onRender, onPointerDown}: CanvasProps) {
    const canvasRef = useCanvas(onRender);
    
    return (
       <canvas ref={canvasRef} onPointerDown={onPointerDown}/> 
    )
}

export default Canvas;