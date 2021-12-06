import React, {useContext} from 'react';
import cl from './TableSubCategory.module.scss'
import {HeaderContent} from "../../TableHeader/TableHeaderContext";
import {LineContent} from "../../TableLine/LineContext";

const TableSubCategory = ({onChange,  children}) => {
    const {isHeader} = useContext(HeaderContent)
    const {id} = useContext(LineContent)

    return (
        <>
            {isHeader !== true?    <input
                onChange={(e) =>
                    onChange({e, id})}
                placeholder={'підкатегорія'}
                className={cl.wrapper}
            />:
            <div className={cl.wrapper}>{children}</div>}
        </>


    );
};

export {TableSubCategory};