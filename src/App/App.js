import React from "react";
import {Layout} from "../components/Layout/Layout";
import {Navigate, Route, Routes} from "react-router-dom";
import PricePage from "../pages/PricePage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import {OrdersPage} from "../pages/OrdersPage";
import {SubPage} from "../pages/ProductsPage/subPage/subPage";
import cl from './App.module.scss'
import {DataEntitiesCatalog} from "../mokData";

function App() {
    return (
        <div className={cl.wrapper}>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route path={`/goods`} element={<ProductsPage/>}>
                        {Object.keys(DataEntitiesCatalog).map((item, index) => {
                                return <Route path={item} element={<SubPage/>}/>
                            }
                        )}
                    </Route>
                    <Route path='price' element={<PricePage/>}/>
                    <Route path='orders' element={<OrdersPage/>}/>
                </Route>
            </Routes>
        </div>
    )
        ;
}

export default App;
