import axios from "../core/axios";
import {TypeTable} from "../types/TableCreatorTypes";
import {Dispatch} from "redux";
import {CategoryReducerActions, ColumnReduxStructure, RowsToChosenTable} from "../types/categoryReducerTypes";
import {setCategories} from "../reducer/tableReducer";


interface SaveTable {
    behavior: TypeTable,
    allToDelete: Array<any>,
    newToServer: Array<ColumnReduxStructure>,
    allToUpdate: Array<ColumnReduxStructure>,
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

            const res = await axios.post(`/api/goods/table`,
                {behavior, allToDelete, newToServer, allToUpdate})
        } catch (e) {
            console.log(e)
        }
    }
}
export const getAllRowsByTableName = ({behavior}: { behavior: TypeTable }) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const response = await axios.get(`/api/goods/table`, {
                params: {
                    typeTable: behavior
                },
            })

            const toUI = response.data



            const temp: RowsToChosenTable = {rowItem: toUI, typeTable: behavior}

            dispatch(setCategories(temp))

        } catch (e) {
            console.log(e)
        }
    }
}