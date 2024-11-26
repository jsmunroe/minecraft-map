import { useMemo, useState } from "react";
import { useKeys, useMap } from "../../hooks"
import { EndPoint, Path, validatePath } from "../../models/Path"
import { ValidationError } from "../../models/ValidationError";
import { v4 } from "uuid";
import ValidationErrors from "../common/ValidationErrors";

type AddEditPathProps = {
    path: Partial<Path>,
    onSubmit: () => void, 
}

function AddEditPath({path, onSubmit}: AddEditPathProps) {
    const map = useMap();
    const [validationError, setValidationError] = useState<ValidationError | null>(null);
    
    useKeys(key => {
        if (key === 'Escape') {
            onSubmit?.();
        }
    });

    const locations = useMemo(() => map.locations.filter(l => typeof l.name === 'string').sort((a, b) => a.name!.localeCompare(b.name!) ?? 0), [map.locations]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = Object.fromEntries(new FormData(form));

        const start = map.locations.find((l => l.id === formData.start));
        const end = map.locations.find((l => l.id === formData.end));

        const newPath: Partial<Path> = {
            ...path,
            id: path.id ?? v4(),
            start: start ? { id: start.id } : undefined,
            end: end ? { id: end.id }: undefined,
        };

        const validationResponse = validatePath(newPath, map);

        if (!validationResponse.isSuccessful) {
            setValidationError(validationResponse.error);
            return;
        }
        
        map.addPath(validationResponse.payload);
        onSubmit?.();
    }

    const handleCancel = () => {
        onSubmit?.();
    }

    const getValue = (endpoint: EndPoint | undefined): string | undefined => {
        if (endpoint && 'id' in endpoint) {
            return endpoint.id;
        }

        return undefined;
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <label htmlFor="start">Start</label>
                <select id="start" name="start" value={getValue(path.start)}>
                    {locations.map(location => <option key={location.id} value={location.id}>{location.name}</option>)}
                </select>

                <ValidationErrors fieldName="start" error={validationError} />

                <label htmlFor="end">End</label>
                <select id="end" name="end" value={getValue(path.end)}>
                    {locations.map(location => <option key={location.id} value={location.id}>{location.name}</option>)}
                </select>

                <ValidationErrors fieldName="end" error={validationError} />

                <ValidationErrors fieldName="" error={validationError} />
            </fieldset>

            <div className="right-buttons">
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    )
}

export default AddEditPath;