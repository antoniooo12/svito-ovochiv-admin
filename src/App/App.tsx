import React, {useEffect} from "react";
import {Layout} from "../components/Layout/Layout";
import {Navigate, Route, Routes} from "react-router-dom";

import cl from './App.module.scss'
import {DataEntitiesCatalog} from "../mokData";
import {socket} from "../soket/soket";
import {User} from "../types/User";
import ProductsPage from "../pages/ActionPages/ProductsPage/ProductsPage";
import {SubPage} from "../pages/ActionPages/ProductsPage/subPage/subPage";
import {OrdersPage} from "../pages/ActionPages/OrdersPage/OrdersPage";
import {
    TestInitializationComponent
} from "../components/TableProcessor/TestInitilizationComponent/TestInitializationComponent";
import {mockTables} from "../mockData/mockNewTable";

function App() {
    return (
        <div className={cl.wrapper}>

            <Routes>
                <Route path='/' element={<Layout/>}>
                    {mockTables.map(table =>
                        <Route path={'testTable'}
                               element={<TestInitializationComponent tableName={table.tableName}/>}/>
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
