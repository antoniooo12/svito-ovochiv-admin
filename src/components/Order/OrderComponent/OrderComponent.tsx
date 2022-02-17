import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import cl from "../../../pages/ActionPages/OrdersPage/OrdersPage.module.scss";
import {OrderTab} from "../OrderTab/OrderTab";
import {OrderMiniTab} from "../OrderMiniTab/OrderMiniTab";
import {RightPanel} from "../../../pages/ActionPages/RightPanel/RightPanel";
import {BtnBlue} from "../../UI/BtnBlue/BtnBlue";
import {Order} from "../../../types/orderReducerTypes";
import {OrderPageContext} from "../../../pages/ActionPages/OrdersPage/OrderPageContext";
import Immutable, {List} from "immutable";
import {removeDocumentListener} from "../../../services/DOM";
import {OrderNotification} from "../../../types/orderTypes";
import {Notification} from "../../Notification/Notification";
import {NotificationLevel} from "../../../types/NotificationTypes";
import {useActions} from "../../../hooks/useActions";
import {socket} from "../../../soket/soket";
import {socketOrderAPI} from "../../../API/socketAPI/socketAPI";

type OrderComponent = {
    orders: Immutable.List<Order>
    notifications: OrderNotification
}


const OrderComponent: React.FC<OrderComponent> = ({orders, notifications}) => {
    const {
        isCreateNewOrderOpen,
        setIsCreateNewOrderOpen,
        selectedOrderId,
        setSelectedIdOrder
    } = useContext(OrderPageContext)
    //global update
    const [globalUpdate, setGlobalUpdate] = useState(0)
    const {setOrders} = useActions()
    const onCreate = useCallback(() => {
        removeDocumentListener()
        setSelectedIdOrder(0)
        setIsCreateNewOrderOpen(true)
    }, [selectedOrderId])

    const onClose = useCallback(() => {
        setSelectedIdOrder(0)
        setIsCreateNewOrderOpen(false)
        removeDocumentListener()
    }, [selectedOrderId])

    const selectedOrder = useMemo(() => {
        const aa = orders.find(el => el.id.toString() === selectedOrderId.toString())
        return aa
    }, [selectedOrderId])
    const notificationLevel = useMemo(() => {
        console.log('hhhhhhhh')
        console.log(notifications.toArray())
        const isSelectedOrderChanged = notifications.find(changedOrderId => changedOrderId === selectedOrderId)
        if (isSelectedOrderChanged) {
            return List([{
                notificationLevel: NotificationLevel.medium,
                message: 'у цього замовлення змінився товар',
                action: () => {
                    setGlobalUpdate(prevState => prevState + 1)
                    socket.emit(socketOrderAPI.webGetAllOrders)
                }
            }])
        }
        return List([])
    }, [notifications, selectedOrder])

    // const selectedOrderTab = useMemo(() => {
    //
    //     return (<OrderTab
    //         closeCreateNewOrder={onClose}
    //         order={selectedOrder}
    //     />)
    // }, [selectedOrder, onClose, orders])
    return (
        <div>
            <div className={cl.wrapper}>
                <div className={cl.left}>
                    <div className={cl.table}>

                        {isCreateNewOrderOpen &&
                            <OrderTab
                                globalUpdate={globalUpdate}
                                closeCreateNewOrder={onClose}
                                order={selectedOrder}
                            />
                        }
                        {orders.filter(order => order.id.toString() !== selectedOrderId.toString()).map(order => {
                            return <OrderMiniTab
                                key={order.id}
                                order={order}
                            />
                        })}
                    </div>
                </div>

                <div className={cl.right}>
                    <RightPanel>
                        <Notification changing={notificationLevel}/>
                        <BtnBlue
                            onClick={onCreate}
                        >додати замовлення</BtnBlue>
                    </RightPanel>

                </div>
            </div>
        </div>
    );
};

export {OrderComponent};


