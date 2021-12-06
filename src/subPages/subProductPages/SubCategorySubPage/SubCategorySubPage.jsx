import React, {useEffect, useState} from 'react';
import cl from './SubCategorySubPage.module.scss'
import {TableList} from "../../../components/Table/TableList/TableList";
import {TableHeader} from "../../../components/Table/TableHeader/TableHeader";
import {useDispatch, useSelector} from "react-redux";
import {changeNewCategory} from "../../../reducer/categoryReducer";
import {TableSubCategory} from "../../../components/Table/elements/TableSubCategory/TableSubCategory";
import {TableLine} from "../../../components/Table/TableLine/TableLine";
import {changeNewSubcategory} from "../../../reducer/subCategory";

const SubCategorySubPage = () => {
    const dispatch = useDispatch()
    let newSubCategoryR = useSelector(state => state.subcategory.newSubcategory) || []
    let categoryR = useSelector(state => state.category.allCategory) || []


    const [listOfNewSubcategory, setListOfNewSubcategory] = useState([])
    const [listOfCategory, setListOfCategory] = useState([])

    useEffect(() => {
        console.log(categoryR)
        setListOfCategory(categoryR)
    }, [])

    useEffect(() => {
        setListOfNewSubcategory(newSubCategoryR)
    }, [newSubCategoryR])

    const onChangeNewSubCategory = ({e, id}) => {
        const selected = e.target.placeholder
        const value = e.target.value
        dispatch(changeNewSubcategory({selected, value, id}))
    }

    return (
        <div className={cl.wrapper}>
            <TableList categories={listOfCategory}>
                <TableHeader>
                    <TableHeader.Name>Назва під категорії</TableHeader.Name>
                </TableHeader>
                {listOfNewSubcategory.map((el, i) => <TableLine
                    isNew={true}
                    states={el}
                    id={el.id}
                    index={i}
                    key={el.id}>
                    <TableLine.Checkbox onChange={onChangeNewSubCategory}/>
                    <TableLine.SubCategory onChange={onChangeNewSubCategory}/>
                    <TableLine.Category onChange={onChangeNewSubCategory}/>
                    <TableLine.Delete/>
                </TableLine>)}
            </TableList>
        </div>
    );
};

export default SubCategorySubPage;