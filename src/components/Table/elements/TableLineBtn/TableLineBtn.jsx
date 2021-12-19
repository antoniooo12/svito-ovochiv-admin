import React, {memo, useCallback, useContext, useEffect, useState} from 'react';
import cl from './TableLineBtnInner.module.scss'
import {LineContent} from "../../TableLine/LineContext";
import isEqual from "react-fast-compare";

const TableLineBtn = React.memo(({icon, onClick, type}) => {
    const {id, isNew, wasEdit} = useContext(LineContent)
    let {tableBtnFunctions} = useContext(LineContent)
    const [isActive, setIsActive] = useState(false)


    const setIsActiveCallback = useCallback(() => {
        setIsActive(!isActive)
    }, [isActive])

    useEffect(() => {
        onClick  &&   onClick({id, isNew, isActive})
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
