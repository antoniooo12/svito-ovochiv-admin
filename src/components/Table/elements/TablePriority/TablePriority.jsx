import React, {useContext} from 'react';
import cl from "../TableSubCategory/TableSubCategory.module.scss";
import {HeaderContent} from "../../TableHeader/TableHeaderContext";

const TablePriority = ({onChange, tempId, children}) => {
    const {isHeader} = useContext(HeaderContent)

    return (
        <>
            {isHeader !== true ? <input
                    onChange={(e) =>
                        onChange({e, tempId})}
                    type={'number'}
                    min="0"
                    placeholder={'пріорітет'}
                    className={cl.wrapper}
                /> :
                <div className={cl.wrapper}>{children}</div>}
        </>
    );
};

export {TablePriority};