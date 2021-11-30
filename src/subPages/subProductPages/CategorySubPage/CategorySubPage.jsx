import React, {useEffect, useState} from 'react';
import cl from "./CategorySubPage.module.scss";
import {BtnBlue} from "../../../components/UI/BtnBlue/BtnBlue";
import {IconSave} from "../../../components/UI/icons/IconSave";
import {useDispatch, useSelector} from "react-redux";
import categoryReducer from "../../../reducer/categoryReducer";

const CategorySubPage = () => {
    const dispatch = useDispatch()
    let newCategoryR = useSelector(state => state.category.newCategory) || []
    const [listOfNewCategory, setListOfNewCategory] = useState([])

    useEffect(() => {
        setListOfNewCategory(newCategoryR)
    }, [newCategoryR])
    const onChangeNewCategory = () => {

    }
    return (
        <div className={cl.wrapper}>
            <div className={cl.leftHeader}>
                <div className={cl.leftLine}>
                    <div className={cl.lineCategory}>Назва категорії</div>
                </div>
                <div className={cl.leftList}>
                    {listOfNewCategory.map((el, i) => {
                        return (<div>
                                <input
                                    onChange={(e) =>
                                        onChangeNewCategory({e, tempId: el.tempId})} type="checkbox"
                                    className={cl.lineCheckbox}/>
                                <input
                                    onChange={(e) =>
                                    onChangeNewCategory({e, tempId: el.tempId})}
                                    placeholder={'категорія'}
                                       type="text"/>
                            </div>

                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default CategorySubPage;