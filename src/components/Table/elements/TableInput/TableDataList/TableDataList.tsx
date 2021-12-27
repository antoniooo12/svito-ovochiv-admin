import React, {useContext, useEffect, useMemo, useState} from 'react';
import isEqual from "react-fast-compare";
import {LineContent} from "../../../TableLine/LineContext";
import {TypeColumn} from "../../../../../types/TableCreatorTypes";
import {DropDownListItem} from "../TableInput";
import {Item} from "../../../../../types/categoryReducerTypes";

interface ITableDataList {
    link: string,
    dropDownList: DropDownListItem[],
    filterByColumn?: TypeColumn,
}

const TableDataList: React.FC<ITableDataList> = ({link, dropDownList, filterByColumn}) => {
    const {rowState} = useContext(LineContent)

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
