import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {HeaderContent} from "../../TableHeader/TableHeaderContext";
import {LineContent} from "../../TableLine/LineContext";
import {ListContent} from "../../TableList/ListContext";
import cl from './TableInput.module.scss'
import {TableDataList} from "./TableDataList/TableDataList";
import isEqual from "react-fast-compare";
import {useEffectSkipMount} from "../../../../hooks/hooks";
import {EnumTableEntity} from "../../../../types/categoryReducerTypes";

export interface ITableInput {
    dropDownList?: any,
    type?: EnumTableEntity,
    placeholder?: string,
    width?: number,
    filterBy?: EnumTableEntity,
}

export const TableInput: React.FC<ITableInput> = React.memo(({
                                                                 children,
                                                                 dropDownList,
                                                                 type,
                                                                 placeholder,
                                                                 width,
                                                                 filterBy,
                                                             }) => {




    const {isHeader} = useContext(HeaderContent)
    const {onChange, states, isNew, typeRow} = useContext(LineContent)
    const {isMother = {}, enteredDropDownList} = useContext(ListContent)

    const [title, setTitle] = useState<string>('')

    // const filterByExample = useMemo(() => {
    //     if (filterBy && states && states[filterBy]) {
    //         return states[filterBy]
    //     }
    // }, [states && filterBy && states[filterBy], filterBy])

    const isVisibleHeader = useMemo(() => {
        return isHeader !== true && true
    }, [isHeader])

    const setTitleCallback = useCallback((e) => {
        setTitle(e.target.value)
    }, [])

    useEffect(() => {
        if (states && typeof states.value === "string") {
            setTitle(states.value)
        }
    }, [])

    const datalist = useMemo(() => {
        if (enteredDropDownList && type && enteredDropDownList[type]) {
            return enteredDropDownList[type]
        }
        return []
    }, [dropDownList])


    const isInputDisable = useMemo(() => {
        if (states) {
            return !(isNew === true || states.wasEdit === true)
        }
    }, [isNew, states && states.wasEdit])

    const isShowDataList = useMemo(() => {
        return type && !isMother[type]
    }, [])

    useEffectSkipMount(() => {
        if (states && !isHeader && isNew || states && states.wasEdit) {
            typeRow && onChange && onChange({value: title, id: states.id, typeRow: typeRow})
        }
    }, [title])

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
                        list={`${type} + ${states && states.id}`}
                    />
                    {isShowDataList &&
                        <TableDataList
                            link={`${type} + ${states && states.id}`}
                            // exampleFilter={filterByExample}
                            filterBy={filterBy}
                            type={type}
                            data={datalist}
                        />
                    }
                </>
                : <div>{children}</div>}
        </div>
    );
}, isEqual);
