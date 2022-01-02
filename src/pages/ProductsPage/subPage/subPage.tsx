import React, {useCallback, useEffect} from 'react';
import {useLocation} from "react-router-dom";
import {useTypedSelector} from "../../../hooks/hooks";
import {TableCreator} from "../../../components/Table/TableCreator/TableCreator";
import {AllCategories, AllSubCategories, TableCreatorMokData} from "../../../mokData";
import {IOnChange} from "../../../components/Table/TableLine/LineContext";
import {changeCategory, deleteCategory, setCategories} from "../../../reducer/tableReducer";
import {useDispatch} from "react-redux";
import {TypeColumn, TypeTable} from "../../../types/TableCreatorTypes";
import {IOnClick} from "../../../types/TableBtnTypes";

const SubPage = () => {
    const dispatch = useDispatch()
    const location = useLocation();
    const behavior: TypeColumn = location.pathname.split('/').pop() as TypeTable
    const {storage} = useTypedSelector(state => state.tableReducer)


    const onChange = useCallback((recruitment: IOnChange) => {
        dispatch(changeCategory(recruitment))
    }, [behavior])
    const onDelete = useCallback((recruitment: IOnClick) => {
        dispatch(deleteCategory(recruitment))
    }, [])
    useEffect(() => {
        dispatch(setCategories({rowItem: AllCategories, typeTable: "categories"}))
        dispatch(setCategories({rowItem: AllSubCategories, typeTable: "subCategories"}))
    }, [behavior])

    return (
        <div>
            {TableCreatorMokData[behavior] &&
                <TableCreator
                    typeTable={behavior}
                    actions={{onChange, onDelete}}
                    data={storage[behavior]}
                    params={TableCreatorMokData[behavior]}
                />}
        </div>
        );


};

export {SubPage};