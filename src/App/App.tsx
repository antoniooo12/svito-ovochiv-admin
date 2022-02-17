import React from "react";
import {Layout} from "../components/Layout/Layout";
import {Route, Routes} from "react-router-dom";

import cl from './App.module.scss'
import {DataEntitiesCatalog} from "../mokData";
import ProductsPage from "../pages/ActionPages/ProductsPage/ProductsPage";
import {SubPage} from "../pages/ActionPages/ProductsPage/subPage/subPage";
import {OrdersPage} from "../pages/ActionPages/OrdersPage/OrdersPage";

import {mockTables} from "../mockData/mockNewTable";
import {TableShield} from "../components/TableProcessor/TableShield/TableShield";
import {TablePage} from "../pages/TablePage/TablePage";

function App() {
    return (
        <div className={cl.wrapper}>

            <Routes>
                <Route path='/' element={<Layout/>}>
                    {mockTables.map(table =>
                        <Route path={'table'}
                               element={<TablePage/>}/>
                    )}
                    <Route path={`/goods`} element={<ProductsPage/>}>

                        {Object.keys(DataEntitiesCatalog).map((item, index) => {
                                return <Route key={item} path={item} element={<SubPage/>}/>
                            }
                        )}
                    </Route>
                    <Route path='orders' element={<OrdersPage/>}/>
                </Route>
            </Routes>
        </div>
    )
        ;
}

export default App;
