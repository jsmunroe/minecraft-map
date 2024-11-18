import { v4 } from "uuid";
import { useKeys, useMap } from "../../hooks";
import { Location, validateLocation } from "../../models/Location"
import { useState } from "react";
import { ValidationError } from "../../models/ValidationError";
import { FormObject } from "../../models/FormObject";
import ValidationErrors from "../common/ValidationErrors";

type AddEditLocationProps = {
    location: FormObject<Location>;
    onSubmit?: () => void;
}

function AddEditLocation({location, onSubmit}: AddEditLocationProps) {
    const map = useMap();
    const [validationError, setValidationError] = useState<ValidationError | null>(null);

    useKeys(key => {
        if (key === 'Escape') {
            onSubmit?.();
        }
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = Object.fromEntries(new FormData(form));

        const newLocation: FormObject<Location> = {
            ...location,
            id: location.id ?? v4(),
            name: formData.name as string,
            x: formData.x as string,
            y: formData.y as string,
            z: formData.z as string
        };

        const validationResponse = validateLocation(newLocation);

        if (!validationResponse.isSuccessful) {
            setValidationError(validationResponse.error);
            return;
        }
        
        map.addLocation(validationResponse.payload);
        onSubmit?.();
    }

    const handleCancel = () => {
        onSubmit?.();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name
                <input type="text" name="name" value={location.name} />

                <ValidationErrors fieldName="name" error={validationError} />
            </label>

            <label className="inline">
                Coordinates
                <input type="text" className="medium right" name="x" placeholder="x" value={location.x} />
                <input type="text" className="medium right" name="y" placeholder="y" value={location.y} />
                <input type="text" className="medium right" name="z" placeholder="z" value={location.z} />

                <ValidationErrors fieldName="x" error={validationError} />
                <ValidationErrors fieldName="y" error={validationError} />
                <ValidationErrors fieldName="z" error={validationError} />
            </label>

            <ValidationErrors fieldName="" error={validationError} />

            <div className="right-buttons">
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </div>
        </form>

    )
}

export default AddEditLocation;