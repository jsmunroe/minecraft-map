import Canvas from './components/Canvas'
import { useCallback, useReducer } from 'react';
import { createLocation } from './models/Location'
import { reducer, State } from './state/reducer';
import './App.css'

const initialState: State = {
    locations: [],
}

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const onRender = useCallback((context: CanvasRenderingContext2D) => {
               
        for (const location of state.locations) {
            context.fillStyle = 'black';

            context.beginPath();
            context.ellipse(location.x, location.z, 10, 10, 0, 0, Math.PI * 2);
            context.fill();
        }

    }, [state])

    const onPointerDown = (event: React.PointerEvent) => {
        dispatch({
            type: 'AddLocation',
            payload: createLocation(event.clientX, 0, event.clientY),
        })
    }

    return (
        <Canvas onRender={onRender} onPointerDown={onPointerDown}/>
    )
}

export default App
