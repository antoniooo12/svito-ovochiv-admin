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

const AllProductsSubPages = () => {
    const dispatch = useDispatch()
    let newProductsR = useSelector(state => state.product.newProducts) || []
    const [listOfProducts, setListOfProducts] = useState([])
    const [listOfNewProduct, setListOfNewProduct] = useState([])

    useEffect(() => {
        setListOfNewProduct(newProductsR)
    }, [newProductsR])

    const onChangeNewProduct = ({e, id}) => {
        const selected = e.target.placeholder
        const value = e.target.value
        ///todo refactor id to id
        dispatch(changeNewProduct({selected, value, id: id}))

    }
    const onSaveProduct = () => {
        console.log(listOfNewProduct)
        // dispatch()
    }
    return (
        <div className={cl.wrapper}>
            <TableList>
                <TableHeader>
                    <TableHeader.Name isHeader={true}>Назва</TableHeader.Name>
                    <TableHeader.Category>Категорія</TableHeader.Category>
                    <TableHeader.SubCategory>підкатегорія</TableHeader.SubCategory>
                    <TableHeader.Price>ціна</TableHeader.Price>
                    <div>пріорітет</div>
                </TableHeader>
                {listOfNewProduct.map((el, i) => {
                    return (
                        <TableLine key={el.id}
                                   index={i}
                                   id={el.id}
                                   className={[cl.leftLine, i % 2 === 0 ? cl.leftLineDontSave : cl.leftLineDontSave2].join(' ')}>

                            <TableLine.Checkbox onChange={onChangeNewProduct} id={el.id}/>
                            <TableLine.Name onChange={onChangeNewProduct} id={el.id}/>
                            <TableLine.Category onChange={onChangeNewProduct} id={el.id}/>
                            <TableLine.SubCategory onChange={onChangeNewProduct} id={el.id}/>
                            <TableLine.Price onChange={onChangeNewProduct} id={el.id}/>
                            <TableLine.Priority onChange={onChangeNewProduct} id={el.id}/>
                        </TableLine>)
                })}
            </TableList>
        </div>
    );
};

export {AllProductsSubPages};