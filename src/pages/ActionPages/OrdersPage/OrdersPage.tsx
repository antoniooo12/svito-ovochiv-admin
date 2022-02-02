import React, {useCallback, useContext, useEffect, useState} from 'react';
import {socket} from "../../../soket/soket";
import {useActions} from "../../../hooks/useActions";
import {useTypedSelector} from "../../../hooks/hooks";
import {OrderPageContext} from "./OrderPageContext";
import {OrderComponent} from "../../../components/Order/OrderComponent/OrderComponent";

export type SelectedOrder ={
    isOpen: boolean
    id: string| number
}

const OrdersPage = () => {
    const {isCreateNewOrderOpen, setIsCreateNewOrderOpen} = useContext(OrderPageContext)

    // const behavior = location.pathname.split('/').pop() as TypeTable
    const orders = useTypedSelector(state => state.orderReducer.orders)
    const [isCreateNewOrder, setIsCreateNewOrder] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState<SelectedOrder>({isOpen: false, id: ''})

    const {setOrders} = useActions()
    const createOrder = useCallback(() => {
        setIsCreateNewOrderOpen(true)
    }, [])

    useEffect(() => {
        socket.on('WEB:UPDATE:ORDERS', (orders) => {
            console.log(orders)
            setOrders({orders: orders})
        })
    }, [])

    const closeCreateNewOrder = useCallback(() => {
        setIsCreateNewOrderOpen(false)
    }, [])

    return (
        <OrderPageContext.Provider
            value={{
                isCreateNewOrderOpen: isCreateNewOrder,
                setIsCreateNewOrderOpen: setIsCreateNewOrder,
                selectedOrder: selectedOrder,
                setSelectedIdOrder: setSelectedOrder,
            }}>
            <OrderComponent orders={orders}/>
        </OrderPageContext.Provider>
    );
};

export {OrdersPage};