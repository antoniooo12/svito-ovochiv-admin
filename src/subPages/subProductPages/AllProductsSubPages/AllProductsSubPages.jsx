import React, {useCallback, useEffect, useMemo, useState} from 'react';
import cl from './AllProductsSubPages.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {changeNewProduct, deleteProduct, editOldProduct} from "../../../reducer/productReducer";
import {TableLine} from "../../../components/Table/TableLine/TableLine";
import {TableList} from "../../../components/Table/TableList/TableList";
import {TableHeader} from "../../../components/Table/TableHeader/TableHeader";
import {IconTrash} from "../../../components/UI/icons/Trash/Trash";
import {IconNotePencil} from "../../../components/UI/icons/NotePencil/IconNotePencil";
import {editOldCategory} from "../../../reducer/categoryReducer";

const AllProductsSubPages = () => {
    const dispatch = useDispatch()
    let newProductsR = useSelector(state => state.product.newProducts) || []
    let productsR = useSelector(state => state.product.allProducts) || []
    let categoryR = useSelector(state => state.category.allCategory) || []
    let subcategoryR = useSelector(state => state.subcategory.allSubcategory) || []

    const listOfCategory = useMemo(() => {
        return categoryR
    }, [categoryR])
    const listOfSubcategory = useMemo(() => {
        return subcategoryR
    }, [subcategoryR])
    const listOfNewProduct = useMemo(() => {
        return newProductsR
    }, [newProductsR])
    const listOfProducts = useMemo(() => {
        return productsR
    }, [productsR])

    const enteredDropDownList = useMemo(() => {
        return {category: listOfCategory, subcategory: listOfSubcategory}
    }, [listOfSubcategory, listOfCategory])

    const onChangeNewProduct = useCallback(({isNew, value, type, id}) => {
        dispatch(changeNewProduct({isNew, type, value, id}))
    }, [])

    const onEdit = useCallback(({id}) => {
        dispatch(editOldProduct(id))
    }, [])
    const onDelete = useCallback(({id, isNew}) => {
        dispatch(deleteProduct({id, isNew}))
    }, [])
    return (
        <div className={cl.wrapper}>
            <TableList enteredDropDownList={enteredDropDownList}>
                <TableHeader>
                    <TableLine.Input width={190}>назва</TableLine.Input>
                    <TableLine.Input width={125}>категорія</TableLine.Input>
                    <TableLine.Input width={125}>підкатегорія</TableLine.Input>

                </TableHeader>
                {listOfProducts.map((el, i) => {
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
                            <TableLine.Input
                                width={190}
                                placeholder={'назва'}
                                type={'productName'}
                            />
                            <TableLine.Input
                                width={125}
                                placeholder={'категорія'}
                                type={'category'}
                            />
                            <TableLine.Input
                                width={125}
                                placeholder={'підкатегорія'}
                                type={'subcategory'}
                                filterBy={'categoryId'}
                            />
                            <TableLine.Select
                                options={['шт', 'кг']}
                                type={'unit'}
                            />
                            <TableLine.Number
                                type={'price'}
                                placeholder={'ціна'}
                            />
                            <TableLine.Btn
                                type={'edit'}
                                icon={<IconNotePencil/>}
                                onClick={onEdit}
                            />
                            <TableLine.Btn
                                type={'delete'}
                                icon={<IconTrash/>}
                                onClick={onDelete}
                            />
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
                            <TableLine.Input
                                width={190}
                                placeholder={'назва'}
                                type={'productName'}
                            />
                            <TableLine.Input
                                width={125}
                                placeholder={'категорія'}
                                type={'category'}
                            />
                            <TableLine.Input
                                width={125}
                                placeholder={'підкатегорія'}
                                type={'subcategory'}
                                filterBy={'categoryId'}
                            />
                            <TableLine.Select
                                options={['шт', 'кг']}
                                type={'unit'}
                            />
                            <TableLine.Number
                                type={'price'}
                                placeholder={'ціна'}
                            />
                            <TableLine.Btn
                                BtnIcon={<IconTrash/>}

                            />
                            <TableLine.Btn
                                type={'delete'}
                                icon={<IconTrash/>}
                                onClick={onDelete}
                            />
                        </TableLine>)
                })}
            </TableList>
        </div>
    );
};

export {AllProductsSubPages};