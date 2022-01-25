import React, {useContext, useMemo} from 'react';
import {LineContent} from "../../../TableLine/LineContext";
import {TypeColumn} from "../../../../../types/TableCreatorTypes";
import {DropDownListItem} from "../TableInput";
import {Item, Line} from "../../../../../types/categoryReducerTypes";
import {useTypedSelector} from "../../../../../hooks/hooks";

interface ITableDataList {
    link: string,
    dropDownList?: DropDownListItem[],
    filterByColumn?: TypeColumn,
    typeColumn: TypeColumn,
}

const TableDataList: React.FC<ITableDataList> = ({link, typeColumn, filterByColumn}) => {
    // debugger
    const {rowState} = useContext(LineContent)

    const dataDropDownList: Array<Line> = useTypedSelector(state => state.tableReducer.storage[typeColumn].isAll.data)
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
    }, [dataDropDownList, rowState])

    const state = useMemo(() => {
        return filterByColumn && rowState.columns[filterByColumn] as Item
    }, [rowState])

    const filterById = useMemo(() => {
        return state && state.id
    }, [rowState, state, dropDownList])

    const filteredDropDownList = useMemo(() => {
        if (filterByColumn && filterById) {
            return dropDownList.filter(item => item.dependencyId && item.dependencyId.toString() === filterById.toString())
        }
        return dropDownList
    }, [link, dropDownList, filterById])

    return (
        <datalist id={link}>
            {filteredDropDownList
                .map(item => <option
                    key={item.id}
                        value={`${item.id}:  ${item.value}`}
                    />
                )}
        </datalist>
    );
}
export {TableDataList}
