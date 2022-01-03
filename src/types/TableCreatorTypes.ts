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
}

export enum EnumStyleHeader {
    align = 'align',
    hyphenation = 'hyphenation',
    fontSize14 = '14',
}

export enum EnumStyleHeader {

}

export type DataEntitiesTableStructure = {
    title: string
    column: Array<{ width: number }>
    header: Array<{ title: string, style?: EnumStyleHeader[], }>
    row: Array<{ typeColumn: TypeColumn, isDropDownList: boolean, filterByColumn?: TypeColumn, typeInput: EnumInput, placeholder?: string, isMother?: boolean, numberStep?: number, bigNumberStep?: number }>
};

export type TableCreator = {
    [name in TypeTable]: DataEntitiesTableStructure;
};