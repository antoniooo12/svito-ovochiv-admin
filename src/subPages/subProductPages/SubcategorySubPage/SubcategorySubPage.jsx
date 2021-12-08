import React, {useEffect, useState} from 'react';
import cl from './SubcategorySubPage.module.scss'
import {TableList} from "../../../components/Table/TableList/TableList";
import {TableHeader} from "../../../components/Table/TableHeader/TableHeader";
import {useDispatch, useSelector} from "react-redux";
import {TableLine} from "../../../components/Table/TableLine/TableLine";
import {changeNewSubcategory, deleteSubcategory, editOldSubcategory} from "../../../reducer/subcategoryReducer";
import {deleteCategory, editOldCategory} from "../../../reducer/categoryReducer";
import {getAllSubcategories} from "../../../actions/subcategory";

const SubcategorySubPage = () => {
    const dispatch = useDispatch()
    let newSubcategoryR = useSelector(state => state.subcategory.newSubcategory) || []
    let allSubcategoryR = useSelector(state => state.subcategory.allSubcategory) || []
    let categoryR = useSelector(state => state.category.allCategory) || []


    const [listOfNewSubcategory, setListOfNewSubcategory] = useState([])
    const [listOfSubcategory, setListOfSubcategory] = useState([])
    const [listOfCategory, setListOfCategory] = useState([])

    useEffect(() => {
        dispatch(getAllSubcategories())
        setListOfSubcategory(allSubcategoryR)
    }, [])

    useEffect(() => {
        setListOfSubcategory(allSubcategoryR)
    }, [allSubcategoryR])

    useEffect(() => {
        setListOfCategory(categoryR)
    }, [categoryR])

    useEffect(() => {
        setListOfNewSubcategory(newSubcategoryR)
    }, [newSubcategoryR])

    const onDelete = (requirement) => {
        dispatch(deleteSubcategory(requirement))
    }
    const onEdit = (id) => {
        dispatch(editOldSubcategory(id))
    }
    const onDropdownListHandler = ({categoryId}) => {
        // dispatch(changeNewSubcategory({selected, value: title, id}))
    }
    const onChangeNewSubCategory = ({selected, value, id, isNew}) => {
        console.log(isNew)
        dispatch(changeNewSubcategory({selected, value, id, isNew}))
    }
    return (
        <div className={cl.wrapper}>
            <TableList categories={listOfCategory} isMother={{subcategory: true}}>
                <TableHeader>
                    <TableHeader.Name>підкатегорії</TableHeader.Name>
                </TableHeader>
                {listOfSubcategory.map((el, i) =>
                    <TableLine
                        onChange={onChangeNewSubCategory}
                        isNew={false}
                        states={el}
                        id={el.id}
                        index={i}
                        key={el.id}>
                        <TableLine.Checkbox/>
                        <TableLine.SubCategory/>
                        <TableLine.Category onDropdownList={onDropdownListHandler}/>
                        <TableLine.Edit onClick={onEdit}/>
                        <TableLine.Delete onClick={onDelete}/>
                    </TableLine>
                )}
                {listOfNewSubcategory.map((el, i) =>
                    <TableLine
                        onChange={onChangeNewSubCategory}
                        isNew={true}
                        states={el}
                        id={el.id}
                        index={i}
                        key={el.id}>
                        <TableLine.Checkbox/>
                        <TableLine.SubCategory/>
                        <TableLine.Category onDropdownList={onDropdownListHandler}/>
                        <TableLine.Delete onClick={onDelete}/>
                    </TableLine>
                )}
            </TableList>
        </div>
    );
};

export default SubcategorySubPage;