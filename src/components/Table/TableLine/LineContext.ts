import {createContext} from "react";
import {EnumStatus, EnumTypeRows, Item, RowItem} from "../../../types/categoryReducerTypes";

export interface IOnChange {
    id: number | string,
    value: number | string | boolean,
    typeRows: EnumTypeRows,
    typeColumn: EnumTypeRows,
    status: keyof typeof EnumStatus
}

interface ILineContent {
    id?: number | string,
    states?: Item,
    wasEdit?: boolean,
    isNew?: boolean,
    status?: keyof typeof EnumStatus,
    type?: any,
    typeRows?: EnumTypeRows,
    onChange?: ({id, value, typeRows}: IOnChange) => void,
    forceUpdate?: any,
    rowState?: RowItem,
}

export const LineContent = createContext<ILineContent>({})
