import React, {ReactNode} from 'react';
import cl from './TableHeader.module.scss'
import {HeaderContent} from './TableHeaderContext'

export interface ITableHeader {
    children?: ReactNode,
}

const TableHeader: React.FC<ITableHeader> = ({children}) => {

    return (
        <HeaderContent.Provider value={{isHeader: true}}>
            <div className={cl.wrapper}>
                {children}
            </div>
        </HeaderContent.Provider>
    );

};

export {
    TableHeader
}