import React, {useEffect, useState} from 'react';
import cl from "./RightPanel.module.scss";
import {BtnBlue} from "../../../components/UI/BtnBlue/BtnBlue";
import {IconSave} from "../../../components/UI/icons/IconSave/IconSave";
import {createNewProduct} from "../../../reducer/productReducer";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {createNewCategory} from "../../../reducer/categoryReducer";
import {getAllCategory, saveNewCategoryToServer} from "../../../actions/category";
import {createNewSubCategory} from "../../../reducer/subCategory";
import {path} from "../../../API";
import {saveNewSubcategoryToServer} from "../../../actions/subcategory";

const RightPanel = () => {
    const dispatch = useDispatch()
    let location = useLocation();
    const [rightPanelBehavior, setRightPanelBehavior] = useState('')
    const [createText, setCreateText] = useState('')
    const newC = useSelector(state => state.category.newCategory)
    const oldC = useSelector(state => state.category.allCategory)

    const newSubcategories = useSelector(state => state.subcategory.newSubcategory)

    useEffect(() => {
        setRightPanelBehavior(location.pathname.split('/').pop())
    }, [location])

    useEffect(() => {
        if (rightPanelBehavior === 'allProducts') {
            setCreateText('створити товар')
        } else if (rightPanelBehavior === 'category') {
            setCreateText('створити категорію')
        } else if (rightPanelBehavior === path.SUBCATEGORY) {
            setCreateText('створити під категорію')
        }
    }, [rightPanelBehavior])


    const onCreate = () => {
        if (rightPanelBehavior === 'allProducts') {
            dispatch(createNewProduct())
        } else if (rightPanelBehavior === 'category') {
            dispatch(createNewCategory())
        } else if (rightPanelBehavior === path.SUBCATEGORY) {
            dispatch(createNewSubCategory())
        }
    }

    const onSave = () => {
        if (rightPanelBehavior === 'allProducts') {

        } else if (rightPanelBehavior === 'category') {
            dispatch(saveNewCategoryToServer({newC, oldC}))
        } else if (rightPanelBehavior === path.SUBCATEGORY) {
            dispatch(saveNewSubcategoryToServer(newSubcategories))
        }
    }
    return (
        <div className={cl.wrapper}>
            <div className={cl.rightMainSection}>
                <BtnBlue onClick={(e) => {
                    onCreate()
                }}>
                    {createText} <IconSave/>
                </BtnBlue>
            </div>

            <div className={cl.rightBottom}>
                <BtnBlue onClick={(e) => {
                    onSave()
                }}>
                    зберегти
                </BtnBlue>
            </div>
        </div>
    );
};

export {RightPanel};