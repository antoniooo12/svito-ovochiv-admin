import Axios from "../core/axios";
import {TypeTable} from "../types/TableCreatorTypes";
import {Dispatch} from "redux";
import {
    CategoryReducerActions,
    ColumnReduxStructure,
    Item,
    Line,
    RowsToChosenTable,
    SetCategories
} from "../types/categoryReducerTypes";
import axios from "../core/axios";
import {setCategories} from "../reducer/tableReducer";
// import {AllData} from "../mokData";
import {log} from "util";

interface SaveTable {
    behavior: TypeTable,
    allToDelete: Array<any>,
    newToServer: Array<ColumnReduxStructure>,
    allToUpdate: Array<Line>,
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
export const getAllRowsByTableName = ({behavior}: { behavior: TypeTable }) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const response = await axios.get(`/api/goods/table`, {
                params: {
                    typeTable: behavior
                }
            })

            const toUI = response.data as Item[][]
            await setTimeout(() => {
                console.log(toUI)
            }, 200);


            const temp: RowsToChosenTable = {rowItem: toUI, typeTable: behavior}
            console.log(temp)
            // dispatch(setCategories(temp))

        } catch (e) {
            console.log(e)
        }
    }
}