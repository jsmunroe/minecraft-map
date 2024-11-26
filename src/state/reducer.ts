import { Box } from '../models/Box';
import { Location } from '../models/Location'
import { Path } from '../models/Path';
import { Size } from '../models/Size';
import { State } from '../models/State';

export type Action = 
    | { type: 'AddLocation', payload: Location, }
    | { type: 'RemoveLocation', payload: { id: string }, }
    | { type: 'AddPath', payload: Path, }
    | { type: 'RemovePath', payload: { id: string }, }
    | { type: 'SetCanvas', payload: Size }
    | { type: 'SetViewport', payload: Box }

export function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'AddLocation':
            return addLocation(state, action.payload);
        case 'RemoveLocation':
            return removeLocation(state, action.payload);
        case 'AddPath':
            return addPath(state, action.payload);
        case 'RemovePath':
            return removePath(state, action.payload);
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

function addPath(state: State, path: Path): State {
    let { map } = state;
    let { paths } = map;

    const found = paths.find(p => p.id === path.id);

    if (found) {
        paths = paths.map(p => p === found ? path : p);
    }
    else {
        paths = [...paths, path];
    }

    map = {...map, paths};
    return {...state, map};
}

function removePath(state: State, path: { id: string }): State {
    let { map } = state;
    let { paths } = map;

    paths = paths.filter(p => p.id !== path.id);

    map = {...map, paths};
    return {...state, map};
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