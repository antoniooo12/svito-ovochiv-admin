import React, {useContext} from 'react';
import cl from './TableCategory.module.scss'
import {HeaderContent} from "../../TableHeader/TableHeaderContext";

const TableCategory = ({onChange, tempId, children}) => {
    const {isHeader} = useContext(HeaderContent)

    return (
        <>{isHeader !== true ?
            <input
                onChange={(e) =>
                    onChange({e, tempId})}
                placeholder={'категорія'}
                className={cl.wrapper}
            />
            : <div className={cl.wrapper}> {children}</div>}
        </>

    );
};

export {TableCategory};