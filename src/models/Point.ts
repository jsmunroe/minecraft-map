export type Point3 = {
    x: number,
    y: number,
    z: number,
}

export type Point2 = {
    x: number,
    y: number,
}

export function isPoint3(point: any): point is Point3 {
    if (typeof point.x !== 'number' || isNaN(point.x)) {
        return false;
    }

    if (typeof point.y !== 'number' || isNaN(point.y)) {
        return false;
    }

    if (typeof point.z !== 'number' || isNaN(point.z)) {
        return false;
    }   

    return true;
}

export function isPoint2(point: any): point is Point2 {
    if (typeof point.x !== 'number' || isNaN(point.x)) {
        return false;
    }

    if (typeof point.y !== 'number' || isNaN(point.y)) {
        return false;
    }

    return true;
}