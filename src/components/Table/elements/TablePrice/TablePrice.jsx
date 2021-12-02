import React, {useContext} from 'react';
import cl from './TablePrice.module.scss'
import {HeaderContent} from "../../TableHeader/TableHeaderContext";

const TablePrice = ({onChange, tempId, children}) => {
    const {isHeader} = useContext(HeaderContent)

    return (
        <>{isHeader !== true
            ? <input onChange={(e) => onChange({e, tempId})} type={'number'}
                     placeholder={'ціна'}
                     className={cl.wrapper} min="0"/>
            : <div className={cl.wrapper}>
                {children}
            </div>

        }


        </>

    );
};

export {TablePrice};