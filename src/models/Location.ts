import { v4 } from 'uuid'

export type Location = {
    id: string,
    x: number,
    y: number,
    z: number,
    name?: string
}

export function createLocation(x: number, y: number, z: number, name?: string) {
    return {
        id: v4(),
        x,
        y, 
        z, 
        name,
    };
}

export function isLocation(location: any): location is Location {
    if ('id' in location === false || typeof location.id !== 'string' || location.id === '') {
        return false;
    }

    if ('x' in location === false || typeof location.x !== 'number' || isNaN(location.x)) {
        return false;
    }

    if ('y' in location === false || typeof location.y !== 'number' || isNaN(location.y)) {
        return false;
    }

    if ('z' in location === false || typeof location.z !== 'number' || isNaN(location.z)) {
        return false;
    }

    return true;
}