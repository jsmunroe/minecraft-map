import { Dispatch } from "react";
import { Action, State } from "../state/reducer";
import { createLocation } from "./Location";

export default class Map {
    constructor(
        private _state: State,
        private _dispatch: Dispatch<Action>)
    { }

    get locations() {
        return this._state.locations;
    }

    addLocation(x: number, y: number, z: number, name?: string) {
        this._dispatch({
            type: 'AddLocation',
            payload: createLocation(x, y, z, name),
        })
    }
}