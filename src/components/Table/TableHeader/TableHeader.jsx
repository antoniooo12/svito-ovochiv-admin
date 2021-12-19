import React, {useEffect} from 'react';
import cl from './TableHeader.module.scss'
import {HeaderContent} from './TableHeaderContext'


const TableHeaderInner = ({children}) => {
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

export const TableHeader = React.memo(TableHeaderInner);