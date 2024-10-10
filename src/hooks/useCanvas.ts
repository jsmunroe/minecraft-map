import { RefObject, useEffect, useRef } from "react";

function useCanvas(onRender: (context: CanvasRenderingContext2D, elapsed: number) => void): RefObject<HTMLCanvasElement> {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        const context = canvas.getContext('2d');

        if (!context) {
            return;
        }

        const onWindowResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        let start = 0;
        const step = (timestamp: number) => {
            const elapsed = timestamp - start;
            start = timestamp;

            onRender(context, elapsed);

            requestAnimationFrame(step);
        }

        const handle = requestAnimationFrame(step);

        window.addEventListener('resize', onWindowResize);
        onWindowResize();

        return () => {
            cancelAnimationFrame(handle);
            window.removeEventListener('resize', onWindowResize);
        }
    }, [onRender]);

    return canvasRef;
}

export default useCanvas;