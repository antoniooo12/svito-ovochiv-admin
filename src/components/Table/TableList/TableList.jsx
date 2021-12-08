import React from 'react';
import cl from './TableList.module.scss';
import {TableLine} from "../TableLine/TableLine";
import Header from "../../Header/Header";
import {TableHeader} from "../TableHeader/TableHeader";
import {ListContent} from "./ListContext";


const TableList = ({children, categories, isMother, subcategories = []}) => {
    return (
        <ListContent.Provider value={{categories, isMother, subcategories}}>
            <div className={cl.wrapper}>
                {children}
            </div>
        </ListContent.Provider>

    );
};

export {TableList};


TableLine.Header =TableHeader