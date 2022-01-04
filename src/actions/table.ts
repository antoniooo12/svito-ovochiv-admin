import Axios from "../core/axios";
import {TypeTable} from "../types/TableCreatorTypes";
import {Dispatch} from "redux";
import {CategoryReducerActions, RowItem} from "../types/categoryReducerTypes";
import axios from "../core/axios";

interface SaveTable {
    behavior: TypeTable,
    allToDelete: Array<RowItem>,
    newToServer: Array<RowItem>,
}

export const saveTable = (
    {
        behavior,
        allToDelete,
        newToServer
    }: SaveTable): any => {
    return async (dispatch: Dispatch<CategoryReducerActions>) => {
        try {
            const newLines = {s: [1, 2]}
            const res = await axios.post(`/api/table/${behavior}`, {newLines})
        } catch (e) {
            console.log(e)
        }
    }
}