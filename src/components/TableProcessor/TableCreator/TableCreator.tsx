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
    useEffect(() => {
        const onKeyDown = (event: any) => {
            keysPressed[event.code] = true;
        }
        const onKeyUp = (event: any) => {
            if (keysPressed['AltLeft'] && event.code === 'KeyA') {
                console.log('s')
                tableCreateLine(tableViewStructure.row)
            }
            delete keysPressed[event.code];
        }
        let keysPressed: any = {};
        window.addEventListener('keydown', onKeyDown)
        window.addEventListener('keyup', onKeyUp)
        return () => {
            window.removeEventListener('keydown', onKeyDown)
            window.removeEventListener('keyup', onKeyUp)

        }
    }, [])
    return (
        <>
            <TableHeader header={tableViewStructure.header} params={tableViewStructure.columnParams}/>
            <TableLinesCreator lines={storage} columnParams={tableViewStructure.columnParams} inputParams={tableViewStructure.row} />
        </>
    );
};

export {TableCreator};