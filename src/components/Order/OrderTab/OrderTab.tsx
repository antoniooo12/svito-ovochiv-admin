import React, {useCallback, useEffect, useState} from 'react';
import cl from './OrderTab.module.scss'
import {BtnBlue} from "../../UI/BtnBlue/BtnBlue";
import {
    ClientInformation,
    Order,
    OrderAdditionalInformation,
    OrderedGood,
    TimeFrame
} from "../../../types/orderReducerTypes";
import {useActions} from "../../../hooks/useActions";
import {TableCreator} from "../../Table/TableCreator/TableCreator";
import {socket} from "../../../soket/soket";
import {useEffectSkipMount, useTypedSelector} from "../../../hooks/hooks";
import {IOnChange} from "../../Table/TableLine/LineContext";
import {IOnClick} from "../../../types/TableBtnTypes";
import {TableCreatorMokData} from "../../../mokData";
import {parseDbToWebTable, parseTableLines} from "../../../services/table";
import {saveOrder} from "../../../actions/orderActions";
import {TimeTab} from "./TimeTab/TimeTab";
import {ClientInformationTab} from "./ClientInformation/ClientInformationTab";
import clsx from "clsx";
import isEqual from "react-fast-compare";
import {statusOrder} from "../../../mockData/orderPageMock";
import {OrderInstances, OrderTabWasEdit} from "../../../types/orderTypes";

type OrderTab = {
    closeCreateNewOrder: () => void
    order?: Order
    globalUpdate: number
}
const OrderTab: React.FC<OrderTab> = ({closeCreateNewOrder, order, globalUpdate}) => {
    const {
        setCategories,
        createNewRow,
        changeCategory,
        deleteCategory,
        editCategory,
        deleteAllNewInstance
    } = useActions()
    const productList = useTypedSelector(state => state.tableReducer.storage['Order'])
    const orderId = order?.id

    const clientServer = order?.ClientOrder.Client
    const orderAdditionalInformationServer = order?.OrderAdditionalInformation
    const orders = order?.OrderedGoods


    useEffect(() => {
        socket.emit('REQUEST:TABLE', 'Product')
    }, [])

    useEffect(() => {
        return function () {
            deleteAllNewInstance({typeTable: 'Order'})
            setCategories({
                typeTable: 'Order',
                rowItem: [],
            })
        }
    }, [orderId])

    const [statusOrderTab, setStatusOrderTab] = useState<keyof typeof statusOrder>('create')
    const [wasEdit, setWasEdit] = useState<OrderTabWasEdit>({wasEdit: false, whatWasEdit: []})
    const [clientInformation, setClientInformation] = useState<ClientInformation>({
        name: '', surname: '', number: '', comments: '', address: '', id: 0
    })
    const [timeFrame, setTimeFrame] = useState<TimeFrame>({
        deliverFrom: new Date(),
        deliverTo: new Date(new Date().setHours(21, 0)),
    })
    const [orderAdditionalInformation, setOrderAdditionalInformation] = useState<OrderAdditionalInformation>({
        sum: 0, status: 'Створення замовлення', timeFrame: timeFrame, orderComments: '',
    })

    //змінює клієнтську інформацію прийнту зі серверу
    useEffect(() => {
        const {name = '', address = '', number = '', surname = '', comments = '', id = 0} = clientServer || {}
        setClientInformation({name, surname, number, address, comments, id})
    }, [orderId])

    //змінює статус замовлення
    useEffect(() => {
        setOrderAdditionalInformation(prevState => {
            return {
                ...prevState,
                status: statusOrder[statusOrderTab]
            }
        })
    }, [statusOrderTab])

    useEffect(() => {
        if (order) {
            setWasEdit(prevState => {
                return {
                    ...prevState,
                    wasEdit: true,
                    whatWasEdit: [...prevState.whatWasEdit, OrderInstances.orders]
                }
            })
        }
    }, [order, productList])


    //блок функцій передаваних до таблиці
    const onChange = useCallback((recruitment: IOnChange) => {

        changeCategory(recruitment)
    }, [])
    const onDelete = useCallback((recruitment: IOnClick) => {
        deleteCategory(recruitment)
    }, [])
    const onEdit = useCallback((recruitment: IOnClick) => {
        setWasEdit(prevState => {
            return {
                ...prevState,
                wasEdit: true,
                whatWasEdit: [...prevState.whatWasEdit, OrderInstances.orders]
            }
        })
        setStatusOrderTab('dateWasChanged')
        editCategory(recruitment)
    }, [])

    //запрос на сервер за потрібною таблицею
    useEffect(() => {
        socket.on('DATABASE:UPDATE:PRODUCT', (products) => {
            setCategories({typeTable: "Product", rowItem: products})
        })
    }, [])

//сумування всіх замовлених товарів
    useEffect(() => {
        setOrderAdditionalInformation(prevState => {
            const sum = productList.isNew.data.reduce((accumulator, line) => {
                return accumulator += Number(line.columns.totalSum?.value) ? line.columns.totalSum?.value as number : 0
            }, 0) + productList.isAll.data.reduce((accumulator, line) => {
                return accumulator += Number(line.columns.totalSum?.value) ? line.columns.totalSum?.value as number : 0
            }, 0)
            return {
                ...prevState,
                sum
            }
        })
    }, [productList])

    useEffect(() => {
        setOrderAdditionalInformation(prevState => {
            return {
                ...prevState,
                timeFrame: timeFrame
            }
        })
    }, [timeFrame])

    // реалізація кнопки для збереження даних на сервер
    const onSaveNewOrder = useCallback(async () => {
        const {newToServer, allToUpdate, allToDelete} = parseTableLines({
            isNew: productList.isNew,
            isAll: productList.isAll
        })
        saveOrder({
            clientInformation,
            orderedGoods: {
                newToServer, allToUpdate, allToDelete,
            },
            orderAdditionalInformation,
            edit: wasEdit,
            orderId: orderId,
        })
    }, [clientInformation, productList, orderAdditionalInformation])

    // замовленні продукти замовленні зі серверу передається до таблиці
    useEffect(() => {
        const ordersToTable = orders
            ? parseDbToWebTable<OrderedGood>(orders, 'Order', ['Order'])
            : []
        setCategories({
            typeTable: 'Order',
            rowItem: ordersToTable,
        })
    }, [order, orders, globalUpdate])

    useEffect(() => {

        const onKeyDown = (event: any) => {
            keysPressed[event.code] = true;
        }
        const onKeyUp = (event: any) => {
            if (keysPressed['AltLeft'] && event.code === 'KeyA') {
                createNewRow('Order')
            }
            delete keysPressed[event.code];
        }
        let keysPressed: any = {};
        window.addEventListener('keydown', onKeyDown)
        window.addEventListener('keyup', onKeyUp)
        return () => {
            window.removeEventListener('keydown', onKeyDown)
            window.removeEventListener('keyup', onKeyUp)

        }
    }, [orderId])
    //следит за изменениями клиентской информации
    useEffectSkipMount(() => {
        if (order && !isEqual(clientServer, clientInformation)) {
            setWasEdit(prevState => {
                return {
                    ...prevState,
                    wasEdit: true,
                    whatWasEdit: [...prevState.whatWasEdit, OrderInstances.client]
                }
            })
            setStatusOrderTab("dateWasChanged")
        } else if (order) {
            setStatusOrderTab("edit")
        } else {
            setStatusOrderTab('create')
        }
    }, [clientInformation, orderId])

    return (
        <div className={clsx(cl.wrapper)}
        >
            <div className={cl.Header}>
                <div>
                    {orderAdditionalInformation.status}
                </div>
                <div className={cl.HeaderButton}>
                    <BtnBlue
                        onClick={closeCreateNewOrder}
                    >
                        Закрити
                    </BtnBlue>
                    <BtnBlue
                        onClick={onSaveNewOrder}
                    >
                        Зберегти
                    </BtnBlue>
                </div>

            </div>
            <ClientInformationTab
                setClientInformation={setClientInformation}
                clientInformation={clientInformation}
            />
            <TimeTab timeFrame={timeFrame} setTimeFrame={setTimeFrame}/>

            <div className={cl.ProductList}>
                <p>alt + a для додавання рядку</p>

                <div className={cl.OrderedGoodsHeader}>
                    Замовлені товари
                </div>
                <div
                >
                    <TableCreator
                        typeTable={'Order'}
                        params={TableCreatorMokData.Order}
                        data={productList}
                        actions={{onChange, onDelete, onEdit,}}
                    />
                </div>
            </div>
            <div className={cl.Footer}>
                <div className={cl.totalSum}>
                    {orderAdditionalInformation.sum} грн
                </div>
            </div>
        </div>
    );
};

export {OrderTab};