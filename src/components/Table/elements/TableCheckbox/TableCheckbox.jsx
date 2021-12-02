import React from 'react';
import cl from './TableCheckbox.module.scss'
const TableCheckbox = ({onChange, onClick, tempId}) => {
    return (
        <input onChange={(e)=>onChange({e, tempId})}
               onClick={(e)=>onClick({e, tempId})}
               className={cl.wrapper}  type="checkbox" />
            );
};

export default TableCheckbox;