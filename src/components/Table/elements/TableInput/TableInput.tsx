import React, {ChangeEvent, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {HeaderContent} from "../../TableHeader/TableHeaderContext";
import {LineContent} from "../../TableLine/LineContext";
import {ListContent} from "../../TableList/ListContext";
import cl from './TableInput.module.scss'
import globalCl from '../../../../globalStyles.module.scss';
import {TableDataList} from "./TableDataList/TableDataList";
import isEqual from "react-fast-compare";
import {useEffectSkipMount, useTypedSelector} from "../../../../hooks/hooks";
import {EnumInput, EnumStyles, InputParams, TypeColumn} from "../../../../types/TableCreatorTypes";
import {EnumStatus, Item, RowItem} from "../../../../types/categoryReducerTypes";
import {Simulate} from "react-dom/test-utils";
import clsx from "clsx";
import {TableSelect} from "../TableSelect/TableSelect";


export interface DropDownListItem {
    value: string,
    id: string | number,
    dependencyId?: number | string | undefined
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
    [EnumInput.text]: 's',
    [EnumInput.number]: 0,
    [EnumInput.checkbox]: true,
    [EnumInput.select]: 'вибрати',
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
     }) => {


        const {isHeader} = useContext(HeaderContent)
        const {onChange, rowState, isNew, status, id, forceUpdate} = useContext(LineContent)
        const {typeTable} = useContext(ListContent)
        const initial = initials[typeInput]

        const [value, setValue] = useState<typeof initial>(initial)

        if (!rowState || !id || !typeTable || !status || !onChange || !typeColumn) {
            throw new Error('Уупс!');
        }

        const state = useMemo<Item>((): Item => {
            return rowState.columns.filter(item => item.typeColumn === typeColumn)[0]
        }, [rowState])

        useEffect(() => {
            if (state && typeof state.value === typeof value) {
                setValue(state.value as typeof value)
            }
        }, [state])

        const isVisibleHeader = useMemo(() => {
            return isHeader !== true && true
        }, [isHeader])

        const setTitleCallback = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
            if (typeof value === "string") {
                setValue(event.target.value)
            } else if (typeof value === "number") {
                setValue(Number(event.target.value))
            } else if (typeof value === "boolean") {
                setValue(event.target.checked)
            }
            console.log(typeof value)
        }, [value])


        const isInputDisable = useMemo(() => {
            if (!rowState.toDelete && rowState.wasEdit || status === 'isNew') {
                return false
            }
            if (rowState.toDelete || status === 'isAll'  ) {
                return true
            }

        }, [isNew, rowState && rowState.wasEdit, rowState.toDelete])


        useEffectSkipMount(() => {
                onChange({value: value, id, typeTable: typeTable, typeColumn, status})
        }, [value])


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
                        {inputParams.typeInput === EnumInput.select &&
                            <TableSelect
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
                            <label>
                                <input
                                    checked={value}
                                    onChange={setTitleCallback}
                                    onClick={forceUpdate}
                                    disabled={isInputDisable}
                                    placeholder={placeholder}
                                    list={`${typeColumn} + ${state && id}`}
                                    type={typeInput}
                                />
                                <span>продається</span>
                            </label>
                        }
                        {isDropDownList &&
                            <TableDataList
                                link={`${typeColumn} + ${state && id}`}
                                typeColumn={typeColumn}
                                filterByColumn={filterByColumn}
                            />}

                    </>
                    : <div>{children}</div>}
            </div>
        );
    }, isEqual);
