import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import cl from "./RightPanel.module.scss";
import {BtnBlue} from "../../../components/UI/BtnBlue/BtnBlue";
import {IconSave} from "../../../components/UI/icons/IconSave/IconSave";
import {createNewProduct} from "../../../reducer/productReducer";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {createNewRow} from "../../../reducer/tableReducer";
import {getAllCategory, saveNewCategoryToServer} from "../../../actions/category";
import {createNewSubCategory} from "../../../reducer/subcategoryReducer";
import {path} from "../../../API";
import {saveNewSubcategoryToServer} from "../../../actions/subcategory";
import {saveProductsToServer} from "../../../actions/productServer";

const RightPanelInner = () => {
    const dispatch = useDispatch()
    let location = useLocation();
    const behavior: string = location.pathname.split('/').pop() as string

    const onCreate = useCallback(() => {
        dispatch(createNewRow(behavior))
    }, [behavior])

    return (
        <div className={cl.wrapper}>
            <div className={cl.rightMainSection}>
                <BtnBlue onClick={onCreate}>
                    <IconSave/>
                </BtnBlue>
            </div>

            <div className={cl.rightBottom}>
                {/*<BtnBlue>*/}
                {/*    зберегти*/}
                {/*</BtnBlue>*/}
            </div>
        </div>
    )
        ;
};
const RightPanel = React.memo(RightPanelInner)
export {RightPanel};