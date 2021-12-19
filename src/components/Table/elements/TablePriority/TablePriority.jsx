import React, {useContext, useEffect, useState} from 'react';
import cl from "../TableSubCategory/TableSubCategory.module.scss";
import {HeaderContent} from "../../TableHeader/TableHeaderContext";
import {LineContent} from "../../TableLine/LineContext";
import isEqual from "react-fast-compare";

const TablePriorityInner = ({children}) => {
    const {isHeader} = useContext(HeaderContent)
    const {id, onChange, states} = useContext(LineContent)
    const [title, setTitle] = useState('')

    useEffect(() => {
        if (states) {
            setTitle(states.subcategory)
        }
    }, [states.subcategory])

    return (
        <>
            {isHeader !== true ? <input
                    value={title}
                    onChange={(e) =>
                        onChange({value: e.target.value, selected: e.target.placeholder, id})}
                    type={'number'}
                    min="0"
                    placeholder={'пріорітет'}
                    className={cl.wrapper}
                /> :
                <div className={cl.wrapper}>{children}</div>}
        </>
    );
};

export const TablePriority = React.memo(TablePriorityInner,isEqual)
