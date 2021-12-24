import React, {ReactNode, useEffect, useMemo, useState} from 'react';
import cl from './TableLine.module.scss'
import {IOnChange, LineContent} from "./LineContext";
import {ITableInput, TableInput} from "../elements/TableInput/TableInput";
import {ITableHeader, TableHeader} from "../TableHeader/TableHeader";
import {useForceUpdate} from "../../../hooks/hooks";
import {EnumStatus, EnumTypeRows, Item, RowItem} from "../../../types/categoryReducerTypes";
import {ITableBtn, TableLineBtn} from "../elements/TableLineBtn/TableLineBtn";

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
    typeRows?: EnumTypeRows,
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
         status,
     }) => {
        const forceUpdate = useForceUpdate();
        // const localReduxObjectState = useTypedSelector(state => state.category.storage.newCategory.data[index])
        const [rowState, setRowState] = useState<RowItem>()
        console.log(rowState)
        useEffect(() => {
            setRowState(outerReduxObjState)
            // if (localReduxObjectState) {
            //     setState(localReduxObjectState)
            // } else if (outerReduxObjState) {
            //     setState(outerReduxObjState)
            // } else {
            //     throw new Error('TableLine немає states')
            // }
        }, [outerReduxObjState])

    const lineColor = useMemo(() => {
        if (isNew) {
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

