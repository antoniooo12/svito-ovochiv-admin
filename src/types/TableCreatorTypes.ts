import {DataEntitiesCatalog} from "../API";


type DataEntitiesTable = keyof typeof DataEntitiesCatalog



type DataEntitiesTableStructure = {
    column: Array<{ width: number }>
    header: Array<{ title: string }>
    row: Array<{typeColumn:string, typeInput: string, placeholder: string, isMother: boolean }>
};
export interface TableStructures {
    [name: string]: DataEntitiesTableStructure
}
export interface TableCreator {
    [name: string]: DataEntitiesTableStructure
}