import {createContext} from "react";
import {EnumStatus, Item, Line} from "../../../types/categoryReducerTypes";
import {TypeTable, TypeColumn, DependentColumn} from "../../../types/TableCreatorTypes";
import {TableAttributes} from "../../../types/database/models/Table";

export interface IOnChange {
    id: number | string,
    value: number | string | boolean,
    typeTable: TypeTable,
    typeColumn: TypeColumn,
    status: keyof typeof EnumStatus
    dependentColumns?: DependentColumn[]
}

export interface ILineContent {
    id?: number | string,
    states?: Item,
    wasEdit?: boolean,
    isNew?: boolean,
    status?: keyof typeof EnumStatus,
    type?: any,
    typeTable?: TypeTable,
    typeRows?: TypeColumn,
    onChange?: ({id, value, typeTable, typeColumn, status}: IOnChange) => void,
    forceUpdate?: any,
    rowState: Line,
    filterBy?: { typeColumn: TypeColumn, id: number | string }
}
//@ts-ignore
export const LineContent = createContext<ILineContent>()
