import React from 'react';
import cl from './TableList.module.scss';
import TableLine from "../TableLine/TableLine";
import Header from "../../Header/Header";
import {TableHeader} from "../TableHeader/TableHeader";


const TableList = ({children}) => {
    return (
        <div
            className={cl.wrapper}
        >
            {children}
        </div>
    );
};

export {TableList};


TableLine.Header =TableHeader