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

export enum EnumStyles {
    align = 'align',
    hyphenation = 'hyphenation',
    fontSize14 = '14',
    toggleButton = 'toggleButton',
}

export enum EnumStyleHeader {

}
export  interface InputParams{ typeColumn: TypeColumn, isDropDownList: boolean, filterByColumn?: TypeColumn, typeInput: EnumInput, placeholder?: string, isMother?: boolean, numberStep?: number, bigNumberStep?: number, style?: EnumStyles[] }

export type DataEntitiesTableStructure = {
    title: string
    column: Array<{ width: number }>
    header: Array<{ title: string, style?: EnumStyles[], }>
    row: Array<InputParams>
};

export type TableCreator = {
    [name in TypeTable]: DataEntitiesTableStructure;
};