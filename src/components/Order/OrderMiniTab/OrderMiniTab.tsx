import React, {useCallback, useContext} from 'react';
import cl from './OrderMiniTab.module.scss'
import {BtnBlue} from "../../UI/BtnBlue/BtnBlue";
import {OrderPageContext} from "../../../pages/ActionPages/OrdersPage/OrderPageContext";
import {Order} from "../../../types/orderReducerTypes";
import {statusOrder} from "../../../mockData/orderPageMock";

type OrderMiniTab = {
    order: Order
}
const OrderMiniTab: React.FC<OrderMiniTab> = ({order}) => {
    const {id, OrderAdditionalInformation} = order
    const {Client, ClientId} = order.ClientOrder


    const {setSelectedIdOrder, setIsCreateNewOrderOpen} = useContext(OrderPageContext)
    const onMore = useCallback(() => {
        setSelectedIdOrder(id)
        setIsCreateNewOrderOpen(true)
    }, [])
    return (
        <div className={cl.wrapper}>
            <div className={cl.header}>
                <span>№{id}</span>
            </div>
            <div className={cl.main}>
                <div className={cl.clientInformation}>
                    <div>Ім'я {Client.name}</div>
                    <div>Фамілія {Client.surname}</div>
                    <div>Номер {Client.number}</div>
                    <div>Адрес {Client.address}</div>
                </div>
                <div className={cl.orderInformation}>
                    <table>
                        <tr>
                            <td align={'right'}>сума:</td>
                            <td>{OrderAdditionalInformation.sum} <span className={'text-sm'}>грн</span></td>
                        </tr>
                        <tr>
                            <td align={'right'}>статус:</td>
                            <td>{statusOrder[OrderAdditionalInformation.status]}</td>
                        </tr>
                    </table>
                </div>
                <div className={cl.actionsSection}>
                    <BtnBlue onClick={onMore}> більше</BtnBlue>
                </div>
            </div>

        </div>
    );
};

export {OrderMiniTab};