import { Dispatch } from "react";
import { State } from "./State";
import { Action } from "../state/reducer";
import { Size } from "./Size";
import { Box } from "./Box";
import { Point2, Point3 } from "./Point";

export default class Viewport {
    constructor(
        private _state: State,
        private _dispatch: Dispatch<Action>)
    { }

    get canvas(): Size {
        return this._state.map.canvas
    }

    set canvas(value: Size) {
        this.setCanvas(value);
    }

    get viewport(): Box {
        return this._state.map.viewport;
    }

    set viewport(value: Box) {
        this.setViewport(value);
    }

    fitPoints(points: Point3[], fitPadding = 5) {
        if (points.length === 0) {
            return;
        }

        const xValues = points.map(p => p.x);
        const zValues = points.map(p => p.z);
        
        const minX = Math.min(...xValues) - fitPadding;
        const minZ = Math.min(...zValues) - fitPadding;
        const maxX = Math.max(...xValues) + fitPadding;
        const maxZ = Math.max(...zValues) + fitPadding;

        const width = maxX - minX + fitPadding * 2;
        const height = maxZ - minZ + fitPadding * 2;

        const aspectRatio = this.canvas.width / this.canvas.height;

        if (this.canvas.width <= this.canvas.height) {
            this.setViewport({
                left: minX,
                top: minZ - (width / aspectRatio - height) / 2,
                width,
                height: width / aspectRatio,
            })
        }
        else {
            this.setViewport({
                left: minX - (height * aspectRatio - width) / 2,
                top: minZ,
                width: height * aspectRatio,
                height,
            })
        }
    }

    toScreen(point: Point3): Point2 {
        const { left, top, width, height } = this.viewport;

        return {
            x: (point.x - left) / width * this.canvas.width,
            y: (point.z - top) / height * this.canvas.height,
        }
    } 

    toViewport(point: Point2): Point3 {
        const { left, top, width, height } = this.viewport;

        return {
            x: point.x / this.canvas.width * width + left,
            y: 0,
            z: point.y / this.canvas.height * height + top,
        }
    }

    zoom(factor: number, center: Point3): void {
        let { left, top, width, height } = this.viewport;

        width /= factor;
        height /= factor;
        left = center.x - (center.x - left) / factor;
        top = center.z - (center.z - top) / factor;

        this.setViewport({left, top, width, height});
    }

    pan(deltaX: number, deltaY: number): void {
        const { width, height } = this.viewport;
        let { left, top } = this.viewport;

        left += deltaX / this.canvas.width * width;
        top += deltaY / this.canvas.height * height;

        this.viewport = {...this.viewport, left, top};
    }

    private setCanvas(canvas: Size) {
        this._dispatch({
            type: 'SetCanvas',
            payload: canvas,
        })
    }

    private setViewport(viewport: Box) {
        this._dispatch({
            type: 'SetViewport',
            payload: viewport,
        })
    }
}