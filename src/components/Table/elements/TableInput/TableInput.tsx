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


export enum EnumInput {
    string = 'string',
    number = 'number',
}

export interface ITableInput {
    typeInput?: keyof typeof EnumInput,
    placeholder?: string,
    width?: number,
    filterBy?: string,
    typeColumn: TypeColumn,
    isMother?: boolean,
    index: number,
}

export const TableInput: React.FC<ITableInput> = React.memo(
    ({
         index,
         children,
         typeInput,
         typeColumn,
         placeholder,
         width,
         filterBy = '',
         isMother,
     }) => {


        const {isHeader} = useContext(HeaderContent)
        const {onChange, rowState, isNew, status, id} = useContext(LineContent)
        const {enteredDropDownList, typeTable} = useContext(ListContent)

        const [value, setValue] = useState<string>('')

        if (!rowState || !id || !typeTable || !status || !onChange || !typeColumn) {

            throw new Error('Уупс!');
        }
        const state = useMemo<Item>((): Item => {
            return rowState.columns[index]
        }, [rowState])
        const data: Array<RowItem> = useTypedSelector(state => state.tableReducer.storage[typeColumn].isAll.data)

        const dropDownList: Array<{ value: string | boolean | number, id: string | number }> = useMemo(() => {
            if (!isMother) {
                return data.map(row => {
                    return {
                        id: row.columns[0].id,
                        value: row.columns[0].value,
                    }
                })
            } else {
                return []
            }
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

        useEffectSkipMount(() => {
            if (!isHeader && isNew) {
               onChange({value: value, id, typeTable: typeTable, typeColumn, status})
            }
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
            if ( status === 'isNew') {
                return false
            }else if( status === 'isAll' ) {
                return true
            }
        }, [isNew, state && state.wasEdit])




        return (
            <div style={{width: `${width}px`}}
                 className={cl.wrapper}
            >
                {isVisibleHeader ?
                    <>
                        <input
                            value={value}
                            onChange={setTitleCallback}
                            disabled={isInputDisable}
                            placeholder={placeholder}
                            list={`${typeColumn} + ${state && id}`}
                            type={typeInput}
                        />
                        {dropDownList.length > 0 &&
                            <TableDataList
                                link={`${typeColumn} + ${state && id}`}
                                dropDownList={dropDownList}
                                filterBy={filterBy}
                            />
                        }
                    </>
                    : <div>{children}</div>}
            </div>
        );
    }, isEqual);
