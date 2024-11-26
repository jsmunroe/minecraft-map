import { Dispatch } from "react";
import { Action } from "../state/reducer";
import { createLocation, isLocation, Location } from "./Location";
import { State } from "./State";
import { EndPoint, Path } from "./Path";
import { Point3 } from "./Point";

export default class Map {
    constructor(
        private _state: State,
        private _dispatch: Dispatch<Action>)
    { }

    get locations() {
        return this._state.map.locations;
    }

    get paths() {
        return this._state.map.paths;
    }

    getPoint(point: EndPoint): Point3 {
        if ('id' in point) {
            const location = this.locations.find(l => l.id === point.id);

            if (!location) {
                throw new Error(`Location with ID ${point.id} not found in map.`);
            }

            return { x: location.x, y: location.y, z: location.z}
        }

        return point;
    }

    addLocation(location: Location): void;
    addLocation(x: number, y: number, z: number, name?: string): void;
    addLocation(...params: any[]): void {
        if (typeof params[0] === 'number' && typeof params[1] === 'number' && typeof params[2] === 'number' && (typeof params[3] === 'string' || !params[3])) {
            const x = params[0] as number;
            const y = params[1] as number;
            const z = params[2] as number;

            const name = params[3] as string | undefined;
            
            this._dispatch({
                type: 'AddLocation',
                payload: createLocation(x, y, z, name),
            })

            return;
        }

        if (isLocation(params[0])) {
            const location = params[0];

            this._dispatch({
                type: 'AddLocation',
                payload: location,
            })
            
            return;
        }
    }

    addPath(path: Path): void {
        this._dispatch({
            type: 'AddPath',
            payload: path,
        });
    }
}