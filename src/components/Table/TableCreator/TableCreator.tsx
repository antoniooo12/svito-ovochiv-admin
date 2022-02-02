import React, {useEffect} from 'react';
import cl from './TableCreator.module.scss'
import {TableList} from "../TableList/TableList";
import {TableHeader} from '../TableHeader/TableHeader';
import {TableLine} from "../TableLine/TableLine";
import {EnumStatus, TableEntityStructure} from "../../../types/categoryReducerTypes";
import {IOnChange} from "../TableLine/LineContext";
import {
    DataEntitiesTableStructure,
    EnumStyles,
    InputParams,
    TypeColumn,
    TypeTable
} from "../../../types/TableCreatorTypes";
import {IconTrash} from "../../UI/icons/Trash/Trash";
import {EnumTableBtn, IOnClick} from "../../../types/TableBtnTypes";
import {IconNotePencil} from "../../UI/icons/NotePencil/IconNotePencil";
import isEqual from "react-fast-compare";
import clsx from "clsx";
import {TableLineCreator} from "../TableLine/TableLineCreator";
import TableLines from "../TableLine/TableLines";
import {useActions} from "../../../hooks/useActions";
import {TypeOrderTable} from "../../../types/orderTypes";

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

const TableCreator: React.FC<TableCreator> = ({params, data, actions, typeTable}) => {
    // const {getAllRowsByTableName} = useActions()
    // useEffect(() => {
    //     params.dependency.forEach(dependency => {
    //         getAllRowsByTableName({behavior: dependency})
    //     })
    // }, [typeTable])

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
                                <div className={headerStyle} style={{width: `${params.columnParams[index].width}px`}}>
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
}

export {TableCreator};