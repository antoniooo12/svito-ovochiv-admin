import React, {ChangeEvent, useCallback, useContext, useEffect, useMemo} from 'react';
import {TypeColumn} from "../../../../types/TableCreatorTypes";
import {Line} from "../../../../types/categoryReducerTypes";
import {useForceUpdateALl, useTypedSelector} from "../../../../hooks/hooks";
import {DropDownListItem} from "../TableInput/TableInput";
import {LineContent} from "../../TableLine/LineContext";

export interface ITableSelect {
    setValue: (event: string) => void,
    typeColumn: TypeColumn,
    value: string,
    disabled?: boolean,
}

const TableSelect: React.FC<ITableSelect> = ({typeColumn, setValue, value, disabled}) => {
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
            }
        })
    }, [dataDropDownList])


    useEffect(() => {
        // if () {
            setValue(dropDownList.length > 0 ? `${dropDownList[0].id}:${dropDownList[0].value}` : '')
        // }
    }, [])

    const setTitleCallback = useCallback((event: ChangeEvent<HTMLSelectElement>): void => {
        setValue(event.target.value)
    }, [])

    return (
        <select
            value={value}
            onChange={setTitleCallback}
            disabled={disabled}
        >
            <option selected>тип</option>
            {dropDownList
                .map(item => <option
                    >{item.id}:{item.value}</option>
                )}
        </select>
    )
}
export {TableSelect}
