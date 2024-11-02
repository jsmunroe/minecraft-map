import { Box } from '../models/Box';
import { Location } from '../models/Location'
import { Size } from '../models/Size';
import { State } from '../models/State';

export type Action = 
    | { type: 'AddLocation', payload: Location, }
    | { type: 'RemoveLocation', payload: { id: string }, }
    | { type: 'SetCanvas', payload: Size }
    | { type: 'SetViewport', payload: Box }

export function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'AddLocation':
            return addLocation(state, action.payload);
        case 'RemoveLocation':
            return removeLocation(state, action.payload);
        case 'SetCanvas':
            return setCanvas(state, action.payload);
        case 'SetViewport':
            return setViewport(state, action.payload);
        default:
            return state;
    }
}

function addLocation(state: State, location: Location): State {
    let { map } = state;
    let { locations } = map;

    const found = locations.find(l => l.id === location.id);

    if (found) {
        locations = locations.map(l => l === found ? location : l);
    }
    else {
        locations = [...locations, location];
    }

    map = { ...map, locations };
    return { ...state, map };
}

function removeLocation(state: State, location: { id: string }): State {
    let { map } = state;
    let { locations } = map;

    locations = locations.filter(l => l.id !== location.id);

    map = { ...map, locations };
    return { ...state, map };
}

function setCanvas(state: State, canvas: Size): State {
    let { map } = state;
    
    map = { ...map, canvas };
    return { ...state, map };
}

function setViewport(state: State, viewport: Box): State {
    let { map } = state;

    map = { ...map, viewport };
    return { ...state, map }
}