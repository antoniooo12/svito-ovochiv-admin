import React, {useEffect, useMemo} from 'react';
import {Outlet} from "react-router-dom";
import {ProductsPageHeader} from "../../components/ProductsPageHeader/ProductsPageHeader";
import cl from "./ProductsPage.module.scss";
import {useDispatch} from "react-redux";
import {RightPanel} from "./RightPanel/RightPanel";
import {setCategories} from "../../reducer/tableReducer";
import {AllCategories, AllSubCategories} from "../../mokData";

const ProductsPage = () => {
    const dispatch = useDispatch()


    return (
        <div className={cl.wrapper}>
            <div className={cl.left}>
                <ProductsPageHeader/>
                <div className={cl.table}>
                    <Outlet/>
                </div>
            </div>

            <div className={cl.right}>
                <RightPanel/>
            </div>
        </div>
    );
};

export default React.memo(ProductsPage);