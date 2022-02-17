import React from 'react';
import {TableStructure} from "../../types/TableReducerTypes";
import {EnumStatus} from "../../../../types/categoryReducerTypes";
import {TableLineCreator} from "../TableLine/TableLineCreator";
import {ColumnParam, LineStructure} from "../../../../types/TableCreatorTypes";


type TableLinesCreator = {
    lines: TableStructure
    columnParams: ColumnParam[]
    inputParams: LineStructure
}

const TableLinesCreator: React.FC<TableLinesCreator> = ({lines, columnParams,inputParams}) => {
    return (
        <div>
            {Object.keys(lines).map((status) => {
                    const arr = lines[status as EnumStatus]
                    return arr.data.map((line, index) => {
                        return (
                            <TableLineCreator
                                inputParams={inputParams}
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