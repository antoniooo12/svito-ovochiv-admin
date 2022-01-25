import React from 'react';
import {EnumStatus, TableEntityStructure} from "../../../types/categoryReducerTypes";
import {TableLineCreator} from "./TableLineCreator";
import {DataEntitiesTableStructure, TypeTable} from "../../../types/TableCreatorTypes";
import {IOnChange} from "./LineContext";
import {IOnClick} from "../../../types/TableBtnTypes";
import isEqual from "react-fast-compare";

type TableLines = {
    data: TableEntityStructure
    typeTable: TypeTable
    params: DataEntitiesTableStructure
    actions: {
        onChange: ({}: IOnChange) => void,
        onDelete: ({}: IOnClick) => void,
        onEdit: ({}: IOnClick) => void,
    }
}
const TableLines: React.FC<TableLines> = ({data, typeTable, params, actions}) => {
    return (
        <div>
            {
                Object.keys(EnumStatus).map(status =>
                    data[status as EnumStatus].data.map((row, index) => {
                        return (
                            <TableLineCreator
                                typeTable={typeTable}
                                index={index}
                                params={params}
                                row={row}
                                key={row.id}
                                actions={actions}
                                status={status as EnumStatus}
                            />
                        )
                    })
                )
            }
        </div>
    );
};

export default TableLines;