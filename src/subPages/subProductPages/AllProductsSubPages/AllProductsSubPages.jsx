import React, {useEffect, useState} from 'react';
import cl from './AllProductsSubPages.module.scss'
import {BtnBlue} from "../../../components/UI/BtnBlue/BtnBlue";
import {IconSave} from "../../../components/UI/icons/IconSave";
import {useDispatch, useSelector} from "react-redux";
import {changeNewProduct, createNewProduct} from "../../../reducer/productReducer";

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
            <div className={cl.left}>
                <div className={cl.leftHeader}>
                    <div className={cl.leftLine}>
                        <div className={cl.lineName}>Назва</div>
                        <div className={cl.lineCategory}>Категорія</div>
                        <div className={cl.lineSubCategory}>підкатегорія</div>
                        <div className={cl.linePrice}>ціна</div>
                        <div className={cl.linePriority}>пріорітет</div>
                    </div>
                </div>
                <div className={cl.leftList}>
                    {listOfNewProduct.map((el, i) => {
                        return (<div key={el.tempId}
                                     className={[cl.leftLine, i % 2 === 0 ? cl.leftLineDontSave : cl.leftLineDontSave2].join(' ')}>
                            <input
                                onChange={(e) => onChangeNewProduct({e, tempId: el.tempId})} type="checkbox"
                                className={cl.lineCheckbox}/>
                            <input onChange={(e) => onChangeNewProduct({e, tempId: el.tempId})}
                                   placeholder={'назва'} className={cl.lineName}/>
                            <input onChange={(e) => onChangeNewProduct({e, tempId: el.tempId})}
                                   placeholder={'категорія'}
                                   className={cl.lineCategory}/>
                            <input onChange={(e) => onChangeNewProduct({e, tempId: el.tempId})}
                                   placeholder={'підкатегорія'}
                                   className={cl.lineSubCategory}/>
                            <input onChange={(e) => onChangeNewProduct({e, tempId: el.tempId})} type={'number'}
                                   placeholder={'ціна'}
                                   className={cl.linePrice} min="0"/>
                            <input onChange={(e) => onChangeNewProduct({e, tempId: el.tempId})} type={'number'}
                                   placeholder={'пріорітет'} className={cl.linePriority} min="0"/>
                        </div>)
                    })}
                </div>
            </div>
        </div>
    );
};

export {AllProductsSubPages};