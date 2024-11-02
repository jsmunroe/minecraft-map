export type Size = {
    width: number,
    height: number,
}

export function isSize(size: any): size is Size {
    if (typeof size.width !== 'number' || isNaN(size.width))
        return false;

    if (typeof size.height !== 'number' || isNaN(size.height))
        return false;

    return true;
}

