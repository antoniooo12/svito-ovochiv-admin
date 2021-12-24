import React, {memo, ReactNode, useCallback, useContext, useEffect, useState} from 'react';
import cl from './TableLineBtnInner.module.scss'
import {LineContent} from "../../TableLine/LineContext";
import isEqual from "react-fast-compare";
import {useEffectSkipMount, useForceUpdate} from "../../../../hooks/hooks";
import {EnumTableBtn, IOnClick} from "../../../../types/TableBtnTypes";


export interface ITableBtn {
    icon: ReactNode,
    onClick: ({}: IOnClick) => void,
    type: EnumTableBtn,
}

const TableLineBtn: React.FC<ITableBtn> = React.memo(({icon, onClick, type}) => {
    const {id, isNew, wasEdit, typeRow, forceUpdate} = useContext(LineContent)
    const [isActive, setIsActive] = useState(false)


    const setIsActiveCallback = useCallback(() => {
        forceUpdate()
        setIsActive(!isActive)
    }, [isActive])

    useEffectSkipMount(() => {
        if (id && typeRow) {
            onClick && onClick({id, typeRow, value: isActive})
        }
    }, [isActive])

    return (
        <div
            onClick={setIsActiveCallback}
            className={cl.wrapper}
        >
            {icon}
        </div>
    );
}, isEqual);
export {TableLineBtn}
// export const TableLineBtn = React.memo(TableLineBtnInner,isEqual)
