import React, {useEffect, useState} from 'react';
import cl from "./CategorySubPage.module.scss";
import {BtnBlue} from "../../../components/UI/BtnBlue/BtnBlue";
import {IconSave} from "../../../components/UI/icons/IconSave";
import {useDispatch, useSelector} from "react-redux";
import categoryReducer, {changeNewCategory} from "../../../reducer/categoryReducer";
import {FormGroup, TableBody, TableCell} from "@mui/material";
import {changeNewProduct} from "../../../reducer/productReducer";
import {getAllCategory} from "../../../actions/category";
import {TableCategory} from "../../../components/Table/elements/TableCategory/TableCategory";
import TableCheckbox from "../../../components/Table/elements/TableCheckbox/TableCheckbox";
import {TableList} from "../../../components/Table/TableList/TableList";
import {TableHeader} from "../../../components/Table/TableHeader/TableHeader";
import TableLine from "../../../components/Table/TableLine/TableLine";

const CategorySubPage = () => {
    const dispatch = useDispatch()
    let newCategoryR = useSelector(state => state.category.newCategory) || []
    const [listOfNewCategory, setListOfNewCategory] = useState([])

    useEffect(() => {
        console.log('sd')
        setListOfNewCategory(newCategoryR)
    }, [newCategoryR])

    useEffect(() => {
        console.log('aaa')
        dispatch(getAllCategory())
    }, [])

    const onChangeNewCategory = ({e, tempId}) => {
        const selected = e.target.placeholder
        const value = e.target.value
        dispatch(changeNewCategory({selected, value, tempId}))

    }
    return (
        <div className={cl.wrapper}>
            <TableList>
                <TableHeader>
                    <TableHeader.Name>Назва категорії</TableHeader.Name>
                </TableHeader>
            </TableList>
            {listOfNewCategory.map((el, i) => {
                return (<TableLine key={el.tempId}>
                    <TableLine.Checkbox onChange={onChangeNewCategory} tempId={el.tempId}/>
                    <TableLine.Category onChange={onChangeNewCategory} tempId={el.tempId}/>
                </TableLine>)
            })
            }


            {/*<div className={cl.leftHeader}>*/}
            {/*    <div className={cl.leftLine}>*/}
            {/*        <div className={cl.lineCategory}>Назва категорії</div>*/}
            {/*    </div>*/}

            {/*    <div>*/}
            {/*        {listOfNewCategory.map((el, i) => {*/}
            {/*            return (<div key={el.tempId}>*/}
            {/*                    <TableCheckbox onChange={onChangeNewCategory} tempId={el.tempId}/>*/}
            {/*                    <TableCategory onChange={onChangeNewCategory} tempId={el.tempId}/>*/}
            {/*                </div>*/}

            {/*            )*/}
            {/*        })}*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};

export default CategorySubPage;