import React, {useCallback, useContext, useEffect, useState} from 'react';
import {socket} from "../../../soket/soket";
import {useActions} from "../../../hooks/useActions";
import {useTypedSelector} from "../../../hooks/hooks";
import {OrderPageContext} from "./OrderPageContext";
import {OrderComponent} from "../../../components/Order/OrderComponent/OrderComponent";
import {socketOrderAPI} from "../../../API/socketAPI/socketAPI";
import {OrderNotification} from "../../../types/orderTypes";
import {List} from "immutable";
import {Order} from "../../../types/orderReducerTypes";
import {useDispatch} from "react-redux";
import {getAllOrders} from "../../../services/OrderService/OrderService";

export type SelectedOrder = {
    isOpen: boolean
    id: string | number
}

const OrdersPage = () => {
    const {isCreateNewOrderOpen, setIsCreateNewOrderOpen} = useContext(OrderPageContext)
    const dispatch = useDispatch()
    // const behavior = location.pathname.split('/').pop() as TypeTable
    const orders = useTypedSelector(state => state.orderReducer.orders)
    const [isOpenCreateOrder, setIsOpenCreateNewOrder] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState<number>(0)
    const [notifications, setNotifications] = useState<OrderNotification>(
        List()
    )
    const {setOrders} = useActions()
    const createOrder = useCallback(() => {
        setIsCreateNewOrderOpen(true)
    }, [])


    // useGetAllOrders()
    useEffect(() => {
        socket.emit(socketOrderAPI.webGetAllOrders)
        socket.on(socketOrderAPI.webGetAllOrders, (ordersFromServer) => {
            console.log('listener')
            console.log(ordersFromServer)
            setOrders({orders: ordersFromServer as Order[]})
        })

        socket.on(socketOrderAPI.webUpdateOrdersSideChangingOrderedGood, (orderFromServer: Order) => {
            setNotifications(prevState => {
                return prevState?.push(orderFromServer.id)
            })
        })
    }, [notifications])
    console.log(orders)

    const closeCreateNewOrder = useCallback(() => {
        setIsCreateNewOrderOpen(false)
    }, [])
    return (
        <OrderPageContext.Provider
            value={{
                isCreateNewOrderOpen: isOpenCreateOrder,
                setIsCreateNewOrderOpen: setIsOpenCreateNewOrder,
                selectedOrderId: selectedOrder,
                setSelectedIdOrder: setSelectedOrder,
            }}>
            <OrderComponent orders={orders} notifications={notifications}/>
        </OrderPageContext.Provider>
    );
};

export {OrdersPage};