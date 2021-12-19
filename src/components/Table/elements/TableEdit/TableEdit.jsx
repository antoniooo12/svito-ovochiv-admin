import React, {useContext} from 'react';
import {IconNotePencil} from "../../../UI/icons/NotePencil/IconNotePencil";
import {LineContent} from "../../TableLine/LineContext";
import cl from './TableEdit.module.scss'
import isEqual from "react-fast-compare";

const TableEditInner = ({onClick}) => {
    const {id} = useContext(LineContent)
    let {wasEdit} = useContext(LineContent)
    return (
        <div className={cl.wrapper} onClick={() => {
            onClick(id)
        }} id={id}>
            <IconNotePencil/>
        </div>
    );
};
export const TableEdit = React.memo(TableEditInner,isEqual)
