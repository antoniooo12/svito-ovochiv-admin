import React, {useCallback, useContext} from 'react';
import {IconTrash} from "../../../UI/icons/Trash/Trash";
import {LineContent} from "../../TableLine/LineContext";
import cl from './TableDelete.module.scss'
import isEqual from "react-fast-compare";
const TableDeleteInner = ({onClick}) => {
    const {id, isNew} = useContext(LineContent)
    useCallback()
    return (
        <div className={cl.wrapper} onClick={() => onClick({id, isNew})} id={id}>
            <IconTrash/>
        </div>
    );
};
export const  TableDelete = React.memo(TableDeleteInner,isEqual)
