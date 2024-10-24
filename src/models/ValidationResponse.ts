import { ValidationError } from "./ValidationError";

export type ValidationResponse<TPayload> = 
    | { isSuccessful: true, payload: TPayload }
    | { isSuccessful: false, error: ValidationError }

export function asError(fieldName: string, message: string): ValidationResponse<never> {
    return {
        isSuccessful: false,
        error: {
            fieldName,
            message,
        }
    }
}

export function asSuccess<TPayload>(payload: TPayload): ValidationResponse<TPayload> {
    return {
        isSuccessful: true,
        payload,
    }
}