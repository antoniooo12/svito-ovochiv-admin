import React, {useCallback, useContext} from 'react';
import cl from "../../../pages/ActionPages/OrdersPage/OrdersPage.module.scss";
import {OrderTab} from "../OrderTab/OrderTab";
import {OrderMiniTab} from "../OrderMiniTab/OrderMiniTab";
import {RightPanel} from "../../../pages/ActionPages/RightPanel/RightPanel";
import {BtnBlue} from "../../UI/BtnBlue/BtnBlue";
import {Order} from "../../../types/orderReducerTypes";
import {OrderPageContext} from "../../../pages/ActionPages/OrdersPage/OrderPageContext";

type OrderComponent = {
    orders: Immutable.List<Order>
}
const OrderComponent: React.FC<OrderComponent> = ({orders}) => {
    const {isCreateNewOrderOpen, setIsCreateNewOrderOpen, selectedOrder} = useContext(OrderPageContext)
    const onCreate = useCallback(() => {
        setIsCreateNewOrderOpen(true)
    }, [])

    const onClose = useCallback(() => {
        setIsCreateNewOrderOpen(false)
    }, [])
    return (
        <div>
            <div className={cl.wrapper}>
                <div className={cl.left}>
                    <div className={cl.table}>
                        {isCreateNewOrderOpen &&
                            <OrderTab
                                closeCreateNewOrder={onClose}
                            />
                        }
                        {selectedOrder.isOpen &&
                            <OrderTab
                                closeCreateNewOrder={onClose}
                                order={orders.find(el => el.id.toString() === selectedOrder.id.toString())}
                            />
                        }
                        {orders.filter(order => order.id !== selectedOrder.id).map(order => {
                            return <OrderMiniTab
                                key={order.id}
                                order={order}
                            />
                        })}
                    </div>
                </div>

                <div className={cl.right}>
                    <RightPanel>

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