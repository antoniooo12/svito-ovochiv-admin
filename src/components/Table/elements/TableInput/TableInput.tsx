import React, {ChangeEvent, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {HeaderContent} from "../../TableHeader/TableHeaderContext";
import {LineContent} from "../../TableLine/LineContext";
import {ListContent} from "../../TableList/ListContext";
import cl from './TableInput.module.scss'
import {TableDataList} from "./TableDataList/TableDataList";
import isEqual from "react-fast-compare";
import {useEffectSkipMount} from "../../../../hooks/hooks";
import {TypeColumn} from "../../../../types/TableCreatorTypes";
import {Item} from "../../../../types/categoryReducerTypes";
import {Simulate} from "react-dom/test-utils";


export enum EnumInput {
    string = 'string',
    number = 'number',
}

export interface ITableInput {
    dropDownList?: any,
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
         dropDownList,
         typeInput,
         typeColumn,
         placeholder,
         width,
         filterBy,
         isMother,
     }) => {


        const {isHeader} = useContext(HeaderContent)
        const {onChange, rowState, isNew, status, id} = useContext(LineContent)
        const {enteredDropDownList, typeTable} = useContext(ListContent)

        const [value, setValue] = useState<string>('')

        //
        if ( !rowState ||  !id || !typeTable || !status || !onChange || !typeColumn) {
            debugger
                throw new Error('Уупс!');
        }
        const state = useMemo<Item>((): Item => {
            // debugger
            return   rowState.columns[index]
        }, [rowState])
        useEffect(() => {
            ///??? питання
            if (state && typeof state.value === typeof value) {
                debugger
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
            // debugger
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


        const isInputDisable = useMemo(() => {
            console.log(isNew)
            if ( status === 'isNew') {
                return false
            }else if( status === 'isAll' ) {
                return true
            }
        }, [isNew, state && state.wasEdit])

        const isShowDataList = useMemo(() => {
            return !isMother
        }, [])


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
                            // list={`${typeColumn} + ${state && id}`}
                            type={typeInput}
                        />
                        {isShowDataList &&
                            <TableDataList
                                link={`${typeColumn} `}
                                // exampleFilter={filterByExample}
                                filterBy={filterBy}
                                type={typeColumn}
                                data={datalist}
                            />
                        }
                    </>
                    : <div>{children}</div>}
            </div>
        );
    }, isEqual);
