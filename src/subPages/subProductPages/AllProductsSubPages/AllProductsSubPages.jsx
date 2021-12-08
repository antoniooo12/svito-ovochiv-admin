import React, {useEffect, useState} from 'react';
import cl from './AllProductsSubPages.module.scss'
import {BtnBlue} from "../../../components/UI/BtnBlue/BtnBlue";
import {IconSave} from "../../../components/UI/icons/IconSave/IconSave";
import {useDispatch, useSelector} from "react-redux";
import {changeNewProduct, createNewProduct} from "../../../reducer/productReducer";
import {TableCategory} from "../../../components/Table/elements/TableCategory/TableCategory";
import {TableName} from "../../../components/Table/elements/TableName/TableName";
import TableCheckbox from "../../../components/Table/elements/TableCheckbox/TableCheckbox";
import {TableLine} from "../../../components/Table/TableLine/TableLine";
import {TableSubCategory} from "../../../components/Table/elements/TableSubCategory/TableSubCategory";
import {TableList} from "../../../components/Table/TableList/TableList";
import {TableHeader} from "../../../components/Table/TableHeader/TableHeader";
import {logDOM} from "@testing-library/react";

const AllProductsSubPages = () => {
    const dispatch = useDispatch()
    let newProductsR = useSelector(state => state.product.newProducts) || []
    let productsR = useSelector(state => state.product.allProducts) || []
    let categoryR = useSelector(state => state.category.allCategory) || []
    let subcategoryR = useSelector(state => state.subcategory.allSubcategory) || []


    const [listOfProducts, setListOfProducts] = useState([])
    const [listOfNewProduct, setListOfNewProduct] = useState([])
    const [listOfCategory, setListOfCategory] = useState([])
    const [listOfSubcategory, setListOfSubcategory] = useState([])

    useEffect(() => {
        setListOfSubcategory(subcategoryR)
    }, [subcategoryR])
    useEffect(() => {
        setListOfCategory(categoryR)
    }, [categoryR])
    useEffect(() => {
        setListOfNewProduct(newProductsR)
    }, [newProductsR])
    useEffect(() => {
        setListOfProducts(productsR)
    }, [productsR])

    const onChangeNewProduct = ({value, selected, id}) => {
        dispatch(changeNewProduct({selected, value, id}))
    }

    return (
        <div className={cl.wrapper}>
            <TableList categories={listOfCategory} subcategories={listOfSubcategory}>
                <TableHeader>
                    <TableHeader.Name isHeader={true}>назва</TableHeader.Name>
                    <TableHeader.Category>категорія</TableHeader.Category>
                    <TableHeader.SubCategory>підкатегорія</TableHeader.SubCategory>
                    <TableLine.Unit>тип</TableLine.Unit>
                    <TableHeader.Price>ціна</TableHeader.Price>
                    <div>пріорітет</div>
                </TableHeader>
                {listOfProducts.map((el,i)=>{
                    return (
                        <TableLine
                            onChange={onChangeNewProduct}
                            states={el}
                            isNew={false}
                            index={i}
                            id={el.id}
                            key={el.id}
                        >

                            <TableLine.Checkbox/>
                            <TableLine.Name/>
                            <TableLine.Category/>
                            <TableLine.SubCategory/>
                            <TableLine.Unit/>
                            <TableLine.Price/>
                            <TableLine.Priority/>
                        </TableLine>)
                })

                }
                {listOfNewProduct.map((el, i) => {
                    return (
                        <TableLine
                            onChange={onChangeNewProduct}
                            states={el}
                            isNew={true}
                            index={i}
                            id={el.id}
                            key={el.id}
                        >

                            <TableLine.Checkbox/>
                            <TableLine.Name/>
                            <TableLine.Category/>
                            <TableLine.SubCategory/>
                            <TableLine.Unit/>
                            <TableLine.Price/>
                            <TableLine.Priority/>
                        </TableLine>)
                })}
            </TableList>
        </div>
    );
};

export {AllProductsSubPages};