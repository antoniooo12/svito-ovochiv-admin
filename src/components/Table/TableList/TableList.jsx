import React from 'react';
import cl from './TableList.module.scss';
import {TableLine} from "../TableLine/TableLine";
import Header from "../../Header/Header";
import {TableHeader} from "../TableHeader/TableHeader";
import {ListContent} from "./ListContext";


const TableList = ({children, categories}) => {
    console.log(categories)
    return (
        <ListContent.Provider value={{categories}}>
            <div className={cl.wrapper}>
                {children}
            </div>
        </ListContent.Provider>

    );
};

export {TableList};


TableLine.Header =TableHeader