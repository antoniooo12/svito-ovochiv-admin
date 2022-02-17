import React from 'react';
import {TableLine} from "./TableLine";
import {EnumStatus, Line} from "../../../types/categoryReducerTypes";
import {DataEntitiesTableStructure, InputParams, TypeColumn, TypeTable} from "../../../types/TableCreatorTypes";
import {IconTrash} from "../../UI/icons/Trash/Trash";
import {EnumTableBtn, IOnClick} from "../../../types/TableBtnTypes";
import {IconNotePencil} from "../../UI/icons/NotePencil/IconNotePencil";
import {IOnChange} from "./LineContext";
import isEqual from "react-fast-compare";

type TableLineCreator = {
    typeTable: TypeTable
    index: number
    row: Line
    params: DataEntitiesTableStructure
    actions: {
        onChange: ({}: IOnChange) => void,
        onDelete: ({}: IOnClick) => void,
        onEdit: ({}: IOnClick) => void,
    }
    status: keyof typeof EnumStatus
}
const TableLineCreator: React.FC<TableLineCreator> = React.memo(({index, row, actions, typeTable, params, status}) => {
    return (
        <TableLine
            typeTable={typeTable}
            index={index}
            id={row.id}
            outerReduxObjState={row}
            onChange={actions.onChange}
            status={status}
        >
            {Object.keys(params.row).map((key, index) => {
                    const column = params.row[key as TypeColumn] as InputParams
                    return (
                        <TableLine.Input
                            index={index}
                            isMother={column.isMother}
                            width={params.columnParams[index].width}
                            typeColumn={column.typeColumn}
                            placeholder={column.placeholder}
                            filterByColumn={column.filterByColumn}
                            isDropDownList={column.isDropDownList}
                            typeInput={column.typeInput}
                            inputParams={column}
                            key={index}
                        />)

                }
            )}
            <TableLine.Btn
                icon={<IconTrash/>}
                onClick={actions.onDelete}
                type={EnumTableBtn.delete}
            />
            {EnumStatus.isAll === status &&
                <TableLine.Btn
                    icon={<IconNotePencil/>}
                    onClick={actions.onEdit}
                    type={EnumTableBtn.delete}
                />
            }
        </TableLine>
    );
},isEqual)

export {TableLineCreator};