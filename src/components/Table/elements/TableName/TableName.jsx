import React, {createContext, useContext, useEffect, useState} from 'react';
import cl from './TableName.module.scss'
import {HeaderContent} from "../../TableHeader/TableHeaderContext";
import {LineContent} from "../../TableLine/LineContext";

const TableName = ({children}) => {
    const {isHeader} = useContext(HeaderContent)
    const {id, states, onChange} = useContext(LineContent)
    const [title, setTitle] = useState('')
    useEffect(() => {
        if (states) {
            setTitle(states.productName)
        }
    }, [states.productName])
    return (
        <>
            {
                isHeader !== true ? <input
                    value={title}
                    onChange={(e) =>
                        onChange({value: e.target.value, selected: e.target.placeholder, id})}
                    placeholder={'назва'}
                    className={cl.wrapper}
                /> : <div className={[cl.wrapper, cl.wrapperHeader].join(' ')}>  {children}</div>
            }
        </>

    )

};

export {TableName};