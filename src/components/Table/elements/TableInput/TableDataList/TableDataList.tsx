import React, {useContext, useMemo} from 'react';
import {LineContent} from "../../../TableLine/LineContext";
import {TypeColumn, TypeColumnId, TypeTable} from "../../../../../types/TableCreatorTypes";
import {DropDownListItem} from "../TableInput";
import {Item, Line} from "../../../../../types/categoryReducerTypes";
import {useTypedSelector} from "../../../../../hooks/hooks";
import {ColumnToColumnId, dependentsIdMok} from "../../../../../mokData";

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
            console.log(item)
            // const dependentsId = dependentsIdMok.get(item.typeColumn)?.reduce((accumulator: any, dependentId) => {
            //     accumulator[dependentId] = item[dependentId]
            //     return accumulator
            // }, {})
            return {
                id: row.id,
                value: item.value as string,
                dependencyId: item.dependencyId
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
        console.log(filterById)
        console.log(filterByColumn)
        if (filterByColumn && filterById) {
            return dropDownList.filter(item => {
                if (!item.dependencyId) {
                    throw new Error('none dependencyId')
                }
                const itemId =  item.dependencyId[ColumnToColumnId[filterByColumn as TypeTable]]
                if(itemId.toString() === filterById.toString()) {
                    return item
                }
            })
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
