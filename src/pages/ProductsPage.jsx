import React from 'react';
import {NavLink, Outlet, Route, Routes} from "react-router-dom";
import {AllProductsSubPages} from "../subPages/subProductPages/AllProductsSubPages/AllProductsSubPages";
import CategorySubPage from "../subPages/subProductPages/CategorySubPage/CategorySubPage";
import {ProductsPageHeader} from "../components/ProductsPageHeader/ProductsPageHeader";

const ProductsPage = () => {
    return (
        <div>

            <ProductsPageHeader/>
            <Outlet/>
            {/*<Routes>*/}
            {/*    <Route path='allProducts' element={<AllProductsSubPages/>}/>*/}
            {/*    <Route path='category' element={<CategorySubPage/>}/>*/}
            {/*</Routes>*/}
        </div>
    );
};

export default ProductsPage;