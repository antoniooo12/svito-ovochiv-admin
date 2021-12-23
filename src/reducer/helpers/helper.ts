export function findIndexById<T extends { id?: string | number }>(array: Array<T>, findByValue: number | string): number {
    const index = array.findIndex((obj: T) => obj.id === findByValue)
    return index
}