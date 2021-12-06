import React, {useContext} from 'react';
import cl from './TableCheckbox.module.scss'
import {LineContent} from "../../TableLine/LineContext";
const TableCheckbox = ({onChange, onClick}) => {
    const {id} = useContext(LineContent)

    return (
        <input onChange={(e)=>onChange({e, id})}
               className={cl.wrapper}  type="checkbox" />
            );
};

export default TableCheckbox;