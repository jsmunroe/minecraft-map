import Canvas from './components/Canvas'
import { useCallback } from 'react';
import './App.css'
import { useMap } from './hooks';

function App() {
    const map = useMap();

    const onRender = useCallback((context: CanvasRenderingContext2D) => {
               
        for (const location of map.locations) {
            context.fillStyle = 'black';

            context.beginPath();
            context.ellipse(location.x, location.z, 10, 10, 0, 0, Math.PI * 2);
            context.fill();
        }

    }, [map.locations])

    const onPointerDown = (event: React.PointerEvent) => {
        map.addLocation(event.clientX, 0, event.clientY);
    }

    return (
        <Canvas onRender={onRender} onPointerDown={onPointerDown}/>
    )
}

export default App
