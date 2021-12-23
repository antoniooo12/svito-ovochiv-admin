import {createContext} from "react";
import {EnumTypeRows, Item} from "../../../types/categoryReducerTypes";

export interface IOnChange {
    id: number | string,
    value: number | string | boolean,
    typeRow: EnumTypeRows,
}

interface ILineContent {
    id?: number | string,
    states?: Item,
    wasEdit?: boolean,
    isNew?: boolean,
    type?: any,
    typeRow?: EnumTypeRows,
    onChange?: ({id, value, typeRow}: IOnChange) => void,
    forceUpdate?: any,
}

export const LineContent = createContext<ILineContent>({})
