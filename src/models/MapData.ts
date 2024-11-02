import { Location, isLocation } from "./Location"
import { Size, isSize } from "./Size";
import { Box, isBox } from "./Box";

export type MapData = {
    locations: Location[],

    canvas: Size,
    viewport: Box,
}

export function createMapData(canvas: Size = { width: 1600, height: 900 }, viewport?: Box): MapData {
    return {
        locations: [],
        
        canvas,
        viewport: viewport ?? { left: 0, top: 0, ...canvas }
    }
}

export function isMapData(mapData: any): mapData is MapData {
    if (!mapData.locations || !Array.isArray(mapData.locations) || !mapData.locations.every((l: any) => isLocation(l))) {
        return false;
    }

    if (!mapData.canvas || !isSize(mapData.canvas)) {
        return false;
    }

    if (!mapData.viewport || !isBox(mapData.viewport)) {
        return false;
    }

    return true;
}