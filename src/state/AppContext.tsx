import { createContext, Dispatch, useReducer } from "react";
import { Action, reducer } from "./reducer";
import { createState, State } from "../models/State";

type ContextType = [State, Dispatch<Action>];

const initialState: State = createState();

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