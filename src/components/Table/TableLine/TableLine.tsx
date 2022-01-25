import React, {ReactNode, useMemo} from 'react';
import {IOnChange, LineContent} from "./LineContext";
import {ITableInput, TableInput} from "../elements/TableInput/TableInput";
import {ITableHeader, TableHeader} from "../TableHeader/TableHeader";
import {EnumStatus, Line} from "../../../types/categoryReducerTypes";
import {ITableBtn, TableLineBtn} from "../elements/TableLineBtn/TableLineBtn";
import {TypeColumn, TypeTable} from "../../../types/TableCreatorTypes";
import {ITableSelect, TableSelect} from "../elements/TableSelect/TableSelect";
import {TableLineView} from "./TableLineView";
import fastDeepEqual from 'fast-deep-equal'
import isEqual from "react-fast-compare";
import {useForceUpdate} from "../../../hooks/hooks";

interface ITableLineComposition {
    Header: React.FC<ITableHeader>,
    Input: React.FC<ITableInput>,
    Btn: React.FC<ITableBtn>,
    Select: React.FC<ITableSelect>,
}

type ITableLine = {
    index: number,
    id: number | string,
    outerReduxObjState: Line,
    isNew?: boolean,
    onChange?: ({}: IOnChange) => void,
    typeTable: TypeTable,
    typeRows?: TypeColumn,
    children?: ReactNode,
    status: keyof typeof EnumStatus,

}


const TableLine: ITableLineComposition & React.FC<ITableLine> =
    ({
         children,
         index,
         id,
         outerReduxObjState,
         isNew,
         onChange,
         typeRows,
         typeTable,
         status,
     }) => {
        const forceUpdate = useForceUpdate();
        const rowState: Line = useMemo((): Line => {
            return outerReduxObjState
        }, [outerReduxObjState])

        return (<LineContent.Provider
            value={{
                id: rowState.id,
                rowState,
                isNew,
                onChange,
                typeRows,
                wasEdit: false,
                status,
                typeTable,
                forceUpdate,
            }}>

            <TableLineView
                status={status}
                index={index}>
                {children}
            </TableLineView>


        </LineContent.Provider>);
    }

TableLine.Header = TableHeader
TableLine.Input = TableInput
TableLine.Btn = TableLineBtn
TableLine.Select = TableSelect


export {TableLine}

