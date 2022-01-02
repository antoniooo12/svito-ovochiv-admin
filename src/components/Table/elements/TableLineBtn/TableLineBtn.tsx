import React, {ReactNode, useCallback, useContext, useState} from 'react';
import cl from './TableLineBtnInner.module.scss'
import {LineContent} from "../../TableLine/LineContext";
import isEqual from "react-fast-compare";
import {useEffectSkipMount} from "../../../../hooks/hooks";
import {EnumTableBtn, IOnClick} from "../../../../types/TableBtnTypes";
import {ListContent} from "../../TableList/ListContext";


export interface ITableBtn {
    icon?: ReactNode,
    onClick: ({}: IOnClick) => void,
    type: EnumTableBtn,
}

const TableLineBtn: React.FC<ITableBtn> = React.memo(({icon, onClick, type}) => {
    const {id, status} = useContext(LineContent)
    const {typeTable} = useContext(ListContent)
    const [isActive, setIsActive] = useState(false)

    if (!id || !typeTable || !status) {
        throw new Error()
    }

    return (
        <div
            onClick={() => onClick({id, typeTable, rowStatus: status})}
            className={cl.wrapper}
        >
            {icon}
        </div>
    );
}, isEqual);
export {TableLineBtn}
// export const TableLineBtn = React.memo(TableLineBtnInner,isEqual)
