import {ClientInformation, OrderAdditionalInformation} from "../types/orderReducerTypes";
import {socket} from "../soket/soket";
import {ColumnReduxStructure} from "../types/categoryReducerTypes";

export const saveOrder = (
    {
        clientInformation,
        orderedGoods,
        orderAdditionalInformation
    }: {
        clientInformation: ClientInformation
        orderAdditionalInformation: OrderAdditionalInformation
        orderedGoods: {
            newToServer: ColumnReduxStructure[]
            allToUpdate: ColumnReduxStructure[]
            allToDelete: (string | number)[]
        }

    }) => {
    console.log(orderAdditionalInformation.timeFrame)

    socket.emit('DATABASE:SAVE:ORDER', {clientInformation, orderedGoods, orderAdditionalInformation})
}