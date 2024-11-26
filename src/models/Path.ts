import { v4 } from "uuid";
import { isPoint3, Point3 } from "./Point"
import { asChildError, asError, asSuccess, ValidationResponse } from "./ValidationResponse";
import Map from "./Map";

export type EndPoint = { id: string } | Point3

export type Path = {
    id: string,
    start: EndPoint;
    end: EndPoint;
}

export function createPath(start: EndPoint, end: EndPoint) {
    return {
        id: v4(),
        start,
        end,
    }
}

export function isPath(path: any): path is Path {
    if (!path) {
        return false;
    }

    if (typeof path.id !== 'string' || path.id === '') {
        return false;
    }

    if (!isEndPoint(path.start)) {
        return false;
    }

    if (!isEndPoint(path.end)) {
        return false;
    }

    return true;
}

function isEndPoint(endPoint: any): endPoint is EndPoint {
    if (!endPoint) {
        return false;
    }

    if (typeof endPoint.id !== 'string' && !isPoint3(endPoint)) {
        return false;
    }

    return true;
}

export function validatePath(path: Partial<Path>, map: Map): ValidationResponse<Path> {
    if (!path.id) {
        path.id = v4();
    }

    if (!path.start) {
        return asError('start', 'Start is required');
    }

    if (!path.end) {
        return asError('end', 'End is required');
    }

    const startValidation = validateEndPoint(path.start, map);
    if (!startValidation.isSuccessful) {
        return asChildError('start', startValidation);
    }

    path.start = startValidation.payload;

    const endValidation = validateEndPoint(path.end, map);
    if (!endValidation.isSuccessful) {
        return asChildError('end', endValidation);
    }

    path.end = endValidation.payload;

    if (isPath(path)) {
        return asSuccess(path);
    }

    return asError('', 'Path is invalid for an unknown reason.');
}

function validateEndPoint(endpoint: Partial<EndPoint>, map: Map): ValidationResponse<EndPoint> {
    if ('id' in endpoint) {
        // Location id based endpoint

        if (typeof endpoint.id !== 'string') {
            return asError('id', 'Id must be a string.');
        }

        if (!map.locations.some(l => l.id === endpoint.id)) {
            return asError('id', 'End point references a location that does not exist on the map.');
        }
    }

    if ('x' in endpoint) {
        // Coordinate based endpoint

        if (!endpoint.x) {
            return asError('x', 'X is required');
        }
    
        if (!endpoint.y) {
            return asError('y', 'Y is required');
        }
    
        if (!endpoint.z) {
            return asError('z', 'Z is required');
        }
    
        if (typeof endpoint.x === 'string') {
            endpoint.x = parseInt(endpoint.x);
        }
    
        if (typeof endpoint.y === 'string') {
            endpoint.y = parseInt(endpoint.y);
        }
    
        if (typeof endpoint.z === 'string') {
            endpoint.z = parseInt(endpoint.z);
        }
    
        if (typeof endpoint.x !== 'number' || isNaN(endpoint.x)) {
            return asError('x', 'X must be a number');
        }
    
        if (typeof endpoint.y !== 'number' || isNaN(endpoint.y)) {
            return asError('y', 'Y must be a number');
        }
        
        if (typeof endpoint.z !== 'number' || isNaN(endpoint.z)) {
            return asError('z', 'Z must be a number');
        }
    }

    
    if (isEndPoint(endpoint)) {
        return asSuccess(endpoint);
    }

    return asError('', 'End point is invalid for an unknown reason.');
}