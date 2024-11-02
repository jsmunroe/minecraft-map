import { useCanvas } from "../hooks";
import { Size } from "../models/Size";

type CanvasProps = {
    onRender?: (context: CanvasRenderingContext2D, elapsed: number) => void,
    onSize?: ({width, height}: Size) => void, 
} & React.CanvasHTMLAttributes<HTMLCanvasElement>

function Canvas({onRender, onSize, ...props}: CanvasProps) {
    const canvasRef = useCanvas({onRender, onSize});
    
    return (
       <canvas ref={canvasRef} {...props}/> 
    )
}

export default Canvas;