import React, {ChangeEvent, useCallback, useEffect, useMemo, useState} from 'react';
import isEqual from "react-fast-compare";
import {TypeColumn} from "../../../../types/TableCreatorTypes";
import {Line} from "../../../../types/categoryReducerTypes";
import {
    useEffectSkipAll,
    useEffectSkipMount,
    useForceUpdate,
    useForceUpdateALl,
    useTypedSelector
} from "../../../../hooks/hooks";
import {DropDownListItem} from "../TableInput/TableInput";

export interface ITableSelect {
    setValue: (event: string) => void,
    typeColumn: TypeColumn,
    value: string,
}

const TableSelect: React.FC<ITableSelect> = ({typeColumn, setValue, value}) => {
    const dataDropDownList: Array<Line> = useTypedSelector(state => state.tableReducer.storage[typeColumn].isAll.data)
    const {forceUpdate} = useForceUpdateALl()
    const dropDownList: DropDownListItem[] = useMemo(() => {
        return dataDropDownList.map(row => {
            const item = row.columns[typeColumn]
            if (!item) {
                throw  new Error()
            }
            return {
                id: row.id,
                value: item.value as string,
                dependencyId: item.dependencyId,
            }
        })
    }, [dataDropDownList])


    useEffect(() => {
        setValue(dropDownList.length > 0 ? `${dropDownList[0].id}:${dropDownList[0].value}` : '')
    }, [dropDownList])

    const setTitleCallback = useCallback((event: ChangeEvent<HTMLSelectElement>): void => {
        setValue(event.target.value)
    }, [])

    return (
        <select value={value} onChange={setTitleCallback}>
            <option selected>тип</option>
            {dropDownList
                .map(item => <option
                    >{item.id}:{item.value}</option>
                )}
        </select>
    )
}
export {TableSelect}
