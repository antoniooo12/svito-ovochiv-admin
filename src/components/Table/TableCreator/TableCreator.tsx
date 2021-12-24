import React from 'react';
import cl from './TableCreator.module.scss'
import {TableList} from "../TableList/TableList";
import {TableHeader} from '../TableHeader/TableHeader';
import {TableLine} from "../TableLine/TableLine";
import {Item} from "../../../types/categoryReducerTypes";
import {IOnChange} from "../TableLine/LineContext";

interface column {
    column: Array<{ width: number }>
}

interface TableCreator {
    actions: {
        onChange: ({}: IOnChange) => void,
    }
    params: {
        column: Array<{ width: number }>
        header: Array<{ title: string }>
        row: Array<{ typeColumn: string, typeInput: string, placeholder: string, isMother: boolean }>
    },
    data: Array<Item>,
}

const TableCreator: React.FC<TableCreator> = ({params, data, actions}) => {
    console.log(params)
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
                {data.map((row, index) => {
                    return (
                        <TableLine
                            isNew={true}
                            index={index}
                            id={row.id}
                            outerReduxObjState={row}
                            key={row.id}
                            onChange={actions.onChange}
                        >
                            {params.row.map((templateRow, index) =>
                                <TableLine.Input
                                    width={params.column[index].width}
                                    type={templateRow.typeColumn as any}
                                    placeholder={templateRow.placeholder}
                                />
                            )}

                        </TableLine>


                    )
                })}
            </TableList>
        </div>
    );
};

export {TableCreator};