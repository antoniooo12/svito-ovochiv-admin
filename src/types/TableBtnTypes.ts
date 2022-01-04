import {TypeColumn, TypeTable} from "./TableCreatorTypes";
import {EnumStatus} from "./categoryReducerTypes";

export enum EnumTableBtn {
    delete = "delete",
}


export interface IOnClick {
    id: number | string,
    value?: number | boolean | string,
    typeTable: TypeTable,
    rowStatus: keyof typeof EnumStatus,
}