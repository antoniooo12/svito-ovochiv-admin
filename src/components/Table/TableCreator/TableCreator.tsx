import React from 'react';
import cl from './TableCreator.module.scss'
import {TableList} from "../TableList/TableList";
import {TableHeader} from '../TableHeader/TableHeader';
import {TableLine} from "../TableLine/TableLine";
import {EnumStatus, EnumTypeRows, Item, TableEntityStructure} from "../../../types/categoryReducerTypes";
import {IOnChange} from "../TableLine/LineContext";

interface column {
    column: Array<{ width: number }>
}

interface TableCreator {
    typeRows?: EnumTypeRows,
    actions: {
        onChange: ({}: IOnChange) => void,
    }
    params: {
        column: Array<{ width: number }>,
        header: Array<{ title: string }>,
        row: Array<{ typeColumn: EnumTypeRows, typeInput: string, placeholder: string, isMother: boolean }>,
    },
    data: TableEntityStructure,
}

const TableCreator: React.FC<TableCreator> = ({params, data, actions, typeRows}) => {
    return (
        <div className={cl.wrapper}>
            <TableList>
                <TableHeader>
                    {params.header.map((el, index) =>
                        <div style={{width: `${params.column[index].width}px`}}>
                            {el.title}
                        </div>
                    )}
                </TableHeader>
                {Object.keys(EnumStatus).map(status =>
                    data[status as EnumStatus].data.map((row, index) => {
                        return (
                            <TableLine
                                typeRows={typeRows}
                                isNew={true}
                                index={index}
                                id={row.id}
                                outerReduxObjState={row}
                                key={row.id}
                                onChange={actions.onChange}
                                status={status as EnumStatus}
                            >
                                {params.row.map((templateRow, index) =>
                                    <TableLine.Input
                                        width={params.column[index].width}
                                        typeColumn={templateRow.typeColumn}
                                        placeholder={templateRow.placeholder}
                                    />
                                )}
                            </TableLine>
                        )
                    })
                )}
            </TableList>
        </div>
    );
};

export {TableCreator};