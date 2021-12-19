import React, {useMemo} from 'react';
import cl from './TableList.module.scss';
import {TableLine} from "../TableLine/TableLine";
import Header from "../../Header/Header";
import {TableHeader} from "../TableHeader/TableHeader";
import {ListContent} from "./ListContext";
import isEqual from "react-fast-compare";


const TableListInner = ({children, isMother, enteredDropDownList}) => {
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
};

export const TableList = React.memo(TableListInner, isEqual)

