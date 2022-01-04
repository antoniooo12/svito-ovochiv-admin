import React, {ChangeEvent, useCallback, useMemo} from 'react';
import isEqual from "react-fast-compare";
import {TypeColumn} from "../../../../types/TableCreatorTypes";
import {RowItem} from "../../../../types/categoryReducerTypes";
import {useTypedSelector} from "../../../../hooks/hooks";
import {DropDownListItem} from "../TableInput/TableInput";

export interface ITableSelect {
    setValue: (event: string) => void,
    typeColumn: TypeColumn,
}

const TableSelect: React.FC<ITableSelect> = React.memo(({typeColumn, setValue}) => {
    const dataDropDownList: Array<RowItem> = useTypedSelector(state => state.tableReducer.storage[typeColumn].isAll.data)

    const dropDownList: DropDownListItem[] = useMemo(() => {
        return dataDropDownList.map(row => {
            return {
                id: row.columns[0].id,
                value: row.columns[0].value as string,
                dependencyId: row.columns[0].dependencyId,
            }
        })
    }, [dataDropDownList])
    const setTitleCallback = useCallback((event: ChangeEvent<HTMLSelectElement>): void => {
        setValue(event.target.value)
    }, [])
    return (
        <select onChange={setTitleCallback}>
            {dropDownList
                .map(item => <option
                    >{item.value}</option>
                )}
        </select>
    )
}, isEqual);
export {TableSelect}
