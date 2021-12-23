import {IOnChange} from "../components/Table/TableLine/LineContext";
import {IOnClick} from "./TableBtnTypes";

export enum EnumCategoryReducer {
    CREATE_CATEGORY = "CREATE_CATEGORY",
    CHANGE_CATEGORY = "CHANGE_CATEGORY",
    DELETE_CATEGORY = "DELETE_CATEGORY"
}


export enum EnumTableEntity {
    categories = "categories",
    subCategories = "subCategories",
}


export enum EnumStatus {
    isNew = "isNew",
    isAll = "isAll",
}


export enum EnumTypeCategory {
    allCategory = "allCategory",
    newCategory = "newCategory",
}

export type EnumTypeRows = EnumTypeCategory


export interface ICategoryTypeStructure {
    forceRender: number,
    status: EnumStatus,
    data: Array<Item>,
}


export interface CategoryState {
    storage: Record<EnumTypeCategory, ICategoryTypeStructure>
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
