import React, {useContext} from 'react';
import cl from "../TableSubCategory/TableSubCategory.module.scss";
import {HeaderContent} from "../../TableHeader/TableHeaderContext";
import {LineContent} from "../../TableLine/LineContext";

const TablePriority = ({onChange,  children}) => {
    const {isHeader} = useContext(HeaderContent)
    const {id} = useContext(LineContent)

    return (
        <>
            {isHeader !== true ? <input
                    onChange={(e) =>
                        onChange({e, id})}
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