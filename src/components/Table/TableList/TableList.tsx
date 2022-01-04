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

const TableList: React.FC<ITableList> = React.memo(({children, isMother, enteredDropDownList, typeTable}) => {

    const childrenMemo = useMemo(() => {
        return children
    }, [children])
    return (
        <ListContent.Provider value={{enteredDropDownList,  typeTable}}>
            <div className={cl.wrapper}>
                {childrenMemo}
            </div>
        </ListContent.Provider>

    );
}, isEqual);

export { TableList}


