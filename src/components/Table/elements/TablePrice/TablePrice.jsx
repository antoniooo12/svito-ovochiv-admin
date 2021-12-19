import React, {useContext, useEffect, useState} from 'react';
import cl from './TablePrice.module.scss'
import {HeaderContent} from "../../TableHeader/TableHeaderContext";
import {LineContent} from "../../TableLine/LineContext";
import isEqual from "react-fast-compare";

const TablePriceInner = ({children, placeholder}) => {
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
            ? <input
                onChange={(e) => setTitle(e.target.value)}
                placeholder={placeholder}
                value={title}
                className={cl.wrapper} min="0"/>
            : <div className={cl.wrapper}>
                {children}
            </div>

        }
        </>

    );
};

export const TablePrice = React.memo(TablePriceInner,isEqual);