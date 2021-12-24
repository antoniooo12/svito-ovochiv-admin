import {IOnChange} from "../components/Table/TableLine/LineContext";
import {
    CategoryReducerActions,
    CategoryState,
    EnumCategoryReducer,
    EnumStatus,
    EnumTypeCategory, EnumTypeRows,
    Item, RowItem, TableEntitiesType, TableEntity
} from "../types/categoryReducerTypes";
import {IOnClick} from "../types/TableBtnTypes";
import {findIndexById} from "./helpers/helper";
import {columns, DataEntitiesCatalog} from "../API";
import {TableCreatorMokData} from "../mokData";
import {TableCreator} from "../types/TableCreatorTypes";

const CREATE_CATEGORY = 'CREATE_CATEGORY'
const CHANGE_CATEGORY = "CHANGE_CATEGORY"
const CHANGE_OLD_CATEGORY = "CHANGE_OLD_CATEGORY"
const SET_CATEGORIES = 'SET_CATEGORIES'
const BULK_DELETE_CATEGORY = 'BULK_DELETE_CATEGORY'
const DELETE_CATEGORY = 'DELETE_CATEGORY'
const CLEAN_NEW_CATEGORY = "CLEAN_NEW_CATEGORY"
const EDIT_OLD_CATEGORY = 'EDIT_OLD_CATEGORY'

let implementedTableEntities: TableEntity = {}


Object.keys(DataEntitiesCatalog).forEach((el: string) => {
    implementedTableEntities[el] = {
        isNew: {
            forceRender: 0,
            data: [],
        },
        isAll: {
            forceRender: 0,
            data: [],
        }
    }
})

console.log(implementedTableEntities)

const defaultState: CategoryState = {
    storage: {
        ...implementedTableEntities
    }
}
console.log(defaultState)


export default function tableReducer(state: CategoryState = defaultState, action: CategoryReducerActions): CategoryState {

    switch (action.type) {
        case EnumCategoryReducer.CREATE_CATEGORY: {
            const {typeRow}: any = action.payload as keyof TableEntity
            console.log(typeRow)
            console.log()
            const rowItemArray: Array<Item> = TableCreatorMokData[typeRow].row.map((column): Item => {
                    return {
                        typeColumn: column.typeColumn,
                        wasEdit: false,
                        value: '',
                    }
                }
            )

            const row: RowItem = {
                id: Date.now(),
                toDelete: false,
                wasEdit: false,
                columns: [...rowItemArray]
            }

            return {
                ...state,
                storage: {
                    ...state.storage,
                    [typeRow]: {
                        ...state.storage[typeRow],
                        isNew: {
                            ...state.storage[typeRow].isNew,
                            data: [...state.storage[typeRow].isNew.data, row]
                        }
                    }
                }
            }
        }


        case EnumCategoryReducer.CHANGE_CATEGORY: {
            const {value, id, typeRows, typeColumn, status} = action.payload
            const oldData = state.storage[typeRows][status].data
            const indexRow = findIndexById<RowItem>(oldData, id)
            const oldRow = oldData.filter(obj => obj.id === id)[0]
            const oldColumn = oldRow.columns.filter(column => column.typeColumn === typeColumn)[0]
            const indexOldColumn = oldRow.columns.findIndex(column => column.typeColumn === typeColumn)
            // debugger
            const changedColumn = {
                ...oldColumn,
                value,
            }
            const changedRow = {
                ...oldRow,
                columns: [...oldRow.columns.slice(0, indexOldColumn), changedColumn, ...oldRow.columns.slice(indexOldColumn + 1)]
            }
            console.log(changedRow)
            const changedData = [...oldData.slice(0, indexRow), changedRow, ...oldData.slice(indexRow + 1)]

            return {
                ...state,
                storage: {
                    ...state.storage,
                    [typeRows]: {
                        ...state.storage[typeRows],
                        [status]: {
                            ...state.storage[typeRows][status],
                            data: changedData
                        }
                    }
                }
            }
        }


//         case EnumCategoryReducer.DELETE_CATEGORY: {
//             const {value, id, typeRow} = action.payload
//             if (typeof value !== "boolean") {
//                 throw new Error(' EnumCategoryReducer.DELETE_CATEGORY must be boolean')
//             }
//             const index = state.storage[typeRow].data.findIndex(obj => obj.id === id)
//             const oldObj = state.storage[typeRow].data.filter(obj => obj.id === id)[0]
//             const changedObj = {
//                 ...oldObj,
//                 toDelete: value,
//             }
//             const testIndex = findIndexById<Item>(state.storage[typeRow].data, id)
//             console.log(testIndex)
//             const newArr: Array<Item> = [...state.storage[typeRow].data.slice(0, index), changedObj, ...state.storage[typeRow].data.slice(index + 1)]
//             return {
//                 ...state,
//                 storage: {
//                     ...state.storage,
//                     [EnumTypeCategory.newCategory]: {
//                         ...[state.storage[EnumTypeCategory.newCategory]][0],
//                         data: newArr
//                     },
//                 }
//             }
//         }
        default:
            return state
    }
}


export const createNewRow = (typeRow: string) => ({
    type: EnumCategoryReducer.CREATE_CATEGORY,
    payload: {typeRow}
})
export const changeCategory = (recruitment: IOnChange) => ({
    type: EnumCategoryReducer.CHANGE_CATEGORY,
    payload: recruitment
})
export const deleteCategory = (recruitment: IOnClick) => ({
    type: EnumCategoryReducer.DELETE_CATEGORY,
    payload: recruitment
})


export const setCategory = (categories = []) => ({type: SET_CATEGORIES, payload: categories})
export const bulkDeleteCategories = (arrOfId: any) => ({type: BULK_DELETE_CATEGORY, payload: arrOfId})
export const cleanCategories = () => ({type: CLEAN_NEW_CATEGORY})
export const editOldCategory = (recruitment: any) => ({type: EDIT_OLD_CATEGORY, payload: recruitment})


function getProperty<Context, K extends keyof Context>(obj: Context, key: K): Context[K] {
    console.log(typeof key)
    return obj[key];
}