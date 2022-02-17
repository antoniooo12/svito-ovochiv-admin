import {ClientInformation, OrderAdditionalInformation} from "../types/orderReducerTypes";
import {socket} from "../soket/soket";
import {ColumnReduxStructure} from "../types/categoryReducerTypes";
import {OrderTabWasEdit} from "../types/orderTypes";

export const saveOrder = (
    {
        clientInformation,
        orderedGoods,
        orderAdditionalInformation,
        edit,
        orderId,
    }: {
        clientInformation: ClientInformation
        orderAdditionalInformation: OrderAdditionalInformation
        orderedGoods: {
            newToServer: ColumnReduxStructure[]
            allToUpdate: ColumnReduxStructure[]
            allToDelete: (string | number)[]
        }
        edit?: OrderTabWasEdit
        orderId?: number
    }) => {
    console.log(clientInformation, orderedGoods, orderAdditionalInformation, edit)
    socket.emit('DATABASE:SAVE:ORDER', {clientInformation, orderedGoods, orderAdditionalInformation, edit, orderId})
}