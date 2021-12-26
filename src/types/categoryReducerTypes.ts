import {IOnChange} from "../components/Table/TableLine/LineContext";
import {IOnClick} from "./TableBtnTypes";
import {} from "../API";
import {IDataColumn, TableCreator, TypeTable} from "./TableCreatorTypes";
import {DataEntitiesCatalog, DataColumn} from "../mokData";

export enum EnumCategoryReducer {
    CREATE_CATEGORY = "CREATE_CATEGORY",
    CHANGE_CATEGORY = "CHANGE_CATEGORY",
    DELETE_CATEGORY = "DELETE_CATEGORY"
}


// export type TableEntitiesType = keyof typeof DataEntitiesCatalog
export type TableEntitiesType = typeof DataEntitiesCatalog

export type TableEntityStructure = {
    [status in EnumStatus]: ICategoryTypeStructure;
};

export interface TableEntity {
    [name: string]: TableEntityStructure
}

export interface CategoryState {
    storage: TableEntity
}

export enum EnumStatus {
    isNew = "isNew",
    isAll = "isAll",
}


export enum EnumTypeCategory {
    allCategory = "allCategory",
    newCategory = "newCategory",
}

// export type EnumTypeColumn = typeof DataColumn
// export type EnumTypeColumn = {
//     [typeColumn in keyof typeof DataColumn]: typeof DataColumn
// }


export interface ICategoryTypeStructure {
    forceRender: number,
    data: Array<RowItem>,
}

export interface RowItem {
    id: number | string,
    toDelete: boolean,
    wasEdit: boolean,
    columns: Array<Item>,
}

export interface IItems {
    Items: Array<Item>
}

export interface Item {
    typeColumn: any;
    value: string | number | boolean;
    wasEdit: boolean;
}


interface CreateCategory {
    type: EnumCategoryReducer.CREATE_CATEGORY,
    payload: TypeTable,
}

interface ChangeCategory {
    type: EnumCategoryReducer.CHANGE_CATEGORY,
    payload: IOnChange,
}
interface DeleteCategory {
    type: EnumCategoryReducer.DELETE_CATEGORY,
    payload: IOnClick,
}

export type CategoryReducerActions = CreateCategory | ChangeCategory | DeleteCategory
