import React, {createContext, useContext, useEffect} from 'react';
import cl from './TableName.module.scss'
import {HeaderContent} from "../../TableHeader/TableHeaderContext";

const TableName = ({onChange, tempId, children}) => {
    const {isHeader} = useContext(HeaderContent)
    return (
        <>
            {
                isHeader !== true ? <input
                    onChange={(e) =>
                        onChange({e, tempId})}
                    placeholder={'назва'}
                    className={cl.wrapper}
                /> : <div className={[cl.wrapper,cl.wrapperHeader ].join(' ')}>  {children}</div>
            }
        </>

    )

};

export {TableName};