import React, {createContext, useContext, useEffect} from 'react';
import cl from './TableName.module.scss'
import {HeaderContent} from "../../TableHeader/TableHeaderContext";
import {LineContent} from "../../TableLine/LineContext";

const TableName = ({onChange,  children}) => {
    const {isHeader} = useContext(HeaderContent)
    const {id} = useContext(LineContent)
    return (
        <>
            {
                isHeader !== true ? <input
                    onChange={(e) =>
                        onChange({e, id})}
                    placeholder={'назва'}
                    className={cl.wrapper}
                /> : <div className={[cl.wrapper, cl.wrapperHeader].join(' ')}>  {children}</div>
            }
        </>

    )

};

export {TableName};