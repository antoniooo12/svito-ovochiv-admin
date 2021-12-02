import React, {useContext} from 'react';
import cl from './TableSubCategory.module.scss'
import {HeaderContent} from "../../TableHeader/TableHeaderContext";

const TableSubCategory = ({onChange, tempId, children}) => {
    const {isHeader} = useContext(HeaderContent)

    return (
        <>
            {isHeader !== true?    <input
                onChange={(e) =>
                    onChange({e, tempId})}
                placeholder={'підкатегорія'}
                className={cl.wrapper}
            />:
            <div className={cl.wrapper}>{children}</div>}
        </>


    );
};

export {TableSubCategory};