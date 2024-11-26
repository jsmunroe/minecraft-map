import { v4 } from 'uuid'
import { asError, asSuccess, ValidationResponse } from './ValidationResponse';
import { FormObject } from './FormObject';

export type Location = {
    id: string,
    x: number,
    y: number,
    z: number,
    name?: string
}

export function createLocation(x: number, y: number, z: number, name?: string): Location {
    return {
        id: v4(),
        x,
        y, 
        z, 
        name,
    };
}

export function isLocation(location: any): location is Location {
    if (!location) {
        return false;
    }

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

export function validateLocation (location: FormObject<Location>): ValidationResponse<Location> {
    if (!location.id) {
        location.id = v4();
    }
    
    if (!location.x) {
        return asError('x', 'X is required');
    }

    if (!location.y) {
        return asError('y', 'Y is required');
    }

    if (!location.z) {
        return asError('z', 'Z is required');
    }

    if (typeof location.x === 'string') {
        location.x = parseInt(location.x);
    }

    if (typeof location.y === 'string') {
        location.y = parseInt(location.y);
    }

    if (typeof location.z === 'string') {
        location.z = parseInt(location.z);
    }

    if (typeof location.x !== 'number' || isNaN(location.x)) {
        return asError('x', 'X must be a number');
    }

    if (typeof location.y !== 'number' || isNaN(location.y)) {
        return asError('y', 'Y must be a number');
    }
    
    if (typeof location.z !== 'number' || isNaN(location.z)) {
        return asError('z', 'Z must be a number');
    }

    if (!isLocation(location)) {
        return asError('', 'Location is invalid for an unknown reason.')
    }

    return asSuccess(location);
}