import {EnumStatus} from "../../../types/categoryReducerTypes";


export type DependentColumn = {
    dependentByTable: string
    parameter: string
    changeable: boolean
}
export interface IOnChangeColumn {
    lineId: number | string,
    value: number | string | boolean,
    typeColumn: string,
    status: keyof typeof EnumStatus
    dependentColumns?: DependentColumn[]
}