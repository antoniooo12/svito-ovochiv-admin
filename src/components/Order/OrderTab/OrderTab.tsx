import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import cl from './OrderTab.module.scss'
import {BtnBlue} from "../../UI/BtnBlue/BtnBlue";
import {ClientInformation} from "../../../types/orderReducerTypes";
import {useActions} from "../../../hooks/useActions";
import {TableCreator} from "../../Table/TableCreator/TableCreator";
import {orderTableStructureMock} from "../../../mockData/orderPageMock";
import {EnumStatus, TableEntityStructure} from "../../../types/categoryReducerTypes";
import {addNewProduct} from "./orderTabHelpers";

type OrderTab = {
    closeCreateNewOrder: () => void
}
const OrderTab: React.FC<OrderTab> = ({closeCreateNewOrder}) => {
    const {createNewOrder} = useActions()
    const [clientInformation, setClientInformation] = useState<ClientInformation>({
        name: '',
        timeFrame: false,
        surname: '',
        number: '',
        comments: '',
        address: '',
    })
    const saveNewOrder = useCallback(() => {
        createNewOrder({clientInformation})
    }, [clientInformation])
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
            return {
                ...prevState,
                number: e.target.value
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
    
    const [productList, setProductList] = useState<TableEntityStructure>({
        [EnumStatus.isNew]: {
            data: [],
            forceRender: 0
        },
        [EnumStatus.isAll]: {
            data: [],
            forceRender: 0
        }
    })
    const onChange = useCallback(() => {

    }, [])
    const onDelete = useCallback(() => {

    }, [])
    const onEdit = useCallback(() => {

    }, [])
    useEffect(() => {
        addNewProduct(productList, setProductList)
    }, [])
    useEffect(() => {
        let keysPressed: any = {};
        document.addEventListener('keydown', (event) => {
            keysPressed[event.key] = true;
            if (keysPressed['Alt'] && event.key == 'a') {
                addNewProduct(productList, setProductList)
            }
        })
        document.addEventListener('keyup', (event) => {
            delete keysPressed[event.key];
        });
        return () => {
            document.removeEventListener('keydown', () => {
            })
            document.removeEventListener('keyup', () => {
            })
        }
    }, [])


    return (
        <div className={cl.wrapper}
        >
            <div className={cl.Header}>
                <div>
                    СТВОРЕННЯ ЗАМОВЛЕННЯ
                </div>
                <div className={cl.HeaderButton}>
                    <BtnBlue
                        onClick={closeCreateNewOrder}
                    >
                        Закрити
                    </BtnBlue>
                    <BtnBlue
                        onClick={saveNewOrder}
                    >
                        Зберегти
                    </BtnBlue>
                </div>

            </div>
            <div className={cl.ClientInformation}>
                <div> Інформація клієнта</div>
                <div>
                    <input
                        onChange={setName}
                        value={clientInformation.name}
                        placeholder={'name'}/>
                </div>
                <div>
                    <input
                        onChange={setSurname}
                        value={clientInformation.surname}
                        placeholder={'surname'}/>
                </div>
                <div>
                    <input
                        onChange={setNumber}
                        value={clientInformation.number}
                        placeholder={'number'}/>
                </div>

                <div>
                    <input
                        onChange={setAddress}
                        value={clientInformation.address}
                        placeholder={'address'}/>
                </div>
                <div>
                    <textarea
                        value={clientInformation.comments}
                        onChange={setComments}
                        placeholder={'comment'}
                    />
                </div>
            </div>
            <div className={cl.ProductList}>
                <div>
                    {/*{ productList && productList?.isNew.map(product => {*/}
                    {/*        return (<div>*/}
                    {/*            {product}*/}
                    {/*        </div>)*/}
                    {/*    }*/}
                    {/*)}*/}
                </div>
                <div
                >
                    <TableCreator
                        typeTable={'OrderTable'}
                        params={orderTableStructureMock}
                        data={productList}
                        actions={{onChange, onDelete, onEdit,}}
                    />
                </div>
            </div>
            OrderTab
        </div>
    );
};

export {OrderTab};