import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import cl from './OrderTab.module.scss'
import {BtnBlue} from "../../UI/BtnBlue/BtnBlue";
import {ClientInformation, Order, OrderAdditionalInformation, TimeFrame} from "../../../types/orderReducerTypes";
import {useActions} from "../../../hooks/useActions";
import {TableCreator} from "../../Table/TableCreator/TableCreator";
import {socket} from "../../../soket/soket";
import {useTypedSelector} from "../../../hooks/hooks";
import {IOnChange} from "../../Table/TableLine/LineContext";
import {IOnClick} from "../../../types/TableBtnTypes";
import {TableCreatorMokData} from "../../../mokData";
import {parseTableLines} from "../../../services/table";
import {saveOrder} from "../../../actions/orderActions";
import {TimeTab} from "./TimeTab/TimeTab";
import {ClientInformationTab} from "./ClientInformation/ClientInformationTab";
import clsx from "clsx";

type OrderTab = {
    closeCreateNewOrder: () => void
    order?: Order
}
const OrderTab: React.FC<OrderTab> = ({closeCreateNewOrder, order}) => {
    const {setCategories, createNewRow, changeCategory, deleteCategory, editCategory} = useActions()
    const productList = useTypedSelector(state => state.tableReducer.storage['OrderTable'])
    useEffect(() => {
        socket.emit('REQUEST:TABLE', 'Product')
    }, [])
    const onChange = useCallback((recruitment: IOnChange) => {
        changeCategory(recruitment)
    }, [changeCategory])
    const onDelete = useCallback((recruitment: IOnClick) => {
        deleteCategory(recruitment)
    }, [deleteCategory])
    const onEdit = useCallback((recruitment: IOnClick) => {
        editCategory(recruitment)
    }, [editCategory])
    useEffect(() => {
        socket.on('DATABASE:UPDATE:PRODUCT', (products) => {
            setCategories({typeTable: "Product", rowItem: products})
        })
    }, [setCategories])
    const client = order?.Client
    const [clientInformation, setClientInformation] = useState<ClientInformation>({
        name: client?.name || '',
        surname: client?.surname || '',
        number: client?.number || '',
        comments: client?.comments || '',
        address: client?.address || '',
    })
    const [timeFrame, setTimeFrame] = useState<TimeFrame>({
        deliverFrom: new Date(),
        deliverTo: new Date(new Date().setHours(21, 0)),
    })
    const [orderAdditionalInformation, setOrderAdditionalInformation] = useState<OrderAdditionalInformation>({
        sum: 0,
        status: 'Створення замовлення',
        timeFrame: timeFrame,
        orderComments: '',
    })
    console.log(order)
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
            }
        )
    }, [timeFrame])

    const onSaveNewOrder = useCallback(async () => {
        const {newToServer, allToUpdate, allToDelete} = parseTableLines({
            isNew: productList.isNew,
            isAll: productList.isAll
        })

        saveOrder({
            clientInformation,
            orderedGoods: {
                newToServer, allToUpdate, allToDelete
            },
            orderAdditionalInformation
        })
    }, [clientInformation, productList, orderAdditionalInformation])
    const setName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setClientInformation((prevState) => {
            return {
                ...prevState,
                name: e.target.value
            }
        })
    }, [])
    const setSurname = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setClientInformation((prevState) => {
            return {
                ...prevState,
                surname: e.target.value
            }
        })
    }, [])

    const setAddress = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setClientInformation((prevState => {
            return {
                ...prevState,
                address: e.target.value
            }
        }))
    }, [])
    const setNumber = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setClientInformation((prevState => {
            const value = e.target.value
            const currentValue = value.replace(/[^\d]/g, '');
            const valueLentgh = currentValue.length


            const normilazeNumber = valueLentgh < 4 ? currentValue :
                value.length < 10
                    ? `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`
                    : `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`
            console.log(currentValue)
            console.log(value.length)
            return {
                ...prevState,
                number: normilazeNumber
            }
        }))
    }, [])
    const setComments = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        setClientInformation((prevState => {
            return {
                ...prevState,
                comments: e.target.value
            }
        }))
    }, [])


    // useEffect(() => {
    //     createNewRow('OrderTable')
    // }, [])
    useEffect(() => {
        let keysPressed: any = {};
        document.addEventListener('keydown', (event) => {
            keysPressed[event.code] = true;
            console.log(event.code)
            if (keysPressed['AltLeft'] && event.code === 'KeyA') {
                createNewRow('OrderTable')
            }
        })
        document.addEventListener('keyup', (event) => {
            delete keysPressed[event.code];
        });
        // return () => {
        //     document.removeEventListener('keydown', () => {
        //     })
        //     document.removeEventListener('keyup', () => {
        //     })
        // }
    }, [])


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
                setName={setName}
                setSurname={setSurname}
                setNumber={setNumber}
                setAddress={setAddress}
                setComments={setComments}
                clientInformation={clientInformation}
            />
            <TimeTab timeFrame={timeFrame} setTimeFrame={setTimeFrame}/>

            <div className={cl.ProductList}>
                <div className={cl.OrderedGoodsHeader}>
                    Замовлені товари
                </div>
                <div
                >
                    <TableCreator
                        typeTable={'OrderTable'}
                        params={TableCreatorMokData.OrderTable}
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