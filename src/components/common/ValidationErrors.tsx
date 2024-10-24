import { ValidationError } from "../../models/ValidationError";

type ValidationErrorProps = {
    fieldName: string,
    error: ValidationError | null;
}

function ValidationErrors({fieldName, error}: ValidationErrorProps) {
    if (error?.fieldName !== fieldName) {
        return null;
    }

    return (
        <div className="validation-errors">
            {error.message}
        </div>
    )
}

export default ValidationErrors;