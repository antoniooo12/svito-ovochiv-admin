import React, {useMemo} from 'react';
import cl from './TableList.module.scss';
import {ListContent} from "./ListContext";
import isEqual from "react-fast-compare";

interface ITableList {
    isMother?: boolean,
    enteredDropDownList?: any,

}

const TableList: React.FC<ITableList> = React.memo(({children, isMother, enteredDropDownList}) => {
    const childrenMemo = useMemo(() => {
        return children
    }, [children])
    return (
        <ListContent.Provider value={{enteredDropDownList, isMother}}>
            <div className={cl.wrapper}>
                {childrenMemo}
            </div>
        </ListContent.Provider>

    );
}, isEqual);

export { TableList}


