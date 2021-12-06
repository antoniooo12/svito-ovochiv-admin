import React, {useEffect, useState} from 'react';
import cl from "./CategorySubPage.module.scss";
import {BtnBlue} from "../../../components/UI/BtnBlue/BtnBlue";
import {IconSave} from "../../../components/UI/icons/IconSave/IconSave";
import {useDispatch, useSelector} from "react-redux";
import categoryReducer, {changeNewCategory, deleteCategory} from "../../../reducer/categoryReducer";
import {changeNewProduct} from "../../../reducer/productReducer";
import {getAllCategory} from "../../../actions/category";
import {TableCategory} from "../../../components/Table/elements/TableCategory/TableCategory";
import TableCheckbox from "../../../components/Table/elements/TableCheckbox/TableCheckbox";
import {TableList} from "../../../components/Table/TableList/TableList";
import {TableHeader} from "../../../components/Table/TableHeader/TableHeader";
import {TableLine} from "../../../components/Table/TableLine/TableLine";

const CategorySubPage = () => {
    const dispatch = useDispatch()
    let newCategoryR = useSelector(state => state.category.newCategory) || []
    let categoryR = useSelector(state => state.category.allCategory) || []
    const [listOfNewCategory, setListOfNewCategory] = useState([])
    const [listOfCategory, setListOfCategory] = useState([])
    useEffect(() => {
        dispatch(getAllCategory())
        setListOfCategory(categoryR)
    }, [])

    useEffect(() => {
        console.log('sd')
        setListOfNewCategory(newCategoryR)
    }, [newCategoryR])

    useEffect(() => {
        setListOfCategory(categoryR)
    }, [categoryR, newCategoryR])

    const onChangeNewCategory = ({e, id}) => {
        const selected = e.target.placeholder
        const value = e.target.value
        dispatch(changeNewCategory({selected, value, id: id}))
    }

    const onDelete = (requirement) => {
        dispatch(deleteCategory(requirement))
    }
    return (
        <div className={cl.wrapper}>
            <TableList>
                <TableHeader>
                    <TableHeader.Name>Назва категорії</TableHeader.Name>
                </TableHeader>
            </TableList>
            {listOfCategory.map((el, i) => {
                return (
                    <TableLine index={i} states={el} id={el.id} key={el.id}>
                        <TableLine.Checkbox onChange={onChangeNewCategory}/>
                        <TableLine.Category onChange={onChangeNewCategory}/>
                        <TableLine.Delete onClick={onDelete}/>
                    </TableLine>)
            })}
            {listOfNewCategory.map((el, i) => {
                return (<TableLine index={i} states={el} isNew={true} id={el.id} key={el.id}>
                    <TableLine.Checkbox onChange={onChangeNewCategory}/>
                    <TableLine.Category isMother={true} onChange={onChangeNewCategory}/>
                    <TableLine.Delete onClick={onDelete}/>
                </TableLine>)
            })
            }
        </div>
    );
};

export default CategorySubPage;