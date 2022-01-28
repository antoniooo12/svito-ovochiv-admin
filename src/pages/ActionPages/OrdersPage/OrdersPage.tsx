import React, {useCallback, useEffect, useState} from 'react';
import cl from "./OrdersPage.module.scss";
import {useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {BtnBlue} from "../../../components/UI/BtnBlue/BtnBlue";
import {RightPanel} from "../RightPanel/RightPanel";
import {createNewOrder} from "../../../reducer/orderReducer";
import {useTypedSelector} from "../../../hooks/hooks";
import {OrderTab} from "../../../components/Order/OrderTab/OrderTab";

const OrdersPage = () => {
    const dispatch = useDispatch()
    let location = useLocation();
    // const behavior = location.pathname.split('/').pop() as TypeTable
    const orders = useTypedSelector(state => state.orderReducer.orders)
    const [isCreateNewOrder, setIsCreateNewOrder] = useState(true)
    const createOrder = useCallback(() => {
        setIsCreateNewOrder(true)
    }, [])
    const closeCreateNewOrder = useCallback(() => {
        setIsCreateNewOrder(false)
    }, [])

    console.log(orders)
    return (
        <div className={cl.wrapper}>
            <div className={cl.left}>
                <div className={cl.table}>
                    {isCreateNewOrder &&
                        <OrderTab
                            closeCreateNewOrder={closeCreateNewOrder}
                        />
                    }
                    {/*{orders.map(order => {*/}
                    {/*return <OrderTab/>*/}
                    {/*})}*/}
                </div>
            </div>

            <div className={cl.right}>
                <RightPanel>
                    <BtnBlue
                        onClick={createOrder}
                    >додати замовлення</BtnBlue>
                </RightPanel>

            </div>
        </div>
    );
};

export {OrdersPage};