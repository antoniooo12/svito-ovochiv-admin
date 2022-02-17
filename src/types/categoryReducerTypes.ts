import {IOnChange} from "../components/Table/TableLine/LineContext";
import {IOnClick} from "./TableBtnTypes";
import {TypeColumn, TypeColumnId, TypeTable} from "./TableCreatorTypes";
import {DataEntitiesCatalog} from "../mokData";
import {TableAttributes} from "./database/models/Table";

export enum EnumCategoryReducer {
    CREATE_CATEGORY = "CREATE_CATEGORY",
    CHANGE_CATEGORY = "CHANGE_CATEGORY",
    DELETE_CATEGORY = "DELETE_CATEGORY",
    SET_CATEGORIES = "SET_CATEGORIES",
    EDIT_CATEGORY = "EDIT_CATEGORY",
    DELETE_ALL_NEW_INSTANCE = "DELETE_ALL_NEW_INSTANCE"
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
    tableAdditionalDate: Immutable.Map<TypeTable, Line[]>
    storage: TableEntity
}

export enum EnumStatus {
    isAll = "isAll",
    isNew = "isNew",
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
    data: Array<Line>,
}

export interface Line {
    id: number | string,
    toDelete: boolean,
    wasEdit: boolean,
    columns: ColumnReduxStructure,
    rowAdditionalDate?: Map<TypeColumn, TableAttributes>,
}

export type ColumnReduxStructure = {
    [name in  TypeColumn]?: Item
}
export interface IItems {
    Items: Array<Item>
}

export interface Item  {
    id?: number | string;
    typeColumn: TypeColumn;
    value: string | number | boolean;
    wasEdit: boolean;
    dependencyId?: Record<TypeColumnId, number>
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

export interface RowsToChosenTable {
    readonly rowItem: Line[],
    readonly typeTable: TypeTable,
}

export interface SetCategories {
    type: EnumCategoryReducer.SET_CATEGORIES,
    payload: RowsToChosenTable,
}

export interface editCategory {
    readonly  type: EnumCategoryReducer.EDIT_CATEGORY,
    readonly  payload: IOnClick,
}

export interface deleteAllNewInstance {
    readonly  type: EnumCategoryReducer.DELETE_ALL_NEW_INSTANCE,
    readonly  payload: { typeTable: TypeTable },
}

export type CategoryReducerActions =
    CreateCategory
    | ChangeCategory
    | DeleteCategory
    | SetCategories
    | editCategory
    | deleteAllNewInstance
