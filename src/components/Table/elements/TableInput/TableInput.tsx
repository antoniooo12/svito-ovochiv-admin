import React, {ChangeEvent, useCallback, useContext, useMemo, useState} from 'react';
import {HeaderContent} from "../../TableHeader/TableHeaderContext";
import {LineContent} from "../../TableLine/LineContext";
import {ListContent} from "../../TableList/ListContext";
import cl from './TableInput.module.scss'
import {TableDataList} from "./TableDataList/TableDataList";
import isEqual from "react-fast-compare";
import {useEffectSkipMount} from "../../../../hooks/hooks";
import {TypeColumn} from "../../../../types/TableCreatorTypes";

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
}

export const TableInput: React.FC<ITableInput> = React.memo(
    ({
         children,
         dropDownList,
         typeInput,
         typeColumn,
         placeholder,
         width,
         filterBy,
     }) => {


        const {isHeader} = useContext(HeaderContent)
        const {onChange, states, isNew, status, id} = useContext(LineContent)
        const {isMother = {}, enteredDropDownList, typeTable} = useContext(ListContent)

        const [value, setValue] = useState<string>('')

        if (!id || !typeTable || !status  || !onChange ) {
            throw new Error(`Error in TableInput ${id}`)
        }

        // useEffect(() => {
        //     if (states && typeof states.value === "string") {
        //         setValue(states.value)
        //     }
        // }, [states])

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
            if (states) {
                return !(isNew === true || states.wasEdit === true)
            }
        }, [isNew, states && states.wasEdit])

        const isShowDataList = useMemo(() => {
            return typeColumn && !isMother[typeColumn]
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
                            list={`${typeColumn} + ${states && id}`}
                            type={typeInput}
                        />
                        {isShowDataList &&
                            <TableDataList
                                link={`${typeColumn} + ${states && id}`}
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
