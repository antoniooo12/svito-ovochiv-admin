import {DataColumn, DataEntitiesCatalog} from "../mokData";





// export interface IDataEntitiesCatalog {
//     [name: string]: string
// }


export type IDataColumn = {
    readonly   [name: string]: string
}
export type TypeTable = keyof typeof DataEntitiesCatalog
export type TypeColumn = keyof typeof DataColumn

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
    filterByColumn?: TypeColumn,
    typeInput: EnumInput,
    placeholder?: string,
    isMother?: boolean,
    numberStep?: number,
    bigNumberStep?: number,
    style?: EnumStyles[],
    defaultState?: boolean | string | number,
}

export type DataEntitiesTableStructure = {
    dependency: TypeTable[]
    title: string
    column: Array<{ width: number }>
    header: Array<{ title: string, style?: EnumStyles[], }>
    row: Array<InputParams>
};

export type TableCreator = {
    [name in TypeTable]: DataEntitiesTableStructure;
};