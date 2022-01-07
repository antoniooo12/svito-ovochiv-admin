import React from 'react';
import {Outlet, useLocation} from "react-router-dom";
import {ProductsPageHeader} from "../../components/ProductsPageHeader/ProductsPageHeader";
import cl from "./ProductsPage.module.scss";
import {useDispatch} from "react-redux";
import {RightPanel} from "./RightPanel/RightPanel";
import {TypeTable} from "../../types/TableCreatorTypes";
import {DataEntitiesCatalog} from "../../mokData";

const ProductsPage = () => {
    const dispatch = useDispatch()
    let location = useLocation();
    const behavior = location.pathname.split('/').pop() as TypeTable


    return (
        <div className={cl.wrapper}>
            <div className={cl.left}>
                <ProductsPageHeader/>
                <div className={cl.table}>
                    <Outlet/>
                </div>
            </div>

            <div className={cl.right}>
                <RightPanel typeTable={behavior}/>
            </div>
        </div>
    );
};

export default React.memo(ProductsPage);