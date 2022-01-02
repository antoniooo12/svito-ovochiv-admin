import React from 'react';
import cl from './TableCreator.module.scss'
import {TableList} from "../TableList/TableList";
import {TableHeader} from '../TableHeader/TableHeader';
import {TableLine} from "../TableLine/TableLine";
import {EnumStatus, TableEntityStructure} from "../../../types/categoryReducerTypes";
import {IOnChange} from "../TableLine/LineContext";
import {DataEntitiesTableStructure, TypeTable} from "../../../types/TableCreatorTypes";
import {IconTrash} from "../../UI/icons/Trash/Trash";
import {EnumTableBtn, IOnClick} from "../../../types/TableBtnTypes";
import {IconNotePencil} from "../../UI/icons/NotePencil/IconNotePencil";

interface column {
    column: Array<{ width: number }>
}

interface TableCreator {
    typeTable?: TypeTable,
    actions: {
        onChange: ({}: IOnChange) => void,
        onDelete: ({}: IOnClick) => void,
    }
    params: DataEntitiesTableStructure,
    data: TableEntityStructure,
}

const TableCreator: React.FC<TableCreator> = ({params, data, actions, typeTable}) => {
    return (
        <div className={cl.wrapper}>
            <TableList
                typeTable={typeTable}
            >
                <TableHeader>
                    {params.header.map((el, index) =>
                        <div style={{width: `${params.column[index].width}px`}}>
                            {el.title}
                        </div>
                    )}
                </TableHeader>
                {
                    Object.keys(EnumStatus).map(status =>
                        data[status as EnumStatus].data.map((row, index) => {
                            return (
                                <TableLine
                                    typeTable={typeTable}
                                    index={index}
                                    id={row.id}
                                    outerReduxObjState={row}
                                    key={row.id}
                                    onChange={actions.onChange}
                                    status={status as EnumStatus}
                            >
                                    {params.row.map((column, index) =>
                                        <TableLine.Input
                                            index={index}
                                            isMother={column.isMother}
                                            width={params.column[index].width}
                                            typeColumn={column.typeColumn}
                                            placeholder={column.placeholder}
                                            filterByColumn={column.filterByColumn}
                                        />
                                    )}
                                    <TableLine.Btn
                                        icon={<IconTrash/>}
                                        onClick={actions.onDelete}
                                        type={EnumTableBtn.delete}
                                    />
                                    {EnumStatus.isAll === status &&
                                        <TableLine.Btn
                                            icon={<IconNotePencil/>}
                                            onClick={actions.onDelete}
                                            type={EnumTableBtn.delete}
                                        />
                                    }
                                </TableLine>
                            )
                        })
                    )

                }
            </TableList>
        </div>
    );
};

export {TableCreator};