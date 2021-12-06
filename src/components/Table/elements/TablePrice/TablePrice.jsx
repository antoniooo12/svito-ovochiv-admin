import React, {useContext} from 'react';
import cl from './TablePrice.module.scss'
import {HeaderContent} from "../../TableHeader/TableHeaderContext";
import {LineContent} from "../../TableLine/LineContext";

const TablePrice = ({onChange,  children}) => {
    const {isHeader} = useContext(HeaderContent)
    const {id} = useContext(LineContent)

    return (
        <>{isHeader !== true
            ? <input onChange={(e) => onChange({e, id})} type={'number'}
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