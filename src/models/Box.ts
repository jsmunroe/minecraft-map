export type Box = {
    left: number,
    top: number,
    width: number,
    height: number,
}

export function isBox(box: any): box is Box {
    if (typeof box.left !== 'number' || isNaN(box.left))
        return false;

    if (typeof box.top !== 'number' || isNaN(box.top))
        return false;

    if (typeof box.width !== 'number' || isNaN(box.width))
        return false;

    if (typeof box.height !== 'number' || isNaN(box.height))
        return false;

    return true;
}

