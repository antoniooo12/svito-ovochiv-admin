import React, {useMemo} from 'react';
import cl from './TableLine.module.scss'
import TableCheckbox from "../elements/TableCheckbox/TableCheckbox";
import {LineContent} from "./LineContext";
import {TableInputMemoized} from "../elements/TableInput/TableInput";
import {TableSelect} from "../elements/TableSelect/TableSelect";
import {TableNumber} from "../elements/TableNumber/TableNumber";
import {TableHeader} from "../TableHeader/TableHeader";
import {TableDelete} from "../elements/TableDelete/TableDelete";
import {TableEdit} from "../elements/TableEdit/TableEdit";
import {TableLineBtn} from "../elements/TableLineBtn/TableLineBtn";
import isEqual from "react-fast-compare";


const TableLine = React.memo(({children, index, id, states, isNew, onChange}) => {
    const childrenMemo = useMemo(() => {
        return children
    }, [children])

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
    const isTodelete = useMemo(() => {
        return states.toDelete
    }, [states.toDelete])
    return (
        <LineContent.Provider value={{id, states, isNew, onChange, wasEdit: false}}>
            <div className={[cl.wrapper,
                lineColor,
                isTodelete && cl.toDelete,
            ].join(' ')}>
                {childrenMemo}
            </div>
        </LineContent.Provider>
    );
}, isEqual);
export {TableLine}

TableLine.Header = TableHeader
TableLine.Checkbox = TableCheckbox
TableLine.Input = TableInputMemoized
TableLine.Select = TableSelect
TableLine.Number = TableNumber
TableLine.Delete = TableDelete
TableLine.Edit = TableEdit
TableLine.Btn = TableLineBtn