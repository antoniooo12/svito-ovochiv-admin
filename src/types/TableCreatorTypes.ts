import {DataEntitiesCatalog} from "../API";
import {EnumTypeRows} from "./categoryReducerTypes";


type DataEntitiesTable = keyof typeof DataEntitiesCatalog



type DataEntitiesTableStructure = {
    column: Array<{ width: number }>
    header: Array<{ title: string }>
    row: Array<{typeColumn:EnumTypeRows, typeInput: string, placeholder: string, isMother: boolean }>
};

export interface TableCreator {
    [name: string]: DataEntitiesTableStructure
}