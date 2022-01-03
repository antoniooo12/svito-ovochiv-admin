import React, {useCallback, useEffect, useMemo} from 'react';
import {useLocation} from "react-router-dom";
import {useTypedSelector} from "../../../hooks/hooks";
import {TableCreator} from "../../../components/Table/TableCreator/TableCreator";
import {AllCategories, AllData, AllSubCategories, TableCreatorMokData} from "../../../mokData";
import {IOnChange} from "../../../components/Table/TableLine/LineContext";
import {changeCategory, deleteCategory, setCategories} from "../../../reducer/tableReducer";
import {useDispatch} from "react-redux";
import {TypeColumn, TypeTable} from "../../../types/TableCreatorTypes";
import {IOnClick} from "../../../types/TableBtnTypes";
import isEqual from "react-fast-compare";
import {RowItem} from "../../../types/categoryReducerTypes";

const SubPage = () => {
    const dispatch = useDispatch()
    const location = useLocation();
    const behavior: TypeColumn = location.pathname.split('/').pop() as TypeTable
    const {storage} = useTypedSelector(state => state.tableReducer)
    const table = useTypedSelector(state => state.tableReducer.storage[behavior])


    const onChange = useCallback((recruitment: IOnChange) => {
        dispatch(changeCategory(recruitment))
    }, [behavior])
    const onDelete = useCallback((recruitment: IOnClick) => {
        dispatch(deleteCategory(recruitment))
    }, [])
    useEffect(() => {
        dispatch(setCategories({rowItem: AllData[behavior].rows, typeTable: behavior}))
        AllData[behavior].dependency.forEach(dependency=>{
            dispatch(setCategories({rowItem: AllData[dependency].rows, typeTable: dependency}))
        })
    }, [behavior])

    const tableMemo = useMemo(() => {
        return table
    }, [table.isAll.data.length, table.isNew.data.length])

    return (
        <div>
            {TableCreatorMokData[behavior] &&
                <TableCreator
                    typeTable={behavior}
                    actions={{onChange, onDelete}}
                    data={tableMemo}
                    params={TableCreatorMokData[behavior]}
                />}
        </div>
    );


};

export {SubPage};