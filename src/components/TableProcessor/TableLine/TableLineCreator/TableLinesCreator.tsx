import React, {useContext} from 'react';
import {TableStructure} from "../../types/TableReducerTypes";
import {EnumStatus} from "../../../../types/categoryReducerTypes";
import {TableLineCreator} from "../TableLine/TableLineCreator";
import {ColumnParam, LineStructure} from "../../../../types/TableCreatorTypes";
import {TableShieldContext} from "../../TableShield/TableShieldContext";


type TableLinesCreator = {
    lines: TableStructure
    columnParams: ColumnParam[]
    lineParams: LineStructure
}

const TableLinesCreator: React.FC<TableLinesCreator> = ({lines, columnParams, lineParams}) => {
    const {tableActions} = useContext(TableShieldContext)
    const {useCreateLine} = tableActions
    useCreateLine()

    return (
        <div>
            {Object.keys(lines).map((status) => {
                const arr = lines[status as EnumStatus]
                return arr.data.map((line) => {
                    return (
                        <TableLineCreator
                            inputParams={lineParams}
                            status={status as EnumStatus}
                                columnParams={columnParams}
                                lineData={line}
                                key={line.id}
                            />
                        )

                    })
                }
            )}
        </div>
    );
};

export {TableLinesCreator};