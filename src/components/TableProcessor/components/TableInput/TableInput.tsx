import React, {ChangeEvent, useCallback, useContext, useEffect, useState} from 'react';
import {Item} from "../../types/TableReducerTypes";
import {ColumnParam, EnumInput, InputParams} from "../../../../types/TableCreatorTypes";
import cl from './TableInput.module.scss'
import clsx from "clsx";
import {useActionsTable} from "../../hooks/useActionTable";
import {LineContext} from "../../TableLine/TableLine/TableLineContext";
import {useEffectSkipMount} from "../../../../hooks/hooks";

type TableInput = {
    column: Item
    columnParam: ColumnParam
    inputParams: InputParams
}

const initials: { [name in EnumInput]: string | number | boolean } = {
    [EnumInput.text]: '',
    [EnumInput.number]: 0,
    [EnumInput.checkbox]: false,
    [EnumInput.select]: '',
}
const TableInput: React.FC<TableInput> = ({column, columnParam, inputParams}) => {
    const initial = initials[inputParams.typeInput]
    const {changeColumn} = useActionsTable()
    const {status, lineId} = useContext(LineContext)
    const [value, setValue] = useState<typeof initial>(inputParams.defaultState || initial)


    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }, [])

    useEffectSkipMount(() => {
        changeColumn({lineId: lineId, typeColumn: column.typeColumn, status: status, value})
    }, [value])
    return (
        <div className={clsx({[cl.wrapper]: true})} style={{width: `${columnParam.width}px`}}>
            {typeof value === 'string' &&
                <input
                    value={value}
                    onChange={onChange}
                    type={inputParams.typeInput}
                />
            }
        </div>
    );
};

export {TableInput};