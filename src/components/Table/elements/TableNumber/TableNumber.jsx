import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {HeaderContent} from "../../TableHeader/TableHeaderContext";
import {LineContent} from "../../TableLine/LineContext";
import cl from "../TablePrice/TablePrice.module.scss";
import isEqual from "react-fast-compare";

const TableNumberInner = ({children, placeholder, type}) => {
    const {isHeader} = useContext(HeaderContent)
    const {id, onChange, states, isNew} = useContext(LineContent)
    const [title, setTitle] = useState('')

    useEffect(() => {
        if (states[type]) {
            setTitle(states[type])
        }
    }, [states])
    const isInputDisable = useMemo(() => {
        return !(isNew === true || states.wasEdit === true)
    }, [isNew, states.wasEdit])
    useEffect(() => {
        if (!isHeader && isNew || states.wasEdit) {
            onChange({type, value: title, id, isNew})
        }
    }, [title])
    const setTitleCallback = useCallback((e) => {
        setTitle(e.target.value)
    }, [])
    return (
        <div className={cl.wrapper}>
            <>{isHeader !== true
                ? <input
                    type={'number'}
                    disabled={isInputDisable}
                    onChange={setTitleCallback}
                    placeholder={placeholder}
                    value={title}
                    className={cl.wrapper} min="0"/>
                : < >
                    {children}
                </>

            }
            </>
        </div>
    );
};

export const TableNumber = React.memo(TableNumberInner,isEqual);