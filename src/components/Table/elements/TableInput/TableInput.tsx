import React, {ChangeEvent, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {HeaderContent} from "../../TableHeader/TableHeaderContext";
import {LineContent} from "../../TableLine/LineContext";
import {ListContent} from "../../TableList/ListContext";
import cl from './TableInput.module.scss'
import {TableDataList} from "./TableDataList/TableDataList";
import isEqual from "react-fast-compare";
import {useEffectSkipMount, useTypedSelector} from "../../../../hooks/hooks";
import {TypeColumn} from "../../../../types/TableCreatorTypes";
import {Item, RowItem} from "../../../../types/categoryReducerTypes";
import {Simulate} from "react-dom/test-utils";

export interface DropDownListItem {
    value: string,
    id: string | number,
    dependencyId?: number | string | undefined
}

export enum EnumInput {
    string = 'string',
    number = 'number',
}

export interface ITableInput {
    typeInput?: keyof typeof EnumInput,
    placeholder?: string,
    width?: number,
    typeColumn: TypeColumn,
    isMother?: boolean,
    index: number,
    filterByColumn?: TypeColumn,
}

export const TableInput: React.FC<ITableInput> = React.memo(
    ({
         index,
         children,
         typeInput,
         typeColumn,
         placeholder,
         width,
         filterByColumn,
         isMother,
     }) => {


        const {isHeader} = useContext(HeaderContent)
        const {onChange, rowState, isNew, status, id, forceUpdate} = useContext(LineContent)
        const {enteredDropDownList, typeTable} = useContext(ListContent)

        const [value, setValue] = useState<string>('')
        if (!rowState || !id || !typeTable || !status || !onChange || !typeColumn) {
            throw new Error('Уупс!');
        }

        const state = useMemo<Item>((): Item => {
            return rowState.columns.filter(item => item.typeColumn === typeColumn)[0]
        }, [rowState])
        const data: Array<RowItem> = useTypedSelector(state => state.tableReducer.storage[typeColumn].isAll.data)

        const dropDownList: DropDownListItem[] | undefined = useMemo(() => {
            if (!isMother)
                return data.map(row => {
                    return {
                        id: row.columns[0].id,
                        value: row.columns[0].value as string,
                        dependencyId: row.columns[0].dependencyId,
                    }
                })
        }, [data])

        console.log(dropDownList)
        useEffect(() => {
            if (state && typeof state.value === typeof value) {
                setValue(state.value as typeof value)
            }
        }, [state])

        const isVisibleHeader = useMemo(() => {
            return isHeader !== true && true
        }, [isHeader])

        const setTitleCallback = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
            setValue(event.target.value)
            console.log(value)
        }, [value])



        const datalist = useMemo(() => {
            if (enteredDropDownList && typeColumn && enteredDropDownList[typeColumn]) {
                return enteredDropDownList[typeColumn]
            }
            return []
        }, [dropDownList])
        console.log(datalist)

        const isInputDisable = useMemo(() => {
            console.log(isNew)
            if (status === 'isNew') {
                return false
            } else if (status === 'isAll') {
                return true
            }
        }, [isNew, state && state.wasEdit])


        useEffectSkipMount(() => {
            if (!isHeader) {
                onChange({value: value, id, typeTable: typeTable, typeColumn, status})
            }
        }, [value])

        // const filteredDropDownList = useMemo(() => {
        //     if (filterById) {
        //         return dropDownList.filter(item => {
        //             if (item.dependencyId && item.dependencyId.toString() === filterById.toString()) {
        //                 return {
        //                     value: item.value,
        //                     id: item.id,
        //                 }
        //             }
        //         })
        //     } else {
        //         return dropDownList
        //     }
        // }, [])
        //



        return (
            <div style={{width: `${width}px`}}
                 className={cl.wrapper}
            >
                {isVisibleHeader ?
                    <>
                        <input
                            value={value}
                            onChange={setTitleCallback}
                            onClick={forceUpdate}
                            disabled={isInputDisable}
                            placeholder={placeholder}
                            list={`${typeColumn} + ${state && id}`}
                            type={typeInput}
                        />
                        {dropDownList &&
                            <TableDataList
                                link={`${typeColumn} + ${state && id}`}
                                dropDownList={dropDownList}
                                filterByColumn={filterByColumn}
                            />
                        }
                    </>
                    : <div>{children}</div>}
            </div>
        );
    }, isEqual);
