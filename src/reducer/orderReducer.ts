import {EnumOrderReducer, OrderReducerActions, OrdersFromServer, OrderState} from "../types/orderReducerTypes";
import {List} from "immutable";

const defaultState: OrderState = {
    orders: List()
}

export default function orderReducer(state: OrderState = defaultState, action: OrderReducerActions): OrderState {
    switch (action.type) {
        case EnumOrderReducer.SET_ORDERS: {
            const {orders} = action.payload
            console.log(orders)
            return {
                ...state,
                orders: List(orders)
            }
        }
        default:
            return state
    }
}

// export const changeOrder = (order: OrderComponent) => ({
//     type: EnumOrderReducer.CHANGE_ORDER,
//     payload: order,
// })

// export const createNewOrder = (order: Partial<OrderComponent>) => ({
//     type: EnumOrderReducer.CREATE_ORDER,
//     payload: order
// })

export const setOrders = (orders: OrdersFromServer) => ({
    type: EnumOrderReducer.SET_ORDERS,
    payload: orders,
})