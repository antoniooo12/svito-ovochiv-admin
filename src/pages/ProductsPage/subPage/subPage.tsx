import React, {useCallback, useEffect, useMemo} from 'react';
import {useLocation} from "react-router-dom";
import {useTypedSelector} from "../../../hooks/hooks";
import {TableCreator} from "../../../components/Table/TableCreator/TableCreator";
import { TableCreatorMokData} from "../../../mokData";
import {IOnChange} from "../../../components/Table/TableLine/LineContext";
import {changeCategory, deleteCategory, editCategory, setCategories} from "../../../reducer/tableReducer";
import {useDispatch} from "react-redux";
import {TypeColumn, TypeTable} from "../../../types/TableCreatorTypes";
import {IOnClick} from "../../../types/TableBtnTypes";
import isEqual from "react-fast-compare";
import {Line} from "../../../types/categoryReducerTypes";
import {useActions} from "../../../hooks/useActions";

const SubPage = () => {
    const dispatch = useDispatch()
    const location = useLocation();
    const behavior = location.pathname.split('/').pop() as TypeTable
    const {storage} = useTypedSelector(state => state.tableReducer)
    const table = useTypedSelector(state => state.tableReducer.storage[behavior])
    const {getAllRowsByTableName} = useActions()

    const onChange = useCallback((recruitment: IOnChange) => {
        dispatch(changeCategory(recruitment))
    }, [behavior])
    const onDelete = useCallback((recruitment: IOnClick) => {
        dispatch(deleteCategory(recruitment))
    }, [])
    const onEdit = useCallback((recruitment: IOnClick) => {
        dispatch(editCategory(recruitment))
    }, [])
    useEffect(() => {
        getAllRowsByTableName({behavior})
    }, [behavior])

    const tableMemo = useMemo(() => {
        return table
    }, [table])
    const actions = useMemo(() => {
        return {onChange, onDelete, onEdit}
    }, [behavior])
    const typeTable = useMemo(() => {
        return behavior
    }, [behavior])
    return (
        <>
            {TableCreatorMokData[behavior] &&
                <TableCreator
                    typeTable={behavior}
                    actions={actions}
                    data={tableMemo}
                    params={TableCreatorMokData[behavior]}
                />}
        </>
    );


};

export {SubPage};