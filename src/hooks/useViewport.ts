import { useContext } from "react";
import { AppContext } from "../state/AppContext";
import Viewport from "../models/Viewport";

export default function useViewport() {
    const [state, dispatch] = useContext(AppContext);

    return new Viewport(state, dispatch);
}