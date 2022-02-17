import React from 'react';
import {TableInput} from "../../components/TableInput/TableInput";
import {TTableLine} from "../../types/TableReducerTypes";
import clsx from "clsx";
import cl from './TableLineCreator.module.scss'
import {ColumnParam, LineStructure} from "../../../../types/TableCreatorTypes";
import {EnumStatus} from "../../../../types/categoryReducerTypes";
import {LineContext} from "./TableLineContext";

type TableLineCreator = {
    status: EnumStatus
    lineData: TTableLine
    columnParams: ColumnParam[]
    inputParams: LineStructure
}
const TableLineCreator: React.FC<TableLineCreator> = ({lineData, columnParams, status, inputParams}) => {

    return (
        <LineContext.Provider value={{
            lineId: lineData.id,
            status: status,
            wasEdit: false,
            lineData: lineData,
        }}>

            <div className={clsx(cl.wrapper, {
                [cl.toDelete]: lineData.toDelete,
                [cl.LineDontSaveNew]: status === EnumStatus.isNew
            })}>
                {[...lineData.columns.values()].map((column, index) => {
                        return (
                            <TableInput
                                inputParams={inputParams[column.typeColumn]}
                                columnParam={columnParams[index]}
                                column={column}
                                key={column.id}
                            />)
                    }
                )}
            </div>
        </LineContext.Provider>

    );
};

export {TableLineCreator};