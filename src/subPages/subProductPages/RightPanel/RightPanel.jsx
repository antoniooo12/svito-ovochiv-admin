import React, {useEffect, useState} from 'react';
import cl from "./RightPanel.module.scss";
import {BtnBlue} from "../../../components/UI/BtnBlue/BtnBlue";
import {IconSave} from "../../../components/UI/icons/IconSave";
import {createNewProduct} from "../../../reducer/productReducer";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {createNewCategory} from "../../../reducer/categoryReducer";
import {getAllCategory, saveNewCategoryToServer} from "../../../actions/category";

const RightPanel = () => {
    const dispatch = useDispatch()
    let location = useLocation();
    const [rightPanelBehavior, setRightPanelBehavior] = useState('')
    const [createText, setCreateText] = useState('')
    const newCategories = useSelector(state => state.category.newCategory)

    useEffect(() => {
        setRightPanelBehavior(location.pathname.split('/').pop())
    }, [location])

    useEffect(() => {
        if (rightPanelBehavior === 'allProducts') {
            setCreateText('створити товар')
        } else if (rightPanelBehavior === 'category') {
            setCreateText('створити категорію')
        } else if (rightPanelBehavior === 'subCategory') {
            setCreateText('створити під категорію')
        }
    }, [rightPanelBehavior])


    const onCreate = () => {
        const tempId = Date.now()
        if (rightPanelBehavior === 'allProducts') {
            dispatch(createNewProduct({tempId}))
        } else if (rightPanelBehavior === 'category') {
            dispatch(createNewCategory({tempId}))
        } else if (rightPanelBehavior === 'subCategory') {

        }
    }

    const onSave = () => {
        if (rightPanelBehavior === 'allProducts') {
            // dispatch()
        } else if (rightPanelBehavior === 'category') {
            dispatch(saveNewCategoryToServer(newCategories))
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