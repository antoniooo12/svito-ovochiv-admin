import React, {useMemo} from 'react';
import cl from './TableList.module.scss';
import {ListContent} from "./ListContext";
import isEqual from "react-fast-compare";
import {TypeTable} from "../../../types/TableCreatorTypes";

interface ITableList {
    isMother?: boolean,
    enteredDropDownList?: any,
    typeTable?: TypeTable,
}

const TableList: React.FC<ITableList> = ({children, typeTable}) => {
    return (
        <ListContent.Provider value={{typeTable: typeTable}}>
            <div className={cl.wrapper}>
                {children}
            </div>
        </ListContent.Provider>

    );
}

export { TableList}


