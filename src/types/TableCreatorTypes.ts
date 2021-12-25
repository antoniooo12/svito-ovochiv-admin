import {DataColumn, DataEntitiesCatalog} from "../mokData";





// export interface IDataEntitiesCatalog {
//     [name: string]: string
// }


export type IDataColumn ={
    readonly   [name: string]: string
}
export type TypeTable = keyof typeof DataEntitiesCatalog
export type TypeColumn = keyof typeof DataColumn


type DataEntitiesTableStructure = {
    title: string
    column: Array<{ width: number }>
    header: Array<{ title: string }>
    row: Array<{ typeColumn: TypeColumn, typeInput: string, placeholder: string, isMother: boolean }>
};

export interface TableCreator {
    [name: string]: DataEntitiesTableStructure
}