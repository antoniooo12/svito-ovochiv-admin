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
            return {
                id: row.columns[0].id,
                value: row.columns[0].value as string,
                dependencyId: row.columns[0].dependencyId,
            }
        })
    }, [dataDropDownList])


    const state: Item = useMemo(() => {
        return rowState.columns.filter(item => item.typeColumn === filterByColumn)[0]
    }, [rowState])

    const filterById = useMemo(() => {
        return state && state.id
    }, [rowState, state])

    const filteredDropDownList = useMemo(() => {
        if (filterById) {
            return dropDownList.filter(item => item.dependencyId && item.dependencyId.toString() === filterById.toString())
        }
        return dropDownList
    }, [link, dropDownList, filterById])


    return (
        <datalist id={link}>
            {filteredDropDownList
                .map(item => <option
                        value={`${item.id}:  ${item.value}`}
                    />
                )}
        </datalist>
    );
}
export {TableDataList}
