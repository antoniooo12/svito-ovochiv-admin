import React from 'react';
import cl from './TableLine.module.scss'
import {TableName} from "../elements/TableName/TableName";
import {TableCategory} from "../elements/TableCategory/TableCategory";
import TableCheckbox from "../elements/TableCheckbox/TableCheckbox";
import {TableSubCategory} from "../elements/TableSubCategory/TableSubCategory";
import {TablePriority} from "../elements/TablePriority/TablePriority";
import {TablePrice} from "../elements/TablePrice/TablePrice";

const TableLine = ({children, index}) => {
    return (
        <div className={[cl.wrapper, index % 2 === 0 ? cl.LineDontSave : cl.LineDontSave2].join(' ')}>
            {children}
        </div>
    );
};

export default TableLine;

TableLine.Name = TableName
TableLine.Category = TableCategory
TableLine.Checkbox = TableCheckbox
TableLine.SubCategory = TableSubCategory
TableLine.Price = TablePrice
TableLine.Priority = TablePriority