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

function App() {
    const user: User = {
        name: 'a'
    }
    useEffect(() => {
        socket.emit('ROOM:SET_USERS', {roomId: '1', user: user})
        a()

    }, [])

    async function a() {
        setTimeout(() => {
            socket.emit('ADD_ORDER', {roomId: '1'})
            console.log('send')
        }, 1000)

    }
    useEffect(()=>{
        socket.on('test',(m)=>{
            console.log(m)
        })
        socket.on('ADD_ORDER',(m)=>{
            console.log(m)
        })
    },[])


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
                    <Route path='orders' element={<OrdersPage/>}/>
                </Route>
            </Routes>
        </div>
    )
        ;
}

export default App;
