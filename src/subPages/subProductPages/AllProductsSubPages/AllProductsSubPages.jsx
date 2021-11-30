import React, {useState} from 'react';
import cl from './AllProductsSubPages.module.scss'
import {BtnBlue} from "../../../components/UI/BtnBlue/BtnBlue";
import {IconSave} from "../../../components/UI/icons/IconSave";
import {useDispatch} from "react-redux";
import {createProduct} from "../../../reducer/productReducer";

const AllProductsSubPages = () => {
    const dispatch = useDispatch()
    const [listOfProducts, setListOfProducts] = useState([])
    const [listOfNewProduct, setListOfNewProduct] = useState([])
    const onCreateProduct = () => {
        const tempId = Date.now()
        setListOfNewProduct([...listOfNewProduct, {tempId}])
    }
    const onChangeNewProduct = ({e, tempId}) => {
        const selected = e.target.placeholder
        const value = e.target.value
        const indexOfNewP = listOfNewProduct.findIndex(el => el.tempId === tempId)
        let newProduct = listOfNewProduct.filter(el => el.tempId === tempId)[0]
        if (selected === 'назва') {
            newProduct.title = value
        } else if (selected === 'категорія') {
            newProduct.category = value
        } else if (selected === 'підкатегорія') {
            newProduct.subCategory = value
        } else if (selected === 'ціна') {
            newProduct.price = value
        } else if (selected === 'пріорітет') {
            newProduct.priority = value
        }
        setListOfNewProduct(
            [...listOfNewProduct.slice(0, indexOfNewP),
                newProduct,
                ...listOfNewProduct.slice(indexOfNewP + 1)])

    }
    const onSaveProduct = () => {
        console.log(listOfNewProduct)
        dispatch(createProduct())
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
                        console.log(el)
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
                            <input   onChange={(e) => onChangeNewProduct({e, tempId: el.tempId})} type={'number'}
                                    placeholder={'ціна'}
                                    className={cl.linePrice} min="0"/>
                            <input   onChange={(e) => onChangeNewProduct({e, tempId: el.tempId})} type={'number'}
                                   placeholder={'пріорітет'} className={cl.linePriority} min="0"/>
                        </div>)
                    })}
                </div>
            </div>
            <div className={cl.right}>
                <div className={cl.rightMainSection}>
                    <BtnBlue onClick={(e) => {
                        onCreateProduct()
                    }}>
                        створити товар <IconSave/>
                    </BtnBlue>
                </div>

                <div className={cl.rightBottom}>
                    <BtnBlue onClick={(e) => onSaveProduct()}>
                        зберегти
                    </BtnBlue>
                </div>
            </div>
        </div>
    );
};

export {AllProductsSubPages};