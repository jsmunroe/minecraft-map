import { createContext, Dispatch, useReducer } from "react";
import { Action, reducer, State } from "./reducer";

type ContextType = [State, Dispatch<Action>];

const initialState: State = {
    locations: [],
}

export const AppContext = createContext<ContextType>([initialState, () => {}]);

type AppContextProviderProps = {
    children: React.ReactNode;
}

export function AppContextProvider({children}: AppContextProviderProps) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={[state, dispatch]}>
            {children}
        </AppContext.Provider>
    )
}