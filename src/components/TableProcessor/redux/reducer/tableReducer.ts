import {LineStructure} from "../../../../types/TableCreatorTypes";
import {EnumTableReducer} from "../../types/TableReducerTypes";
import {IOnChangeColumn} from "../../types/actions";


export const tableCreateLine = (lineStructure: LineStructure) => ({
    type: EnumTableReducer.createLine,
    payload: {lineStructure: lineStructure}
})


export const changeColumn = (requirement: IOnChangeColumn) => ({
    type: EnumTableReducer.changeColumn,
    payload: requirement
})