import { useCallback, useRef } from "react";
import { useMap, useViewport, useViewportControls } from "../hooks";
import Canvas from "./Canvas";
import Map from "../models/Map";
import Viewport from "../models/Viewport";
import { Size } from "../models/Size";

type RenderData = {
    map: Map,
    viewport: Viewport,
}

function MapView() {
    const map = useMap();
    const viewport = useViewport();

    const attributes = useViewportControls(viewport, map);

    const renderData = useRef<RenderData>({ map, viewport });

    renderData.current = { map, viewport };

    const handleRender = useCallback((context: CanvasRenderingContext2D) => {
        const { map, viewport } = renderData.current;

        for (const location of map.locations) {
            context.fillStyle = 'black';

            const point = viewport.toScreen(location);

            context.beginPath();
            context.ellipse(point.x, point.y, 4, 4, 0, 0, Math.PI * 2);
            context.fill();

            if (location.name) {
                context.font = '12px sans-serif';
                context.fillStyle = 'black';
                context.textBaseline = 'middle';

                context.fillText(location.name, point.x + 10, point.y);
            }
        }

    }, []);

    const handleSize = useCallback(({width, height}: Size) => {
        const { map, viewport } = renderData.current;

        viewport.canvas = { width, height };
        viewport.fitPoints(map.locations);
    }, [])

    return (
        <Canvas 
            className="map-view" 
            onRender={handleRender} 
            onSize={handleSize}
            {...attributes}
        />
    )
}

export default MapView;