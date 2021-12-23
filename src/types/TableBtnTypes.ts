import {EnumTypeRows} from "./categoryReducerTypes";

export enum EnumTableBtn {
    delete = "delete",
}


export interface IOnClick {
    id: number | string,
    value: number | boolean,
    typeRow: EnumTypeRows,
}