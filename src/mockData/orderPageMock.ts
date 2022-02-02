import {DataEntitiesTableStructure, EnumInput} from "../types/TableCreatorTypes";

export const orderTable = {
    OrderTable: 'OrderTable'
}

// export const orderTableStructureMock: DataEntitiesTableStructure = {
//     dependency: ['Product'],
//     title: 'Замовлення',
//     columnParams: [{width: 150}, {width: 150}, {width: 150}, {width: 150}],
//     header: [{title: 'Назва'}, {title: 'Кількість'}, {title: 'Ціна'}, {title: 'Всього'}],
//     row: {
//         Product: {
//             typeColumn: "Product",
//             typeInput: EnumInput.text,
//             isDropDownList: true
//         },
//         count: {
//             typeColumn: "count",
//
//             typeInput: EnumInput.number,
//             // placeholder: 'name of product',
//             isDropDownList: false
//         },
//         price: {
//             typeColumn: "price",
//             typeInput: EnumInput.number,
//             // placeholder: 'name of product',
//             isDropDownList: false
//         },
//         totalSum: {
//             typeColumn: "totalSum",
//             typeInput: EnumInput.number,
//             // placeholder: 'name of product',
//             isDropDownList: false
//         }
//     },
//
// }