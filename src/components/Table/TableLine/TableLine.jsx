import React from 'react';
import cl from './TableLine.module.scss'
import {TableName} from "../elements/TableName/TableName";
import {TableCategory} from "../elements/TableCategory/TableCategory";
import TableCheckbox from "../elements/TableCheckbox/TableCheckbox";
import {TableSubCategory} from "../elements/TableSubCategory/TableSubCategory";
import {TablePriority} from "../elements/TablePriority/TablePriority";
import {TablePrice} from "../elements/TablePrice/TablePrice";
import {LineContent} from "./LineContext";
import {TableDelete} from "../elements/TableDelete/TableDelete";
import {TableEdit} from "../elements/TableEdit/TableEdit";
import {TableSelectUnit} from "../elements/TableSelectUnit/TableSelectUnit";

const TableLine = ({children, index, id, states, isNew, onChange}) => {
    return (
        <LineContent.Provider value={{id, states, isNew, onChange, wasEdit: false}}>
            <div className={[cl.wrapper,
                isNew === true
                    ? index % 2 === 0 ? cl.LineDontSaveNew : cl.LineDontSaveNew2
                    : index % 2 === 0 ? cl.LineDontSaveOld : cl.LineDontSaveOld2
                ,
                states.toDelete === true && cl.toDelete,
            ].join(' ')}>
                {children}
            </div>
        </LineContent.Provider>
    );
};

export {TableLine};

TableLine.Checkbox = TableCheckbox
TableLine.Name = TableName
TableLine.Category = TableCategory
TableLine.SubCategory = TableSubCategory
TableLine.Price = TablePrice
TableLine.Priority = TablePriority
TableLine.Delete = TableDelete
TableLine.Edit = TableEdit
TableLine.Unit = TableSelectUnit