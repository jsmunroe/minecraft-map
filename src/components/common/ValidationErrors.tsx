import { ValidationError } from "../../models/ValidationError";

type ValidationErrorProps = {
    fieldName: string,
    error: ValidationError | null;
}

function ValidationErrors({fieldName, error}: ValidationErrorProps) {
    const rexFieldNameStartsWith = new RegExp(`^${fieldName}\b`);
    if (!error || !rexFieldNameStartsWith.test(error.fieldName)) {
        return null;
    }

    return (
        <div className="validation-errors">
            {error.message}
        </div>
    )
}

export default ValidationErrors;