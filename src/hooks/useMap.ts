import { useContext } from "react";
import { AppContext } from "../state/AppContext";
import Map from "../models/Map";

export default function useMap() {
    const [state, dispatch] = useContext(AppContext);

    return new Map(state, dispatch);
}