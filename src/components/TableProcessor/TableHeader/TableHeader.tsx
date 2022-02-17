import React, {useEffect} from 'react';
import {ColumnParam} from "../../../types/TableCreatorTypes";
import {tableCreateLine} from "../redux/reducer/tableReducer";
import {useDispatch} from "react-redux";

type TableHeader = {
    header: Array<{ title: string }>
    params: ColumnParam[]
}

const TableHeader: React.FC<TableHeader> = ({header, params}) => {
    const dispatch = useDispatch()


    const joinArray: Array<typeof header[0] & typeof params[0]> = header.map((item, index) => {
        return {...item, ...params[index]}
    })
    return (
        <div className={'flex'}>
            {joinArray.map(({title, width}) =>
                <div key={title} style={{width: `${width}px`}}>{title}</div>
            )}
        </div>
    );
};

export {TableHeader};