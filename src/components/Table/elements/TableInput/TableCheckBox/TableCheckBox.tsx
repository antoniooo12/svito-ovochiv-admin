import React, {useEffect} from 'react';
import {EnumInput, InputParams, TypeColumn} from "../../../../../types/TableCreatorTypes";
import {Item, Line} from "../../../../../types/categoryReducerTypes";

export type ITableCheckBox = {
    setValue: (event: boolean) => void,
    typeColumn: TypeColumn,
    value: boolean,
    onChange: any
    onClick: any
    disabled: boolean
    placeholder: string
    type: keyof typeof EnumInput
    inputParams: InputParams
    state: Item
    rowState: Line
    id: number | string
}

const TableCheckBox: React.FC<ITableCheckBox> = (
    {
        setValue,
        typeColumn,
        value,
        onChange,
        onClick,
        disabled,
        placeholder,
        type,
        inputParams,
        rowState,
        id,
        state,
    }) => {


    useEffect(() => {
        if (typeof inputParams.defaultState === "boolean") {

            setValue(inputParams.defaultState)
        }
    }, [])
    return (
        <label>
            <input
                checked={value}
                onChange={onChange}
                onClick={onClick}
                disabled={disabled}
                placeholder={placeholder}
                list={`${typeColumn} + ${state && id}`}
                type={type}
            />
            <span>{inputParams.placeholder}</span>
        </label>
    );
};

export {TableCheckBox};