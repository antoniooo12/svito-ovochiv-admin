import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import ActionCreators from "../../actions";
import * as tableAction from '../tableReducer'

export function findIndexById<T extends { id?: string | number }>(array: Array<T>, findByValue: number | string): number {
    const index = array.findIndex((obj: T) => obj.id === findByValue)
    return index
}

// export function getIdFromValueString(value: string | number | boolean): { pulledId: number | undefined, separatedValue: string | undefined } {
//     if (typeof value === "string" && value.includes(':')) {
//         const separatedValue: string = value.split(':').pop() as string
//         const pulledId: number = value.split(':').shift() as unknown as number
//         return {separatedValue, pulledId} as { pulledId: number, separatedValue: string }
//     }
//     return {separatedValue: undefined, pulledId: undefined}
// }
export function separateString(string: any, separator: string, index: number): string {
    if (typeof string === "string" && string.includes(':')) {
        return string.split(separator)[index]
    }
    return string
}
export async function getIdFromValueString1(value: string | number | boolean): Promise<{ pulledId: number, separatedValue: string } | string> {
    const a = await new Promise<{ pulledId: number, separatedValue: string } | string>(function (resolve, reject) {
        if (typeof value === "string" && value.includes(':')) {
            const separatedValue: string = value.split(':').pop() as string
            const pulledId: number = value.split(':').shift() as unknown as number
            resolve({separatedValue, pulledId} as { pulledId: number, separatedValue: string })
        } else {
            resolve(value as string)
        }
    }).finally((value?: string) => {
        return value
    })
    return a
}


