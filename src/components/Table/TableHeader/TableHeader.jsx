import React, {createContext, useEffect} from 'react';
import cl from './TableHeader.module.scss'
import {TableName} from "../elements/TableName/TableName";
import {HeaderContent} from './TableHeaderContext'
import {TableCategory} from "../elements/TableCategory/TableCategory";
import {TableSubCategory} from "../elements/TableSubCategory/TableSubCategory";
import {TablePrice} from "../elements/TablePrice/TablePrice";
import {TablePriority} from "../elements/TablePriority/TablePriority";


const TableHeader = ({children}) => {
    useEffect(() => {

    }, [])

    return (
        <HeaderContent.Provider value={{isHeader: true}}>
            <div className={cl.wrapper}>
                {children}
            </div>
        </HeaderContent.Provider>
    );
};

export {TableHeader};


TableHeader.Name = TableName
TableHeader.Category = TableCategory
TableHeader.SubCategory = TableSubCategory
TableHeader.Price = TablePrice
TableHeader.Priority = TablePriority