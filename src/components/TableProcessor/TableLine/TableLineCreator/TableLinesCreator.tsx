import React, {useEffect} from 'react';
import {TableStructure} from "../../types/TableReducerTypes";
import {EnumStatus} from "../../../../types/categoryReducerTypes";
import {TableLineCreator} from "../TableLine/TableLineCreator";
import {ColumnParam, LineStructure} from "../../../../types/TableCreatorTypes";
import {tableCreateLine} from "../../redux/reducer/tableReducer";


type TableLinesCreator = {
    lines: TableStructure
    columnParams: ColumnParam[]
    lineParams: LineStructure
}

const TableLinesCreator: React.FC<TableLinesCreator> = ({lines, columnParams, lineParams}) => {
    useEffect(() => {
        const onKeyDown = (event: any) => {
            keysPressed[event.code] = true;
        }
        const onKeyUp = (event: any) => {
            if (keysPressed['AltLeft'] && event.code === 'KeyA') {
                tableCreateLine(lineParams)
            }
            delete keysPressed[event.code];
        }
        let keysPressed: any = {};
        window.addEventListener('keydown', onKeyDown)
        window.addEventListener('keyup', onKeyUp)
        return () => {
            window.removeEventListener('keydown', onKeyDown)
            window.removeEventListener('keyup', onKeyUp)

        }
    }, [])
    return (
        <div>
            {Object.keys(lines).map((status) => {
                    const arr = lines[status as EnumStatus]
                    return arr.data.map((line, index) => {
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