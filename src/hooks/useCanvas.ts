import { RefObject, useEffect, useRef } from "react";
import { Size } from "../models/Size";

type UseCanvasOptions = {
    onRender?: (context: CanvasRenderingContext2D, elapsed: number) => void,
    onSize?: ({width, height}: Size) => void, 
}

function useCanvas({onRender, onSize}: UseCanvasOptions): RefObject<HTMLCanvasElement> {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        const onWindowResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            onSize?.(canvas);
        }

        window.addEventListener('resize', onWindowResize);
        onWindowResize();

        return () => window.removeEventListener('resize', onWindowResize);
    }, [onSize])

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        const context = canvas.getContext('2d');

        if (!context) {
            return;
        }

        let start = 0;
        let handle: number = 0;

        const step = (timestamp: number) => {
            const elapsed = timestamp - start;
            start = timestamp;

            context.clearRect(0, 0, context.canvas.width, context.canvas.height);

            onRender?.(context, elapsed);

            handle = requestAnimationFrame(step);
        }

        handle = requestAnimationFrame(step);

        return () => cancelAnimationFrame(handle);
    }, [onRender]);

    return canvasRef;
}

export default useCanvas;