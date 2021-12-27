import {DataColumn, DataEntitiesCatalog} from "../mokData";





// export interface IDataEntitiesCatalog {
//     [name: string]: string
// }


export type IDataColumn ={
    readonly   [name: string]: string
}
export type TypeTable = keyof typeof DataEntitiesCatalog
export type TypeColumn = keyof typeof DataColumn


export type DataEntitiesTableStructure = {
    title: string
    column: Array<{ width: number }>
    header: Array<{ title: string }>
    row: Array<{ typeColumn: TypeColumn, filterByColumn?: TypeColumn, typeInput: string, placeholder: string, isMother: boolean}>
};

export type TableCreator = {
    [name in  TypeTable]: DataEntitiesTableStructure;
};