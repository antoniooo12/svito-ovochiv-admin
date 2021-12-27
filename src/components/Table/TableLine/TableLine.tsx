import React, {ReactNode, useEffect, useMemo, useState} from 'react';
import cl from './TableLine.module.scss'
import {IOnChange, LineContent} from "./LineContext";
import {ITableInput, TableInput} from "../elements/TableInput/TableInput";
import {ITableHeader, TableHeader} from "../TableHeader/TableHeader";
import {useForceUpdate} from "../../../hooks/hooks";
import {EnumStatus, RowItem} from "../../../types/categoryReducerTypes";
import {ITableBtn, TableLineBtn} from "../elements/TableLineBtn/TableLineBtn";
import {TypeColumn, TypeTable} from "../../../types/TableCreatorTypes";

interface ITableLineComposition {
    Header: React.FC<ITableHeader>,
    Input: React.FC<ITableInput>,
    Btn: React.FC<ITableBtn>,
}

type ITableLine = {
    index: number,
    id: number | string,
    outerReduxObjState: RowItem,
    isNew?: boolean,
    onChange?: ({}: IOnChange) => void,
    typeTable?: TypeTable,
    typeRows?: TypeColumn,
    children?: ReactNode,
    status?: keyof typeof EnumStatus,

}


const TableLine: React.FC<ITableLine> & ITableLineComposition =
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
        const rowState:RowItem = useMemo((): RowItem => {
            return outerReduxObjState
        }, [outerReduxObjState])


    const lineColor = useMemo(() => {
        if (status === EnumStatus.isNew) {
            if (index % 2 === 0) {
                return cl.LineDontSaveNew
            } else {
                return cl.LineDontSaveNew2
            }
        } else {
            if (index % 2 === 0) {
                return cl.LineDontSaveOld
            } else {
                return cl.LineDontSaveOld2
            }
        }
    }, [index, isNew])

    return (<LineContent.Provider
        value={{
            id,
            rowState,
            isNew,
            onChange,
            typeRows,
            wasEdit: false,
            forceUpdate,
            status,
        }}>
        <div
            className={[cl.wrapper, lineColor, rowState && rowState.toDelete && cl.toDelete,].join(' ')}>
            {children}
        </div>
    </LineContent.Provider>);
};

TableLine.Header = TableHeader


TableLine.Input = TableInput
TableLine.Btn = TableLineBtn

// TableLine.Select = TableSelect
// TableLine.Number = TableNumber

// TableLine.Checkbox = TableCheckbox
// TableLine.Delete = TableDelete
// TableLine.Edit = TableEdit


export {TableLine}

