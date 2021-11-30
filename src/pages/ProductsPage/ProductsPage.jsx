import React from 'react';
import {NavLink, Outlet, Route, Routes} from "react-router-dom";
import {AllProductsSubPages} from "../../subPages/subProductPages/AllProductsSubPages/AllProductsSubPages";
import CategorySubPage from "../../subPages/subProductPages/CategorySubPage/CategorySubPage";
import {ProductsPageHeader} from "../../components/ProductsPageHeader/ProductsPageHeader";
import cl from "./ProductsPage.module.scss";
import {BtnBlue} from "../../components/UI/BtnBlue/BtnBlue";
import {IconSave} from "../../components/UI/icons/IconSave";
import {useDispatch} from "react-redux";
import {createNewProduct} from "../../reducer/productReducer";
import {RightPlace} from "../../subPages/subProductPages/RightPlace/RightPlace";

const ProductsPage = () => {
    const dispatch = useDispatch()


    return (
        <div className={cl.wrapper}>
            <div className={cl.left}>
                <ProductsPageHeader/>
                <Outlet/>
            </div>
            <div className={cl.right}>
                <RightPlace/>
            </div>
        </div>
    );
};

export default ProductsPage;