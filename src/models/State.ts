import { createMapData, isMapData, MapData } from "./MapData"

export type State = {
    map: MapData
}

export function createState(): State {
    const locations = [
        { id: 'cd494d43-ecb5-4f25-a1cf-a2211bf4794f', x: 0, y: 0, z: 0, name: 'Top Left' },
        { id: '9d1911d7-2611-447e-a841-5ed2d4441751', x: 0, y: 0, z: 100, name: 'Bottom Left' },
        { id: 'cbaae561-3e59-4885-81a2-1c5b53de87e2', x: 100, y: 0, z: 0, name: 'Top Right' },
        { id: '89c9eac3-c85d-4246-af11-c3bab6e9dbbe', x: 100, y: 0, z: 100, name: 'Bottom Right' },
    ]

    const map = { ...createMapData(), locations } 
    

    return {
        map
    }
}

export function isState(state: any): state is State {
    if (!state.map || !isMapData(state.map))
        return false;

    return true;
}