import React from 'react';
import cl from './TableCreator.module.scss'
import {TableList} from "../TableList/TableList";
import {TableHeader} from '../TableHeader/TableHeader';
import {TableEntityStructure} from "../../../types/categoryReducerTypes";
import {IOnChange} from "../TableLine/LineContext";
import {DataEntitiesTableStructure, EnumStyles, TypeTable} from "../../../types/TableCreatorTypes";
import {IOnClick} from "../../../types/TableBtnTypes";
import isEqual from "react-fast-compare";
import clsx from "clsx";
import TableLines from "../TableLine/TableLines";

interface column {
    column: Array<{ width: number }>
}

interface TableCreator {
    typeTable: TypeTable  ,
    actions: {
        onChange: ({}: IOnChange) => void,
        onDelete: ({}: IOnClick) => void,
        onEdit: ({}: IOnClick) => void,
    }
    params: DataEntitiesTableStructure,
    data: TableEntityStructure,
}

const TableCreator: React.FC<TableCreator> = React.memo(({params, data, actions, typeTable}) => {


    return (
        <div className={cl.wrapper}>
            <TableList>

                <TableHeader>
                    {params.header.map((el, index) => {
                            const headerStyle = clsx({
                                [cl.rotate50]: el.style && el.style.includes(EnumStyles.align),
                                [cl.fontSize14]: el.style && el.style.includes(EnumStyles.fontSize14),
                            })
                            return (
                                <div className={headerStyle} style={{width: `${params.columnParams[index].width}px`}} key={el.title}>
                                    {el.title}
                                </div>
                            )
                        }
                    )}
                </TableHeader>
                <TableLines data={data} typeTable={typeTable} actions={actions} params={params}/>
            </TableList>

        </div>

    );
}, isEqual)

export {TableCreator};