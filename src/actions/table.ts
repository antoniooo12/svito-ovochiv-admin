import Axios from "../core/axios";
import {TypeTable} from "../types/TableCreatorTypes";
import {Dispatch} from "redux";
import {CategoryReducerActions, RowItem} from "../types/categoryReducerTypes";
import axios from "../core/axios";

interface SaveTable {
    behavior: TypeTable,
    allToDelete: Array<RowItem>,
    newToServer: Array<RowItem>,
    allToUpdate: Array<RowItem>,
}

export const saveTable = (
    {
        behavior,
        allToDelete,
        newToServer,
        allToUpdate,
    }: SaveTable): any => {
    return async (dispatch: Dispatch<CategoryReducerActions>) => {
        try {

            console.log(newToServer)
            const res = await axios.post(`/api/goods/table`,
                {behavior, allToDelete, newToServer, allToUpdate})
        } catch (e) {
            console.log(e)
        }
    }
}