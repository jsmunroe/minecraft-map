import { useEffect } from "react";

export default function useKeys(callback: (key: string) => void) {
    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            callback(event.key);
        }

        window.document.addEventListener('keydown', onKeyDown);

        return () => window.document.removeEventListener('keydown', onKeyDown);
    })
}