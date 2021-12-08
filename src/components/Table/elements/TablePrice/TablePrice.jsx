import React, {useContext, useEffect, useState} from 'react';
import cl from './TablePrice.module.scss'
import {HeaderContent} from "../../TableHeader/TableHeaderContext";
import {LineContent} from "../../TableLine/LineContext";

const TablePrice = ({children}) => {
    const {isHeader} = useContext(HeaderContent)
    const {id, onChange, states} = useContext(LineContent)
    const [title, setTitle] = useState('')

    useEffect(() => {
        if (states) {
            setTitle(states.price)
        }
    }, [states.price])
    return (
        <>{isHeader !== true
            ? <input onChange={(e) =>
                onChange({value: e.target.value, selected: e.target.placeholder, id})} type={'number'}
                     placeholder={'ціна'}
                     value={title}
                     className={cl.wrapper} min="0"/>
            : <div className={cl.wrapper}>
                {children}
            </div>

        }
        </>

    );
};

export {TablePrice};