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

const TableSelect: React.FC<ITableSelect> = React.memo(({typeColumn, setValue, value}) => {
    const dataDropDownList: Array<Line> = useTypedSelector(state => state.tableReducer.storage[typeColumn].isAll.data)
    const {forceUpdate} = useForceUpdateALl()
    const dropDownList: DropDownListItem[] = useMemo(() => {
        return dataDropDownList.map(row => {
            return {
                id: row.columns[0].id,
                value: row.columns[0].value as string,
                dependencyId: row.columns[0].dependencyId,
            }
        })
    }, [dataDropDownList])


    useEffect(() => {
        setValue(dropDownList.length > 0 ? dropDownList[0].value : '')
    }, [dropDownList])
    console.log(dropDownList)
    const setTitleCallback = useCallback((event: ChangeEvent<HTMLSelectElement>): void => {
        setValue(event.target.value)
    }, [])

    return (
        <select value={value} onChange={setTitleCallback}>
            <option selected>тип</option>
            {dropDownList
                .map(item => <option
                    >{item.value}</option>
                )}
        </select>
    )
}, isEqual);
export {TableSelect}
