import {ColumnReduxStructure, Line, TableEntityStructure} from "../../../types/categoryReducerTypes";
import React from "react";
import {orderTableStructureMock} from "../../../mockData/orderPageMock";
import {TypeColumn} from "../../../types/TableCreatorTypes";

export function addNewProduct(productList: TableEntityStructure, setProductList: React.Dispatch<React.SetStateAction<TableEntityStructure>>) {
    setProductList(prevState => {
        const rowItemArray: ColumnReduxStructure = Object.keys(orderTableStructureMock.row).reduce((accumulator: ColumnReduxStructure, key) => {
            accumulator[key as TypeColumn] = {
                typeColumn: key as TypeColumn,
                id: '__00__' + Date.now(),
                value: '',
                wasEdit: false,
            }
            return accumulator
        }, {})
        const row: Line = {
            id: '__00__' + Date.now(),
            toDelete: false,
            wasEdit: false,
            columns: rowItemArray
        }
        return {
            ...prevState,
            isNew: {
                ...prevState.isNew,
                data: [...prevState.isNew.data, row]
            }
        }

    })
}
