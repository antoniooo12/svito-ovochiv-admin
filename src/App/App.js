import React, {useEffect, useState} from "react";
import cl from './App.module.scss'
import {Layout} from "../components/Layout/Layout";
import {BrowserRouter, Routes, Route, Link, Outlet} from "react-router-dom";
import PricePage from "../pages/PricePage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import {OrdersPage} from "../pages/OrdersPage";
import {SubPage} from "../pages/ProductsPage/subPage/subPage";

function App() {
    return (
            <>
                <Routes>
                    <Route path='/' element={<Layout/>}>
                        <Route path='products/*' element={<ProductsPage/>}>
                            ///todo переробити денамічний роутинг
                            <Route path='*' element={<SubPage/>}/>
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
