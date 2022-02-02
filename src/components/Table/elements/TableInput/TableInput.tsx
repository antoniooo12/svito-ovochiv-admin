import React, {ChangeEvent, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {LineContent} from "../../TableLine/LineContext";
import cl from './TableInput.module.scss'
import globalCl from '../../../../globalStyles.module.scss';
import {TableDataList} from "./TableDataList/TableDataList";
import isEqual from "react-fast-compare";
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
import {useActions} from "../../../../hooks/useActions";
import {useTypedSelector} from "../../../../hooks/hooks";


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
         typeInput,
         typeColumn,
         placeholder,
         width,
         filterByColumn,
         isDropDownList,
         inputParams,
         isMother,
     }) => {

        const {changeCategory} = useActions()
        const {onChange, rowState, isNew, status, id, forceUpdate, typeTable} = useContext(LineContent)
        // const {typeTable} = useContext(ListContent)
        const initial = initials[typeInput]
        const parentName: TypeTable = inputParams.dependent?.local && inputParams.dependent.local.dependentByTable || inputParams.rightTab && inputParams.rightTab.dependentByTable || '' as TypeTable
        const dependParameter: TypeColumn = inputParams.dependent?.local ? inputParams.dependent.local.parameter : '' as TypeColumn
        //від нього залежать
        const dependentTable = useTypedSelector(state => state.tableReducer.tableAdditionalDate)
            .get(parentName)
        const parent = dependentTable?.find(line => line.id === rowState.columns[parentName as TypeColumn]?.id)

        const [value, setValue] = useState<typeof initial>(inputParams.defaultState || initial)

        const [rightTab, setRightTab] = useState('')
        useEffect(() => {

            if (inputParams.rightTab) {
                const localId = rowState.columns[inputParams?.rightTab?.dependentByTable as TypeColumn]?.id
                const dependLine = dependentTable?.find(line => line.id === localId)
                const localValue = dependLine?.columns[inputParams.rightTab.parameter]!.value
                setRightTab(localValue as string)
            }
        }, [rowState.columns])
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
            // onChange({value: value, id: id, typeTable: typeTable, typeColumn, status})

            changeCategory({value: value, id: id, typeTable: typeTable, typeColumn, status})

        }, [value])

        const state = useMemo<Item>((): Item => {
            return rowState.columns[typeColumn] as Item
        }, [rowState])


        useEffect(() => {
            if (inputParams.dependent) {
                const dependValue = parent?.columns[dependParameter]?.value

                setValue(dependValue as typeof value)
            } else if (inputParams.formula) {
                const formula = inputParams.formula.local!.columns.reduce((accumulator: number, el) => {
                    const first = rowState.columns[el.column as TypeColumn]?.value as number
                    const second = rowState.columns[el.onOther as TypeColumn]?.value as number
                    accumulator += el.matchSing(first, second)
                    return accumulator
                }, 0)
                console.log(formula)
                setValue(formula as typeof value)
            } else if (rowState && state && typeof state.value === "string" && state.value.length > 0) {
                if (status === 'isAll' || !isMother) {
                    setValue(`${state.id}:${state.value}` as typeof value)
                } else {
                    setValue(`${state.value}` as typeof value)
                }
            } else if (status && typeof state.value === "number" && state.value > 0) {
                setValue(state.value as typeof value)
            } else if (status && typeof state.value !== "string" && typeof state.value !== "number") {
                setValue(state.value as typeof value)
            }
        }, [rowState.columns])





        const isInputDisable = useMemo(() => {
            return !(!rowState.toDelete && rowState.wasEdit || status === 'isNew');
        }, [isNew, rowState && rowState.wasEdit, rowState.toDelete])





        return (
            <div style={{width: `${width}px`}}
                 className={clsx({
                     [cl.wrapper]: true,
                     [cl.toggleButton]: inputParams.style && inputParams.style.includes(EnumStyles.toggleButton),
                     [globalCl.fontSizeSmall]: inputParams.style && inputParams.style.includes(EnumStyles.fontSizeSmall)
                 })}


            >
                {/*{isVisibleHeader ?*/}
                    <>
                        {inputParams.typeInput === EnumInput.select && typeof value === 'string' &&
                            <TableSelect
                                disabled={isInputDisable}
                                value={value}
                                setValue={setValue}
                                typeColumn={typeColumn}
                            />
                        }
                        {inputParams.typeInput === EnumInput.number &&
                            <>
                                {inputParams.rightTab &&
                                    <div className={cl.rightTab}>
                                        {rightTab}
                                    </div>
                                }
                                <input
                                    className={cl.numberWrapper}
                                    value={Number(value).toString()}
                                    onChange={setTitleCallback}
                                    onClick={forceUpdate}
                                    disabled={isInputDisable}
                                    placeholder={placeholder}
                                    list={`${typeColumn} + ${state && id}`}
                                    type={typeInput}
                                    min={0}
                                />
                            </>
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

            </div>
        );
    }, isEqual);
