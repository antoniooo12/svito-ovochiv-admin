import {EnumTypeRows} from "./categoryReducerTypes";
import {DataEntitiesCatalog} from "../mokData";


type DataEntitiesTable = keyof typeof DataEntitiesCatalog

export interface IDataEntitiesCatalog{
    [name: string]: string
}

type DataEntitiesTableStructure = {
    title: string
    column: Array<{ width: number }>
    header: Array<{ title: string }>
    row: Array<{typeColumn:EnumTypeRows, typeInput: string, placeholder: string, isMother: boolean }>
};

export interface TableCreator {
    [name: string]: DataEntitiesTableStructure
}