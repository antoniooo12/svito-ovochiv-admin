import {LineStructure} from "../../../types/TableCreatorTypes";
import {IOnChangeColumn} from "./actions";


export interface TableState {
    storage: TableStructure
}

export enum EnumStatus {
    isAll = "isAll",
    isNew = "isNew",
}

type TableDataStructure = {
    data: TTableLine[]
}

export type TableStructure = { [status in EnumStatus]: TableDataStructure }

type    TypeTable = {
    [key: string]: string
}

export type TTableLine = {
    id: number | string
    toDelete: boolean
    wasEdit: boolean
    columns: TableColumn
}

export type Item = {
    id: number | string;
    typeColumn: string;
    value: string | number | boolean;
    wasEdit: boolean;
    dependencyId?: Record<string, number>
}

export type TableColumn = Map<string, Item>
//     {
//     [name: string]: Item
// }

export enum EnumTableReducer {
    createLine = 'createLine',
    changeColumn = 'changeColumn',
}

type CreateLine = {
    type: EnumTableReducer.createLine
    payload: { lineStructure: LineStructure }
}
type changeColumn = {
    type: EnumTableReducer.changeColumn
    payload: IOnChangeColumn
}
export type  TableReducerActions = CreateLine | changeColumn
