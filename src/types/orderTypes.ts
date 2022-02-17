import {orderTable} from "../mockData/orderPageMock";
import {TypeColumn} from "./TableCreatorTypes";
import Immutable from "immutable";

export type TypeOrderTable = keyof typeof orderTable

export enum OrderInstances {
    client,
    orders,
}

export type OrderNotification = Immutable.List<number>

const changingIn = {
    column: 'column',
    table: 'table',
    clientInformation: 'clientInformation',
}

//     {
//
//     orderedGood: {
//         necessityLevel: number;
//         information: {
//             orderToUpdatedId: number[];
//         };
//     };
// }

export type OrderTabWasEdit = { wasEdit: boolean, whatWasEdit: Array<OrderInstances> }
