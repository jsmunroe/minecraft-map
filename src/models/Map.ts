import { Dispatch } from "react";
import { Action, State } from "../state/reducer";
import { createLocation, isLocation, Location } from "./Location";

export default class Map {
    constructor(
        private _state: State,
        private _dispatch: Dispatch<Action>)
    { }

    get locations() {
        return this._state.locations;
    }

    addLocation(location: Location): void;
    addLocation(x: number, y: number, z: number, name?: string): void;
    addLocation(...params: any[]): void {
        if (params.length === 4 && typeof params[0] === 'number' && typeof params[1] === 'number' && typeof params[2] === 'number' && (typeof params[3] === 'string' || !params[3])) {
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

        if (params.length === 1 && isLocation(params[0])) {
            const location = params[0];

            this._dispatch({
                type: 'AddLocation',
                payload: location,
            })
            
            return;
        }
    }
}