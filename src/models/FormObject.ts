export type FormObject<T> = {
    [P in keyof T]?: string | T[P];
}