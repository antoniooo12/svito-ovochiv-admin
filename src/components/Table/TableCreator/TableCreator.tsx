import React from 'react';
import cl from './TableCreator.module.scss'
import {TableList} from "../TableList/TableList";
import {TableHeader} from '../TableHeader/TableHeader';
import {TableLine} from "../TableLine/TableLine";
import {EnumStatus, TableEntityStructure} from "../../../types/categoryReducerTypes";
import {IOnChange} from "../TableLine/LineContext";
import {TypeColumn, TypeTable} from "../../../types/TableCreatorTypes";

interface column {
    column: Array<{ width: number }>
}

interface TableCreator {
    typeTable?: TypeTable,
    actions: {
        onChange: ({}: IOnChange) => void,
    }
    params: {
        column: Array<{ width: number }>,
        header: Array<{ title: string }>,
        row: Array<{ typeColumn: TypeColumn, typeInput: string, placeholder: string, isMother: boolean }>,
    },
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
                                    isNew={true}
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
                                        />
                                    )}
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