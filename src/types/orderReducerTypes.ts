import {TypeTable} from "./TableCreatorTypes";
import {changeOrder} from "../reducer/orderReducer";

export enum EnumOrderReducer {
    CREATE_ORDER = 'CREATE_ORDER',
    CHANGE_ORDER = 'CHANGE_ORDER',
}

export type ClientInformation = {
    name: string
    surname: string
    number: string
    address: string
    comments: string
    timeFrame: boolean | Date
}
export type  OrderedGood = {
    product: string
    count: number
    price: number
    totalSum: number
}
export type Order = {
    numberOfOrder: number | string
    clientInformation: ClientInformation
    orderedGoods: Array<OrderedGood>
    orderInformation: {
        sum: number
        status: string
    }
}

export type OrderState = {
    orders: Array<Order>
}

type CreateOrder = {
    type: EnumOrderReducer.CREATE_ORDER
    payload: Order
}
type ChangeOrder = {
    type: EnumOrderReducer.CHANGE_ORDER
    payload: Order
}
export type OrderReducerActions = CreateOrder | ChangeOrder