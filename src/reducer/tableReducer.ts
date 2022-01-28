import {IOnChange} from "../components/Table/TableLine/LineContext";
import {
    CategoryReducerActions,
    CategoryState,
    ColumnReduxStructure,
    EnumCategoryReducer,
    Line,
    RowsToChosenTable,
    TableEntity
} from "../types/categoryReducerTypes";
import {IOnClick} from "../types/TableBtnTypes";
import {findIndexById, separateString} from "./helpers/helper";
import {DataColumn, DataEntitiesCatalog, dependentsIdMok, TableCreatorMokData} from "../mokData";
import {TypeColumn, TypeGoodsTable, TypeTable} from "../types/TableCreatorTypes";


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


const defaultState: CategoryState = {
    storage: {
        ...implementedTableEntities
    }
}


export default function tableReducer(state: CategoryState = defaultState, action: CategoryReducerActions): CategoryState {

    switch (action.type) {
        case EnumCategoryReducer.CREATE_CATEGORY: {
            const typeTable: any = action.payload
            const rowItemArray: ColumnReduxStructure =
                Object.keys(TableCreatorMokData[typeTable as TypeGoodsTable].row).reduce((accumulator: ColumnReduxStructure, key) => {
                        const generateDependents = dependentsIdMok.get(key as TypeColumn) && dependentsIdMok.get(typeTable)
                            ?.reduce((accumulator: { [key: string]: number }, dependentId) => {
                                accumulator[dependentId] = -1
                                return accumulator
                            }, {})
                        console.log(generateDependents)
                        if (typeof key === typeTable) {
                            accumulator[key as TypeColumn] = {
                                id: '__00__' + Date.now(),
                                typeColumn: key as TypeColumn,
                                wasEdit: false,
                                value: '',
                            }
                        } else {
                            accumulator[key as TypeColumn] = {
                                typeColumn: key as TypeColumn,
                                wasEdit: false,
                                value: '',
                            }
                        }
                        return accumulator
                    }
                    , {})

            const row: Line = {
                id: '__00__' + Date.now(),
                toDelete: false,
                wasEdit: false,
                columns: rowItemArray
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
            const indexRow = findIndexById<Line>(oldData, id)
            const oldLine = oldData.find(obj => obj.id === id) as Line
// debugger

            const oldColumn = oldLine.columns[typeColumn]
            // const indexOldColumn = oldRow.columns.findIndex(column => column.typeColumn === typeColumn)
            // debugger

            const generateDependents = dependentsIdMok.get(typeColumn) && dependentsIdMok.get(typeColumn)
                ?.reduce((accumulator: { [key: string]: number }, dependentId) => {
                    accumulator[dependentId] = -1
                    return accumulator
                }, {})
            const changedColumn = {
                ...oldColumn,
                // ...generateDependents,
                id: Number(separateString(value, ':', 0)) ? Number(separateString(value, ':', 0)) : oldColumn?.id,
                value: separateString(value, ':', 1) && separateString(value, ':', 1),
                wasEdit: true,
                dependencyId: generateDependents,
            }
            const changedLine: Line = {
                ...oldLine,
                columns: {
                    ...oldLine.columns,
                    [typeColumn]: changedColumn,
                }
            }

            const changedData = [...oldData.slice(0, indexRow), changedLine, ...oldData.slice(indexRow + 1)]
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
            const lines: Line & any = serverToApp(rowItem)
            setTimeout(() => {
            }, 1000);
            return {
                ...state,
                storage: {
                    ...state.storage,
                    [typeTable]: {
                        ...state.storage[typeTable],
                        isAll: {
                            ...state.storage[typeTable].isAll,
                            data: lines
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
        case EnumCategoryReducer.DELETE_ALL_NEW_INSTANCE: {
            const {typeTable} = action.payload
            return {
                ...state,
                storage: {
                    ...state.storage,
                    [typeTable]: {
                        ...state.storage[typeTable],
                        isNew: {
                            forceRender: 0,
                            data: []
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
export const setCategories = (recruitment: RowsToChosenTable) => ({
    type: EnumCategoryReducer.SET_CATEGORIES,
    payload: recruitment,
})
export const editCategory = (recruitment: IOnClick) => ({
    type: EnumCategoryReducer.EDIT_CATEGORY,
    payload: recruitment,
})
export const deleteAllNewInstance = (recruitment: { typeTable: TypeTable }) => ({
    type: EnumCategoryReducer.DELETE_ALL_NEW_INSTANCE,
    payload: recruitment,
})


function serverToApp(array: any[]) {
    return array.map(row => {
        // @ts-ignore
        const rowToRedux = row.reduce((accumulator: any, dbTable, index) => {
            const otherColumns = Object.keys(dbTable).filter(param => Object.keys(DataColumn).includes(param))
            console.log(dbTable)
            const generateDependents = dependentsIdMok.get(dbTable.typeColumn) && dependentsIdMok.get(dbTable.typeColumn)
                ?.reduce((accumulator: { [key: string]: number }, dependentId) => {
                    accumulator[dependentId] = dbTable.dependencyId[dependentId]
                    return accumulator
                }, {})
            if (otherColumns.length > 0) {


                const column = {
                    value: dbTable.value,
                    typeColumn: dbTable.typeColumn as TypeColumn,
                    id: dbTable.id,
                    wasEdit: false,
                    // [dbTable]: dbTable.dependencyId ? dbTable.dependencyId : -1,
                    dependencyId: generateDependents,
                }
                accumulator[column.typeColumn] = column
                const subTables = otherColumns.map(columnName => {
                    accumulator[columnName] = {
                        value: dbTable[columnName],
                        typeColumn: columnName as TypeColumn,
                        id: -1 - index,
                        dependencyId: generateDependents,
                    }
                })
            } else {
                const column = {
                    value: dbTable.value,
                    typeColumn: dbTable.typeColumn as TypeColumn,
                    id: dbTable.id,
                    wasEdit: false,
                    // dependencyId: dbTable.dependencyId ? dbTable.dependencyId : -1,
                    dependencyId: generateDependents,


                }
                accumulator[column.typeColumn] = column
            }
            return accumulator
        }, {})

        return {
            id: row[0].id,
            columns: rowToRedux,
            wasEdit: false,
            toDelete: false,
        }
    })
}

// export const bulkDeleteCategories = (arrOfId: any) => ({type: BULK_DELETE_CATEGORY, payload: arrOfId})
// export const editOldCategory = (recruitment: any) => ({type: EDIT_OLD_CATEGORY, payload: recruitment})




