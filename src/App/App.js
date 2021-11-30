import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import cl from './App.module.scss'
import Login from "../components/authorization/Login";
import Upload from "../components/uploadFile/Upload";
import Header from "../components/Header/Header";
import {Layout} from "../components/Layout/Layout";
import {BrowserRouter, Routes, Route, Link, Outlet} from "react-router-dom";
import {pageList} from "../mokData/mokData";
import PricePage from "../pages/PricePage";
import ProductsPage from "../pages/ProductsPage";
import {OrdersPage} from "../pages/OrdersPage";
import {AllProductsSubPages} from "../subPages/subProductPages/AllProductsSubPages/AllProductsSubPages";
import CategorySubPage from "../subPages/subProductPages/CategorySubPage";

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route path='products/*' element={<ProductsPage/>}>
                        <Route path='allProducts' element={<AllProductsSubPages/>}/>
                        <Route path='category' element={<CategorySubPage/>}/>
                    </Route>
                    <Route path='price' element={<PricePage/>}/>
                    <Route path='orders' element={<OrdersPage/>}/>
                </Route>
            </Routes>
        </>

    )
        ;
}

export default App;
