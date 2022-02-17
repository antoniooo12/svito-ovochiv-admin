import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {TableHeader} from "../TableHeader/TableHeader";
import {DataEntitiesTableStructure} from "../../../types/TableCreatorTypes";
import {TableLinesCreator} from "../TableLine/TableLineCreator/TableLinesCreator";
import {useTableTypedSelector} from "../hooks/useTableTypedSelector";
import {EternalActions} from "../TableShield/TableShield";
import {useKeyCreateLine} from "../hooks/useKeyCreateLine";
import {useExternalActions} from "../hooks/useExternalActions";


type TableCreator = {
    tableViewStructure: DataEntitiesTableStructure
    modifyActions?: {
        createLine: () => {}
    },
    setActions?: React.Dispatch<React.SetStateAction<EternalActions>>
}


const TableCreator: React.FC<TableCreator> = ({tableViewStructure, setActions}) => {
    // const {tableCreateLine} = useActionsTable()
    const dispatch = useDispatch()
    const {storage} = useTableTypedSelector(state => state.tableStore)
    const externalActions = useExternalActions()
    // const {tableCreateLine} = useBindTable(mockNewSubcategory)
    useEffect(() => {
        // console.log(actions?.addLine)
        if (setActions) {
            setActions(prevState => {
                return {
                    ...prevState,
                    ...externalActions,
                }
            })
        }

    }, [])
    useKeyCreateLine()


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