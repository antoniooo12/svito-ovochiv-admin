import {IOnChange} from "../components/Table/TableLine/LineContext";
import {IOnClick} from "./TableBtnTypes";
import {DataEntitiesCatalog} from "../API";

export enum EnumCategoryReducer {
    CREATE_CATEGORY = "CREATE_CATEGORY",
    CHANGE_CATEGORY = "CHANGE_CATEGORY",
    DELETE_CATEGORY = "DELETE_CATEGORY"
}


export type TableEntitiesType = keyof typeof DataEntitiesCatalog

type TableEntityStructure = {
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

export type EnumTypeRows = TableEntitiesType


export interface ICategoryTypeStructure {
    forceRender: number,
    data: Array<Item>,
}



export interface IItems {
    Items: Array<Item>
}

export interface Item {
    id: number;
    toDelete: boolean;
    value: string | number | boolean;
    wasEdit: boolean;
}


interface CreateCategory {
    payload: string,
    type: EnumCategoryReducer.CREATE_CATEGORY,
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
