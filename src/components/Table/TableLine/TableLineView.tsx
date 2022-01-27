import React, {useContext, useMemo} from 'react';
import {EnumStatus} from "../../../types/categoryReducerTypes";
import cl from "./TableLine.module.scss";
import {LineContent} from "./LineContext";
import clsx from "clsx";
import isEqual from "react-fast-compare";

type TableLineView = {
    index: number
    status: keyof typeof EnumStatus
}
const TableLineView: React.FC<TableLineView> = ({children, index, status}) => {
    const {rowState, isNew} = useContext(LineContent)

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
    return (
        <div
            className={clsx(cl.wrapper, lineColor, {[cl.toDelete]: rowState.toDelete})}
            // className={[cl.wrapper, lineColor, rowState && rowState.toDelete && cl.toDelete,].join(' ')}
        >
            {children}
        </div>
    );
}

export {TableLineView};