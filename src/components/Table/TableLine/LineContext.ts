import {createContext} from "react";
import {EnumStatus, Item, RowItem} from "../../../types/categoryReducerTypes";
import {TypeTable, TypeColumn} from "../../../types/TableCreatorTypes";

export interface IOnChange {
    id: number | string,
    value: number | string | boolean,
    typeTable: TypeTable,
    typeColumn: TypeColumn,
    status: keyof typeof EnumStatus
}

interface ILineContent {
    id?: number | string,
    states?: Item,
    wasEdit?: boolean,
    isNew?: boolean,
    status?: keyof typeof EnumStatus,
    type?: any,
    typeTable?:TypeTable,
    typeRows?: TypeColumn,
    onChange?: ({id, value, typeTable, typeColumn, status}: IOnChange) => void,
    forceUpdate?: any,
    rowState: RowItem,
}
//@ts-ignore
export const LineContent = createContext<ILineContent>({})
