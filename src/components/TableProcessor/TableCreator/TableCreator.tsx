import React, {useCallback, useEffect} from 'react';
import {Provider, useDispatch} from "react-redux";
import {tableStore} from "../redux";
import Immutable from "immutable";
import {TableHeader} from "../TableHeader/TableHeader";
import {DataEntitiesTableStructure} from "../../../types/TableCreatorTypes";
import {useActionsTable} from "../hooks/useActionTable";
import {TableLinesCreator} from "../TableLine/TableLineCreator/TableLinesCreator";
import {useTableTypedSelector} from "../hooks/useTableTypedSelector";
import {TTableLine} from "../types/TableReducerTypes";


type TableCreator = {
    tableViewStructure: DataEntitiesTableStructure
    modifyActions?: {
        createLine: () => {}
    }
}


const TableCreator: React.FC<TableCreator> = ({ tableViewStructure}) => {
    const {tableCreateLine} = useActionsTable()
    const dispatch = useDispatch()
    const {storage} = useTableTypedSelector(state => state.tableStore)
    const createLine = useCallback(() => {

    }, [])

    return (
        <>
            <TableHeader header={tableViewStructure.header} params={tableViewStructure.columnParams}/>
            <TableLinesCreator
                lines={storage}
                columnParams={tableViewStructure.columnParams}
                lineParams={tableViewStructure.row}
            />
        </>
    );
};

export {TableCreator};