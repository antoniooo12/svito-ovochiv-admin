import {LineStructure} from "../../../../types/TableCreatorTypes";

import produce, {enableMapSet} from "immer";
import {EnumTableReducer, Item, TableColumn, TableReducerActions, TableState} from "../../types/TableReducerTypes";
import {v4 as uuidv4} from 'uuid';
import {IOnChangeColumn} from "../../types/actions";

const defaultState: TableState = {
    storage: {isAll: {data: []}, isNew: {data: []}}
}

export function tableStoreReducer(state: TableState = defaultState, action: TableReducerActions) {
    enableMapSet()
    switch (action.type) {
        case EnumTableReducer.createLine: {
            const {lineStructure} = action.payload

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
            const {lineId, typeColumn, value, status} = action.payload
            const line = state.storage.isNew.data.find(line => line.id === lineId)?.columns
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


export const tableCreateLine = (lineStructure: LineStructure) => ({
    type: EnumTableReducer.createLine,
    payload: {lineStructure: lineStructure}
})

export const changeColumn = (requirement: IOnChangeColumn) => ({
    type: EnumTableReducer.changeColumn,
    payload: requirement
})