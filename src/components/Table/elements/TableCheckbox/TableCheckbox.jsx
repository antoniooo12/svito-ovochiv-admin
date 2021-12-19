import React, {useContext} from 'react';
import cl from './TableCheckbox.module.scss'
import {LineContent} from "../../TableLine/LineContext";
import isEqual from "react-fast-compare";
const TableCheckbox = ({onClick}) => {
    const {id, onChange} = useContext(LineContent)

    return (
        <input onChange={(e) => onChange({value: e.target.value, selected: e.target.placeholder, id})}
               className={cl.wrapper} type="checkbox"/>
    );
};

export default React.memo(TableCheckbox,isEqual);