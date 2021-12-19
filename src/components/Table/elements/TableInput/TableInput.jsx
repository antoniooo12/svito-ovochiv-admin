import React, {useContext, useEffect, useState, memo, useMemo, useCallback} from 'react';
import {HeaderContent} from "../../TableHeader/TableHeaderContext";
import {LineContent} from "../../TableLine/LineContext";
import {ListContent} from "../../TableList/ListContext";
import cl from './TableInput.module.scss'
import {TableDelete} from "../TableDelete/TableDelete";
import {TableDataList} from "./TableDataList/TableDataList";
import isEqual from "react-fast-compare";

const TableInput = React.memo(({children, dropDownList, type, placeholder, width, filterBy}) => {
    const childrenMemo = useMemo(() => {
        return children
    }, [children])

    const {isHeader} = useContext(HeaderContent)
    const {id, onChange, states, isNew} = useContext(LineContent)
    const {isMother = {}, enteredDropDownList} = useContext(ListContent)

    const [title, setTitle] = useState('')

    const filterByExample = useMemo(() => {
        return states[filterBy]
    }, [states[filterBy], filterBy])

    const isVisibleHeader = useMemo(() => {
        return isHeader !== true && true
    }, [isHeader])

    const setTitleCallback = useCallback((e) => {
        setTitle(e.target.value)
    }, [])

    useEffect(() => {
        if (states[type]) {
            setTitle(states[type])
        }
    }, [states])

    const datalist = useMemo(() => {
        if (enteredDropDownList && enteredDropDownList[type]) {
            return enteredDropDownList[type]
        }
        return []
    }, [dropDownList])

    useEffect(() => {
        if (!isHeader && isNew || states.wasEdit) {
            onChange({type, value: title, id, isNew})
        }
    }, [title])

    const isInputDisable = useMemo(() => {
        return !(isNew === true || states.wasEdit === true)
    }, [isNew, states.wasEdit])

    const isShowDataList = useMemo(() => {
        console.log(isMother)
        return !isMother[type]
    }, [])


    return (
        <div style={{width: `${width}px`}}
             className={cl.wrapper}
        >
            {isVisibleHeader ?
                <>
                    <input

                        value={title}

                        onChange={setTitleCallback}
                        disabled={isInputDisable}
                        placeholder={placeholder}
                        list={type + states.id.toString()}
                    />
                    {isShowDataList &&
                        <TableDataList
                            link={type + states.id.toString()}
                            exampleFilter={filterByExample}
                            filterBy={filterBy}
                            type={type}
                            data={datalist}
                        />
                    }
                </>
                : <div>{childrenMemo}</div>}
        </div>
    );
}, isEqual);

export const TableInputMemoized = React.memo(TableInput, isEqual);