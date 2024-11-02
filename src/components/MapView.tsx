import { useCallback, useRef, useState } from "react";
import { useMap, useViewport } from "../hooks";
import { Size } from "../models/Size";
import Canvas from "./Canvas";
import Map from "../models/Map";
import Viewport from "../models/Viewport";
import { Point2 } from "../models/Point";

type RenderData = {
    map: Map,
    viewport: Viewport,
}

function MapView() {
    const map = useMap();
    const viewport = useViewport();

    const renderData = useRef<RenderData>({ map, viewport });

    renderData.current = { map, viewport };

    const [start, setStart] = useState<Point2 | null>(null);

    const handleRender = useCallback((context: CanvasRenderingContext2D) => {
        const { map, viewport } = renderData.current;

        for (const location of map.locations) {
            context.fillStyle = 'black';

            const point = viewport.toScreen(location);

            context.beginPath();
            context.ellipse(point.x, point.y, 10, 10, 0, 0, Math.PI * 2);
            context.fill();
        }

    }, [])

    const handleSize = useCallback(({width, height}: Size) => {
        const { map, viewport } = renderData.current;

        viewport.canvas = { width, height };
        viewport.fitPoints(map.locations);
    }, [])

    const handlePointerDown = (event: React.PointerEvent) => {
        setStart({ x: event.clientX, y: event.clientY} );
    }

    const handlePointerUp = () => {
        setStart(null);
    }

    const handlePointerMove = (event: React.PointerEvent) => {
        if (event.buttons !== 1 || (!start?.x || !start?.y)) {
            return;
        }

        const dx = start.x - event.clientX;
        const dz = start.y - event.clientY;

        viewport.pan(dx, dz);

        setStart({ x: event.clientX, y: event.clientY} );
    }

    const handleWheel = (event: React.WheelEvent) => {
        const factor = event.deltaY < 0 ? 1.1 : 1 / 1.1;
        const center = viewport.toViewport({ x: event.clientX, y: event.clientY });

        viewport.zoom(factor, center);
    }

    const handleDoubleClick = () => {
        viewport.fitPoints(map.locations);
    }

    return (
        <Canvas 
            className="map-view" 
            onRender={handleRender} 
            onSize={handleSize} 
            onPointerDown={handlePointerDown} 
            onPointerMove={handlePointerMove} 
            onPointerUp={handlePointerUp}
            onDoubleClick={handleDoubleClick}
            onWheel={handleWheel}/>
    )
}

export default MapView;