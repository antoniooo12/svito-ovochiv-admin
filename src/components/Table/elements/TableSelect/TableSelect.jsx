import React, {memo, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import cl from './TableSelect.module.scss'
import {HeaderContent} from "../../TableHeader/TableHeaderContext";
import {LineContent} from "../../TableLine/LineContext";
import isEqual from "react-fast-compare";

const TableSelect = React.memo(({children, options, type}) => {

    const {isHeader} = useContext(HeaderContent)
    const {id, onChange, states, isNew} = useContext(LineContent)
    const [title, setTitle] = useState('')

    const isInputDisable = useMemo(() => {
        return !(isNew === true || states.wasEdit === true)
    }, [isNew, states.wasEdit])
    const isEdit = useMemo(() => {
        return states.wasEdit
    }, [])

    useEffect(() => {
        if (!isHeader && isNew || isEdit) {
            onChange({type, value: title, id, isNew})
        }
    }, [title])

    const onChangeHandler = useCallback((e) => {
        setTitle(e.target.value)
    })

    return (
        <div className={cl.wrapper}>{isHeader !== true
            ? <select
                onChange={onChangeHandler}
                disabled={isInputDisable}

            >
                {options.map(el =>
                    <option key={el}>{el}</option>
                )}
            </select>
            : < >
                {children}
            </>

        }
        </div>
    );
}, isEqual);
export {TableSelect}
// export const TableSelect = React.memo(TableSelectInner,isEqual);