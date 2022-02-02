import {ColumnId, Columns, DataColumn, DataEntitiesCatalog} from "../mokData";
import {Item} from "./categoryReducerTypes";
import {TypeOrderTable} from "./orderTypes";


// export interface IDataEntitiesCatalog {
//     [name: string]: string
// }


export type IDataColumn = {
    readonly   [name: string]: string
}
export type TypeGoodsTable = keyof typeof DataEntitiesCatalog
export type TypeTable = TypeGoodsTable | TypeOrderTable
export type TypeColumn = keyof typeof DataColumn
export type TypeColumnId = keyof typeof ColumnId
export type TypeColumnOfTable = keyof typeof Columns

export enum EnumInput {
    text = 'text',
    checkbox = 'checkbox',
    number = 'number',
    select = 'select',
}

export enum EnumStyles {
    align = 'align',
    hyphenation = 'hyphenation',
    fontSize14 = '14',
    fontSizeSmall = '9',
    toggleButton = 'toggleButton',
}

export enum EnumStyleHeader {

}
export interface InputParams {
    typeColumn: TypeColumn,
    isDropDownList: boolean,
    rightTab?: DependentColumn
    filterByColumn?: TypeColumn,
    typeInput: EnumInput,
    placeholder?: string,
    isMother?: boolean,
    numberStep?: number,
    bigNumberStep?: number,
    style?: EnumStyles[],
    defaultState?: boolean | string | number,
    dependent?: {
        local?: DependentColumn
    }
    formula?: {
        local?: {
            columns: Array<{ column: TypeColumn | 'previous', matchSing: (first: number, second: number) => number, onOther?: TypeColumn }>
        }
    }
}

export type DependentColumn = {
    dependentByTable: TypeTable
    parameter: TypeColumn
    changeable: boolean
}

export type TableStructure = {
    [name in TypeColumn]?: InputParams
}
export type DataEntitiesTableStructure = {
    dependency: TypeTable[]
    title: string
    columnParams: Array<{ width: number }>
    header: Array<{ title: string, style?: EnumStyles[], }>
    row: TableStructure
};


export type TablesCreator = {
    [name in TypeTable]: DataEntitiesTableStructure;
};