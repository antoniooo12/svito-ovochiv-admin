import React, {ChangeEvent, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {HeaderContent} from "../../TableHeader/TableHeaderContext";
import {LineContent} from "../../TableLine/LineContext";
import cl from './TableInput.module.scss'
import globalCl from '../../../../globalStyles.module.scss';
import {TableDataList} from "./TableDataList/TableDataList";
import isEqual from "react-fast-compare";
import {useEffectSkipMount} from "../../../../hooks/hooks";
import {
    EnumInput,
    EnumStyles,
    InputParams,
    TypeColumn,
    TypeColumnId,
    TypeTable
} from "../../../../types/TableCreatorTypes";
import {Item} from "../../../../types/categoryReducerTypes";
import clsx from "clsx";
import {TableSelect} from "../TableSelect/TableSelect";
import {TableCheckBox} from "./TableCheckBox/TableCheckBox";


export type DropDownListItem = {
    value: string,
    id: string | number,
    dependencyId?: Record<TypeColumnId, number>
}


export interface ITableInput {
    typeInput: keyof typeof EnumInput,
    placeholder?: string,
    width?: number,
    typeColumn: TypeColumn,
    isMother?: boolean,
    index: number,
    filterByColumn?: TypeColumn,
    isDropDownList: boolean,
    inputParams: InputParams,
}

const initials: { [name in EnumInput]: string | number | boolean } = {
    [EnumInput.text]: '',
    [EnumInput.number]: 0,
    [EnumInput.checkbox]: false,
    [EnumInput.select]: '',
}
export const TableInput: React.FC<ITableInput> = React.memo(
    ({
         children,
         typeInput,
         typeColumn,
         placeholder,
         width,
         filterByColumn,
         isDropDownList,
         inputParams,
         isMother,
     }) => {


        const {isHeader} = useContext(HeaderContent)
        const {onChange, rowState, isNew, status, id, forceUpdate, typeTable} = useContext(LineContent)
        // const {typeTable} = useContext(ListContent)
        const initial = initials[typeInput]

        const [value, setValue] = useState<typeof initial>(inputParams.defaultState || initial)


        const setTitleCallback = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
            if (typeof value === "string") {
                setValue(event.target.value)
            } else if (typeof value === "number") {
                setValue(Number(event.target.value))
            } else if (typeof value === "boolean") {
                setValue(event.target.checked)
            }
        }, [value])
        if (!rowState || !id || !typeTable || !status || !onChange || !typeColumn) {
            throw new Error('Уупс!');
        }
        useEffect(() => {
            onChange({value: value, id: id, typeTable: typeTable, typeColumn, status})
        }, [value])

        const state = useMemo<Item>((): Item => {
            return rowState.columns[typeColumn] as Item
        }, [rowState])


        useEffect(() => {
            if (rowState && typeof state.value === "string" && state.value.length > 0) {
                if (status === 'isAll' || !isMother) {
                    setValue(`${state.id}:${state.value}` as typeof value)
                } else {
                    setValue(`${state.value}` as typeof value)
                }
            } else if (typeof state.value === "number" && state.value > 0) {
                setValue(state.value as typeof value)
            } else if (typeof state.value !== "string" && typeof state.value !== "number") {
                setValue(state.value as typeof value)
            }
        }, [rowState.columns])


        const isVisibleHeader = useMemo(() => {
            return isHeader !== true && true
        }, [isHeader])


        const isInputDisable = useMemo(() => {
            if (!rowState.toDelete && rowState.wasEdit || status === 'isNew') {
                return false
            }
            return true


        }, [isNew, rowState && rowState.wasEdit, rowState.toDelete])





        return (
            <div style={{width: `${width}px`}}
                 className={clsx({
                     [cl.wrapper]: true,
                     [cl.toggleButton]: inputParams.style && inputParams.style.includes(EnumStyles.toggleButton),
                     [globalCl.fontSizeSmall]: inputParams.style && inputParams.style.includes(EnumStyles.fontSizeSmall)
                 })}


            >
                {isVisibleHeader ?
                    <>
                        {inputParams.typeInput === EnumInput.select && typeof value === 'string' &&
                            <TableSelect

                                value={value}
                                setValue={setValue}
                                typeColumn={typeColumn}
                            />
                        }
                        {inputParams.typeInput === EnumInput.number &&
                            <input
                                value={Number(value).toString()}
                                onChange={setTitleCallback}
                                onClick={forceUpdate}
                                disabled={isInputDisable}
                                placeholder={placeholder}
                                list={`${typeColumn} + ${state && id}`}
                                type={typeInput}
                                min={0}
                            />
                        }
                        {inputParams.typeInput === EnumInput.text && typeof value === 'string' &&
                            <input
                                value={value}

                                onChange={setTitleCallback}
                                onClick={forceUpdate}
                                disabled={isInputDisable}
                                placeholder={placeholder}
                                list={`${typeColumn} + ${state && id}`}
                                type={typeInput}
                            />
                        }

                        {inputParams.typeInput === EnumInput.checkbox && typeof value === 'boolean' &&
                            <TableCheckBox
                                setValue={setValue}
                                typeColumn={typeColumn}
                                value={value}
                                onChange={setTitleCallback}
                                onClick={forceUpdate}
                                disabled={isInputDisable}
                                placeholder={placeholder || ''}
                                type={typeInput}
                                inputParams={inputParams}
                                rowState={rowState}
                                state={state}
                                id={id}
                            />
                        }
                        {isDropDownList &&
                            <TableDataList
                                filterByColumn={filterByColumn}
                                link={`${typeColumn} + ${state && id}`}
                                typeColumn={typeColumn}
                            />}

                    </>
                    : <div>{children}</div>}
            </div>
        );
    }, isEqual);
