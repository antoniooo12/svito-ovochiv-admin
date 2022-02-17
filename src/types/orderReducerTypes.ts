/* eslint-disable */

import Immutable from "immutable";
import {statusOrder} from "../mockData/orderPageMock";
import {OrderInstances} from "./orderTypes";

export enum EnumOrderReducer {
    CREATE_ORDER = 'CREATE_ORDER',
    CHANGE_ORDER = 'CHANGE_ORDER',
    SET_ORDERS = 'SET_ORDERS',
}

export type ClientInformation = {
    name: string
    surname: string
    number: string
    address: string
    comments: string
    id: number
}
export type  OrderedGood = {
    id: number
    product: string
    count: number
    price: number
    totalSum: number
}
export type TimeFrame = {
    deliverFrom: Date
    deliverTo: Date
}
export type OrderAdditionalInformation = {
    id?: number | string
    sum: number
    status: string
    timeFrame: TimeFrame
    orderComments: string
}

export type Order = {
    id: number
    ClientOrder: {
        Client: ClientInformation
        ClientId: number
    }
    OrderAdditionalInformation: {
        deliverFrom: Date
        deliverTo: Date
        id: number
        sum: number
        status: keyof typeof statusOrder
        orderComment: string
    }
    OrderedGoods: OrderedGood[]
}


export type OrdersFromServer = {
    orders: Order[]
}
export type OrderState = {
    orders: Immutable.List<Order>
}

type CreateOrder = {
    type: EnumOrderReducer.CREATE_ORDER
    payload: Order
}
type ChangeOrder = {
    type: EnumOrderReducer.CHANGE_ORDER
    payload: Order
}
type SetOrders = {
    type: EnumOrderReducer.SET_ORDERS
    payload: OrdersFromServer,
}
export type OrderReducerActions = CreateOrder | ChangeOrder | SetOrders