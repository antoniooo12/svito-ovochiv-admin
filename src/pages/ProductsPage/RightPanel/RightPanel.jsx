import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import cl from "./RightPanel.module.scss";
import {BtnBlue} from "../../../components/UI/BtnBlue/BtnBlue";
import {IconSave} from "../../../components/UI/icons/IconSave/IconSave";
import {createNewProduct} from "../../../reducer/productReducer";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {createNewCategory} from "../../../reducer/categoryReducer";
import {getAllCategory, saveNewCategoryToServer} from "../../../actions/category";
import {createNewSubCategory} from "../../../reducer/subcategoryReducer";
import {path} from "../../../API";
import {saveNewSubcategoryToServer} from "../../../actions/subcategory";
import {saveProductsToServer} from "../../../actions/productServer";

const RightPanelInner = () => {
    const dispatch = useDispatch()
    let location = useLocation();
    // const [rightPanelBehavior, setRightPanelBehavior] = useState('')
    // const [createText, setCreateText] = useState('')
    const newC = useSelector(state => state.category) || []
    const oldC = useSelector(state => false && state.category.allCategory) || []
    const newSc = useSelector(state => false && state.subcategory.newSubcategory) || []
    const oldSc = useSelector(state => false && state.subcategory.allSubcategory) || []
    const oldP = useSelector(state => false && state.product.allProducts) || []
    const newP = useSelector(state => false && state.product.newProducts) || []

    // const newSubcategories = useSelector(state => state.subcategory.newSubcategory)

    const rightPanelBehavior = useMemo(() => {
        return location.pathname.split('/').pop()
    }, [location])

    const createText = useMemo(() => {
        if (rightPanelBehavior === 'allProducts') {
            return 'створити товар'
        } else if (rightPanelBehavior === 'category') {
            return 'створити категорію'
        } else if (rightPanelBehavior === path.SUBCATEGORY) {
            return 'створити під категорію'
        }
    }, [rightPanelBehavior])

    const onCreate = useCallback(() => {
        onCreateT(rightPanelBehavior)
    }, [rightPanelBehavior])

    const onCreateT = (rightPanelBehavior) => {
        if (rightPanelBehavior === 'allProducts') {
            dispatch(createNewProduct())
        } else if (rightPanelBehavior === 'category') {
            dispatch(createNewCategory())
        } else if (rightPanelBehavior === path.SUBCATEGORY) {
            dispatch(createNewSubCategory())
        }
    }

    const onSave = useCallback(() => {
        onSaveT(rightPanelBehavior)
    }, [rightPanelBehavior, newC, oldC, newP, oldP, newSc, oldSc])

    const onSaveT = (rightPanelBehavior) => {
        debugger

        if (rightPanelBehavior === path.ALL_PRODUCTS) {
            dispatch(saveProductsToServer({newItems: newP, oldItems: oldP}))
        } else if (rightPanelBehavior === path.CATEGORY) {
            dispatch(saveNewCategoryToServer({newC, oldC}))
        } else if (rightPanelBehavior === path.SUBCATEGORY) {
            dispatch(saveNewSubcategoryToServer({newItems: newSc, oldItems: oldSc}))
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
                <BtnBlue onClick={
                    onSave
                }>
                    зберегти
                </BtnBlue>
            </div>
        </div>
    )
        ;
};
const RightPanel = React.memo(RightPanelInner)
export {RightPanel};