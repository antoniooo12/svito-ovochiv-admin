import {IOnChange} from "../components/Table/TableLine/LineContext";
import {
    CategoryReducerActions,
    CategoryState,
    EnumCategoryReducer,
    Item,
    RowItem,
    RowsToSelectedTable,
    TableEntity
} from "../types/categoryReducerTypes";
import {IOnClick} from "../types/TableBtnTypes";
import {findIndexById, getIdFromValueString} from "./helpers/helper";
import {DataEntitiesCatalog, TableCreatorMokData} from "../mokData";
import {TypeTable} from "../types/TableCreatorTypes";

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
            //AllCategories
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

            const typeTable: any = action.payload




            const rowItemArray: Array<Item> = TableCreatorMokData[typeTable as TypeTable].row.map((column): Item => {
                    return {
                        id: Date.now(),
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
                    [typeTable]: {
                        ...state.storage[typeTable],
                        isNew: {
                            ...state.storage[typeTable].isNew,
                            data: [...state.storage[typeTable].isNew.data, row]
                        }
                    }
                }
            }
        }


        case EnumCategoryReducer.CHANGE_CATEGORY: {
            const {value, id, typeTable, typeColumn, status} = action.payload
            const oldData = state.storage[typeTable][status].data
            const indexRow = findIndexById<RowItem>(oldData, id)
            const oldRow = oldData.filter(obj => obj.id === id)[0]
            const oldColumn = oldRow.columns.filter(column => column.typeColumn === typeColumn)[0]
            const indexOldColumn = oldRow.columns.findIndex(column => column.typeColumn === typeColumn)
            // debugger

            const {
                pulledId,
                separatedValue
            }: { pulledId?: number, separatedValue?: string } = getIdFromValueString(value)


            const changedColumn = {
                ...oldColumn,
                id: pulledId && pulledId,
                value: separatedValue ? pulledId + ": " + separatedValue.trim() : value,
            }

            const changedRow = {
                ...oldRow,
                columns: [...oldRow.columns.slice(0, indexOldColumn), changedColumn, ...oldRow.columns.slice(indexOldColumn + 1)]
            }
            const changedData = [...oldData.slice(0, indexRow), changedRow, ...oldData.slice(indexRow + 1)]

            return {
                ...state,
                storage: {
                    ...state.storage,
                    [typeTable]: {
                        ...state.storage[typeTable],
                        [status]: {
                            ...state.storage[typeTable][status],
                            data: changedData
                        }
                    }
                }
            }
        }

        case EnumCategoryReducer.SET_CATEGORIES: {
            const {typeTable, rowItem} = action.payload
            return {
                ...state,
                storage: {
                    ...state.storage,
                    [typeTable]: {
                        ...state.storage[typeTable],
                        isAll: {
                            ...state.storage[typeTable].isAll,
                            data: rowItem
                        }
                    }
                }
            }
        }

        case EnumCategoryReducer.DELETE_CATEGORY: {
            const {id, typeTable, rowStatus} = action.payload
            const editRows = state.storage[typeTable][rowStatus].data
            const index = editRows.findIndex(obj => obj.id === id)
            const oldObj = editRows.find(obj => obj.id === id)
            if (!oldObj) {
                throw new Error('Cant find old object in Delete')
            }
            const changedObj = {
                ...oldObj,
                toDelete: !oldObj.toDelete,
            }
            const changedRows = [...editRows.slice(0, index), changedObj, ...editRows.slice(index + 1)]
            console.log(editRows)

            return {
                ...state,
                storage: {
                    ...state.storage,
                    [typeTable]: {
                        ...state.storage[typeTable],
                        [rowStatus]: {
                            ...state.storage[typeTable][rowStatus],
                            data: changedRows
                        }
                    }
                }
            }
        }

        case EnumCategoryReducer.EDIT_CATEGORY: {
            const {id, typeTable, rowStatus} = action.payload
            const editRows = state.storage[typeTable][rowStatus].data
            const index = editRows.findIndex(obj => obj.id === id)
            const oldObj = editRows.find(obj => obj.id === id)

            if (!oldObj) {
                throw new Error('Cant find old object in Delete')
            }

            const changedObj = {
                ...oldObj,
                wasEdit: !oldObj.wasEdit,
            }
            const changedRows = [...editRows.slice(0, index), changedObj, ...editRows.slice(index + 1)]
            console.log(editRows)

            return {
                ...state,
                storage: {
                    ...state.storage,
                    [typeTable]: {
                        ...state.storage[typeTable],
                        [rowStatus]: {
                            ...state.storage[typeTable][rowStatus],
                            data: changedRows
                        }
                    }
                }
            }
        }
        default:
            return state
    }
}


export const createNewRow = (recruitment: TypeTable) => ({
    type: EnumCategoryReducer.CREATE_CATEGORY,
    payload: recruitment
})
export const changeCategory = (recruitment: IOnChange) => ({
    type: EnumCategoryReducer.CHANGE_CATEGORY,
    payload: recruitment,
})
export const deleteCategory = (recruitment: IOnClick) => ({
    type: EnumCategoryReducer.DELETE_CATEGORY,
    payload: recruitment,
})
export const setCategories = (recruitment: RowsToSelectedTable) => ({
    type: EnumCategoryReducer.SET_CATEGORIES,
    payload: recruitment,
})
export const editCategory = (recruitment: IOnClick) => ({
    type: EnumCategoryReducer.EDIT_CATEGORY,
    payload: recruitment,
})

export const bulkDeleteCategories = (arrOfId: any) => ({type: BULK_DELETE_CATEGORY, payload: arrOfId})
export const editOldCategory = (recruitment: any) => ({type: EDIT_OLD_CATEGORY, payload: recruitment})


function getProperty<Context, K extends keyof Context>(obj: Context, key: K): Context[K] {
    return obj[key];
}