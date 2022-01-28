import {EnumOrderReducer, Order, OrderReducerActions, OrderState} from "../types/orderReducerTypes";

const defaultState: OrderState = {
    orders: []
}

export default function orderReducer(state: OrderState = defaultState, action: OrderReducerActions): OrderState {
    switch (action.type) {
        case EnumOrderReducer.CREATE_ORDER: {
            const {clientInformation, } = action.payload
            console.log(clientInformation)
            const newOrder: Order = {
                numberOfOrder: '',
                orderInformation: {
                    status: 'Редагується',
                    sum: 0
                },
                clientInformation: clientInformation,
                orderedGoods: []
            }
            return {
                ...state,
                orders: [newOrder, ...state.orders]
            }
        }

        default:
            return state
    }
}

export const changeOrder = (order: Order) => ({
    type: EnumOrderReducer.CHANGE_ORDER,
    payload: order,
})

export const createNewOrder = (order: Partial<Order>) => ({
    type: EnumOrderReducer.CREATE_ORDER,
    payload: order
})