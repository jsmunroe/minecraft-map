import { Location } from '../models/Location'

export type State = {
    locations: Location[],
}

export type Action = 
    | { type: 'AddLocation', payload: Location, }
    | { type: 'RemoveLocation', payload: { id: string }, }

export function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'AddLocation':
            return addLocation(state, action.payload);
        case 'RemoveLocation':
            return removeLocation(state, action.payload);
        default:
            return state;
    }
}

function addLocation(state: State, location: Location): State {
    let { locations } = state;    

    const found = locations.find(l => l.id === location.id);

    if (found) {
        locations = locations.map(l => l === found ? location : l);
    }
    else {
        locations = [...locations, location];
    }

    return { ...state, locations };
}

function removeLocation(state: State, location: { id: string }): State {
    let { locations } = state;

    locations = locations.filter(l => l.id !== location.id);

    return { ...state, locations };
}
