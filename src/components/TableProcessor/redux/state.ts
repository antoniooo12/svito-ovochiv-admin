
import produce, {enableMapSet} from "immer";
import {EnumTableReducer, Item, TableColumn, TableReducerActions, TableState} from "../types/TableReducerTypes";
import {v4 as uuidv4} from 'uuid';

const defaultState: TableState = {
    storage: {isAll: {data: []}, isNew: {data: []}}
}

export function tableStoreReducer(state: TableState = defaultState, action: TableReducerActions) {
    enableMapSet()
    switch (action.type) {
        case EnumTableReducer.createLine: {
            const {lineStructure} = action.payload
            console.log(lineStructure)
            const columns = Object.keys(lineStructure).reduce((accumulator: TableColumn, key) => {
                if (!accumulator.has(key)) {
                    return accumulator.set(key,
                        {
                            id: uuidv4(),
                            typeColumn: key,
                            wasEdit: false,
                            value: '',
                        })
                }
                return accumulator
            }, new Map<string, Item>())

            return produce(state, draft => {
                draft.storage.isNew.data.push({
                    id: uuidv4(),
                    wasEdit: false,
                    columns: columns,
                    toDelete: false
                })
            })
        }

        case EnumTableReducer.changeColumn: {
            const {lineId, typeColumn, value, status, dependentColumns, ...a} = action.payload
            console.log(lineId, typeColumn, value, status, dependentColumns)
            console.log(status)
            console.log(state.storage)
            const line = state.storage[status].data.find(line => line.id === lineId)?.columns
            const column = line?.get(typeColumn) as Item
            return produce(state, draft => {
                draft.storage[status].data.find(line => line.id === lineId)?.columns.set(typeColumn, {
                    ...column,
                    wasEdit: true,
                    value: value,
                })
            })
        }
        default:
            return state

    }

}
