import { CanvasHTMLAttributes, useState } from "react";
import Map from "../models/Map";
import Viewport from "../models/Viewport";
import { Point2 } from "../models/Point";

export default function useViewportControls(viewport: Viewport, map: Map): CanvasHTMLAttributes<HTMLCanvasElement> {
    const [start, setStart] = useState<Point2 | null>(null);

    const onPointerDown = (event: React.PointerEvent) => {
        setStart({ x: event.clientX, y: event.clientY} );
    }

    const onPointerUp = () => {
        setStart(null);
    }

    const onPointerMove = (event: React.PointerEvent) => {
        if (event.buttons !== 1 || (!start?.x || !start?.y)) {
            return;
        }

        const dx = start.x - event.clientX;
        const dz = start.y - event.clientY;

        viewport.pan(dx, dz);

        setStart({ x: event.clientX, y: event.clientY} );
    }

    const onWheel = (event: React.WheelEvent) => {
        const factor = event.deltaY < 0 ? 1.1 : 1 / 1.1;
        const center = viewport.toViewport({ x: event.clientX, y: event.clientY });

        viewport.zoom(factor, center);
    }

    const onDoubleClick = () => {
        viewport.fitPoints(map.locations);
    }

    return {
        onPointerDown,
        onPointerUp,
        onPointerMove,
        onWheel,
        onDoubleClick,
    }
}