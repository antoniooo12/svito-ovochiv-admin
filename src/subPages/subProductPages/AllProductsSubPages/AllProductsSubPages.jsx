import React, {useEffect, useState} from 'react';
import cl from './AllProductsSubPages.module.scss'
import {BtnBlue} from "../../../components/UI/BtnBlue/BtnBlue";
import {IconSave} from "../../../components/UI/icons/IconSave";
import {useDispatch, useSelector} from "react-redux";
import {changeNewProduct, createNewProduct} from "../../../reducer/productReducer";
import {TableCategory} from "../../../components/Table/elements/TableCategory/TableCategory";
import {TableName} from "../../../components/Table/elements/TableName/TableName";
import TableCheckbox from "../../../components/Table/elements/TableCheckbox/TableCheckbox";
import TableLine from "../../../components/Table/TableLine/TableLine";
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

    const onChangeNewProduct = ({e, tempId}) => {
        const selected = e.target.placeholder
        const value = e.target.value
        dispatch(changeNewProduct({selected, value, tempId}))

    }
    const onSaveProduct = () => {
        console.log(listOfNewProduct)
        // dispatch()
    }
    return (
        <div className={cl.wrapper}>
            <TableList>
                <TableHeader>
                    <div>Назва</div>
                    <div>Категорія</div>
                    <div>підкатегорія</div>
                    <div>ціна</div>
                    <div>пріорітет</div>
                </TableHeader>
                {listOfNewProduct.map((el, i) => {
                    return (
                        <TableLine key={el.tempId}
                                       index={i}
                                       className={[cl.leftLine, i % 2 === 0 ? cl.leftLineDontSave : cl.leftLineDontSave2].join(' ')}>

                        <TableCheckbox onChange={onChangeNewProduct} tempId={el.tempId}/>
                        <TableName onChange={onChangeNewProduct} tempId={el.tempId}/>
                        <TableCategory onChange={onChangeNewProduct} tempId={el.tempId}/>
                        <TableSubCategory onChange={onChangeNewProduct} tempId={el.tempId}/>

                        <input onChange={(e) => onChangeNewProduct({e, tempId: el.tempId})} type={'number'}
                               placeholder={'ціна'}
                               className={cl.linePrice} min="0"/>
                        <input onChange={(e) => onChangeNewProduct({e, tempId: el.tempId})} type={'number'}
                               placeholder={'пріорітет'} className={cl.linePriority} min="0"/>
                    </TableLine>)
                })}
            </TableList>
        </div>
    );
};

export {AllProductsSubPages};